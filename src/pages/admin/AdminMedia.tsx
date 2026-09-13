import { useRef, useState } from 'react';
import { Copy, Trash2, Upload } from 'lucide-react';
import { trpc } from '../../providers/trpc';

export default function AdminMedia() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.media.useQuery();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const del = trpc.content.admin.deleteMedia.useMutation({
    onSuccess: () => utils.content.admin.media.invalidate(),
  });

  const upload = async (files: FileList) => {
    setUploading(true);
    setError('');
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Upload failed');
      }
      utils.content.admin.media.invalidate();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id: number) => {
    navigator.clipboard.writeText(`/api/media/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Media Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload posters, photos, and screenshots here, then copy the link into any post, project,
            or hero slide.
          </p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Upload className="size-4" />
          {uploading ? 'Uploading…' : 'Upload Images'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) upload(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {list.data?.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Nothing uploaded yet. Posters and photos you upload will live here.
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.data?.map((m) => (
          <div key={m.id} className="overflow-hidden rounded-xl border border-border bg-background">
            <img src={`/api/media/${m.id}`} alt={m.name} className="aspect-video w-full object-cover" />
            <div className="p-3">
              <p className="mb-2 truncate text-xs font-medium text-foreground" title={m.name}>
                {m.name}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => copyUrl(m.id)}
                  className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-input text-xs hover:bg-muted"
                >
                  <Copy className="size-3" />
                  {copiedId === m.id ? 'Copied!' : 'Copy link'}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this image? Content using its link will lose it.'))
                      del.mutate({ id: m.id });
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
