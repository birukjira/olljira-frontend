import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { trpc } from '../../providers/trpc';
import { Field, ImagePicker, SaveBar, adminInput, adminTextarea } from './AdminLayout';

type Form = {
  slug: string;
  title: string;
  excerpt: string;
  firstTag: string;
  imageUrl: string;
  contentHtml: string;
  readTimeMinutes: number;
  published: boolean;
};

const empty: Form = {
  slug: '',
  title: '',
  excerpt: '',
  firstTag: '',
  imageUrl: '',
  contentHtml: '',
  readTimeMinutes: 5,
  published: true,
};

const slugify = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

export default function AdminPosts() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.posts.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null); // null = list, 0 = new
  const [form, setForm] = useState<Form>(empty);
  const [saved, setSaved] = useState(false);

  const create = trpc.content.admin.createPost.useMutation({
    onSuccess: () => {
      utils.content.admin.posts.invalidate();
      utils.content.posts.invalidate();
      setSaved(true);
    },
  });
  const update = trpc.content.admin.updatePost.useMutation({
    onSuccess: () => {
      utils.content.admin.posts.invalidate();
      utils.content.posts.invalidate();
      utils.content.postBySlug.invalidate();
      setSaved(true);
    },
  });
  const del = trpc.content.admin.deletePost.useMutation({
    onSuccess: () => {
      utils.content.admin.posts.invalidate();
      utils.content.posts.invalidate();
      setEditingId(null);
    },
  });

  const saving = create.isPending || update.isPending;

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const startEdit = (id: number) => {
    const p = list.data?.find((x) => x.id === id);
    if (!p) return;
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? '',
      firstTag: p.firstTag ?? '',
      imageUrl: p.imageUrl ?? '',
      contentHtml: p.contentHtml ?? '',
      readTimeMinutes: p.readTimeMinutes,
      published: p.published,
    });
    setEditingId(id);
  };

  const save = () => {
    const payload = { ...form, publishedAt: editingId ? undefined : new Date() };
    if (editingId) update.mutate({ id: editingId, data: payload });
    else create.mutate(payload as typeof payload & { publishedAt: Date });
  };

  if (editingId === null) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-foreground">Blog Posts</h1>
          <button
            onClick={() => {
              setForm(empty);
              setEditingId(0);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" /> New Post
          </button>
        </div>
        <div className="space-y-2">
          {list.data?.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt=""
                  className="h-12 w-20 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(p.publishedAt).toLocaleDateString()} · {p.firstTag} ·{' '}
                  {p.published ? (
                    <span className="text-green-700">Published</span>
                  ) : (
                    <span className="text-amber-600">Draft</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => startEdit(p.id)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-input px-3 text-sm hover:bg-muted"
              >
                <Pencil className="size-3.5" /> Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setEditingId(null)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← All posts
        </button>
        <h1 className="font-serif text-xl font-bold text-foreground">
          {editingId ? 'Edit Post' : 'New Post'}
        </h1>
      </div>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field label="Title">
          <input
            className={adminInput}
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: editingId ? form.slug : slugify(e.target.value),
              })
            }
          />
        </Field>
        <Field label="Slug" hint="Used in the URL: /blogs/your-slug">
          <input
            className={adminInput}
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
          />
        </Field>
        <Field label="Excerpt" hint="One or two sentences shown in cards and previews">
          <textarea
            className="min-h-[70px] w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tag" hint="e.g. CCTV, Network Cabling">
            <input
              className={adminInput}
              value={form.firstTag}
              onChange={(e) => setForm({ ...form, firstTag: e.target.value })}
            />
          </Field>
          <Field label="Read time (minutes)">
            <input
              type="number"
              min={1}
              className={adminInput}
              value={form.readTimeMinutes}
              onChange={(e) =>
                setForm({ ...form, readTimeMinutes: parseInt(e.target.value) || 5 })
              }
            />
          </Field>
        </div>
        <ImagePicker
          label="Cover image"
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />
        <Field
          label="Content (HTML)"
          hint="Use <p> paragraphs, <h3> headings, <ul><li> lists, <strong>, <a href>. Images: <img src=&quot;/api/media/ID&quot;>"
        >
          <textarea
            className={adminTextarea}
            value={form.contentHtml}
            onChange={(e) => setForm({ ...form, contentHtml: e.target.value })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="size-4 accent-[#0B2E4F]"
          />
          Published (visible on the site)
        </label>
      </div>
      <SaveBar
        saving={saving}
        saved={saved}
        onSave={save}
        onDelete={
          editingId
            ? () => {
                if (window.confirm('Delete this post permanently?')) del.mutate({ id: editingId });
              }
            : undefined
        }
      />
    </div>
  );
}
