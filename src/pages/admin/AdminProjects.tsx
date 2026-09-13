import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { trpc } from '../../providers/trpc';
import { Field, ImagePicker, SaveBar, adminInput, adminTextarea } from './AdminLayout';

type Form = {
  slug: string;
  title: string;
  type: 'case-study' | 'software';
  firstTag: string;
  clientName: string;
  cardDescription: string;
  featuredImage: string;
  imageCaption: string;
  liveUrl: string;
  tagIds: string;
  overviewHtml: string;
  processHtml: string;
  descriptionHtml: string;
  sortOrder: number;
  published: boolean;
};

const empty: Form = {
  slug: '',
  title: '',
  type: 'case-study',
  firstTag: '',
  clientName: '',
  cardDescription: '',
  featuredImage: '',
  imageCaption: '',
  liveUrl: '',
  tagIds: '',
  overviewHtml: '',
  processHtml: '',
  descriptionHtml: '',
  sortOrder: 0,
  published: true,
};

const slugify = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

export default function AdminProjects() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.projects.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [saved, setSaved] = useState(false);

  const invalidate = () => {
    utils.content.admin.projects.invalidate();
    utils.content.projects.invalidate();
    utils.content.projectBySlug.invalidate();
  };
  const create = trpc.content.admin.createProject.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const update = trpc.content.admin.updateProject.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const del = trpc.content.admin.deleteProject.useMutation({
    onSuccess: () => {
      invalidate();
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
      type: p.type,
      firstTag: p.firstTag ?? '',
      clientName: p.clientName ?? '',
      cardDescription: p.cardDescription ?? '',
      featuredImage: p.featuredImage ?? '',
      imageCaption: p.imageCaption ?? '',
      liveUrl: p.liveUrl ?? '',
      tagIds: p.tagIds ?? '',
      overviewHtml: p.overviewHtml ?? '',
      processHtml: p.processHtml ?? '',
      descriptionHtml: p.descriptionHtml ?? '',
      sortOrder: p.sortOrder,
      published: p.published,
    });
    setEditingId(id);
  };

  const save = () => {
    if (editingId) update.mutate({ id: editingId, data: form });
    else create.mutate(form);
  };

  if (editingId === null) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-foreground">Work Samples</h1>
          <button
            onClick={() => {
              setForm(empty);
              setEditingId(0);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" /> New Work Sample
          </button>
        </div>
        <div className="space-y-2">
          {list.data?.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
            >
              {p.featuredImage && (
                <img
                  src={p.featuredImage}
                  alt=""
                  className="h-12 w-20 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.type === 'software' ? 'Software' : 'Case Study'} · {p.firstTag} ·{' '}
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
          ← All work samples
        </button>
        <h1 className="font-serif text-xl font-bold text-foreground">
          {editingId ? 'Edit Work Sample' : 'New Work Sample'}
        </h1>
      </div>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <select
              className={adminInput}
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as 'case-study' | 'software' })
              }
            >
              <option value="case-study">Case Study (install work)</option>
              <option value="software">Software (product)</option>
            </select>
          </Field>
          <Field label="Tag" hint="e.g. Network Cabling, CCTV, Software Development">
            <input
              className={adminInput}
              value={form.firstTag}
              onChange={(e) => setForm({ ...form, firstTag: e.target.value })}
            />
          </Field>
        </div>
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
        <Field label="Slug" hint="Used in the URL: /projects/your-slug">
          <input
            className={adminInput}
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
          />
        </Field>
        <Field label="Client" hint="e.g. Solkeb Hotel, Jijiga — leave empty to hide">
          <input
            className={adminInput}
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          />
        </Field>
        <Field label="Card description" hint="Short summary shown on the Recent Installs grid">
          <textarea
            className="min-h-[70px] w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            value={form.cardDescription}
            onChange={(e) => setForm({ ...form, cardDescription: e.target.value })}
          />
        </Field>
        <ImagePicker
          label="Featured image"
          value={form.featuredImage}
          onChange={(url) => setForm({ ...form, featuredImage: url })}
        />
        <Field label="Image caption">
          <input
            className={adminInput}
            value={form.imageCaption}
            onChange={(e) => setForm({ ...form, imageCaption: e.target.value })}
          />
        </Field>
        {form.type === 'software' && (
          <Field label="Live URL" hint="e.g. https://menu.solkebhotel.com/menu/t-1 — shows a See It Live link">
            <input
              className={adminInput}
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />
          </Field>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Filter tag IDs" hint="1=Cabling 2=CCTV 3=Wi-Fi 4=IT — comma separated, e.g. 1,2">
            <input
              className={adminInput}
              value={form.tagIds}
              onChange={(e) => setForm({ ...form, tagIds: e.target.value })}
            />
          </Field>
          <Field label="Sort order" hint="Higher shows first">
            <input
              type="number"
              className={adminInput}
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            />
          </Field>
        </div>
        <Field label="Overview (HTML)" hint="A paragraph or two introducing the project">
          <textarea
            className={adminTextarea}
            value={form.overviewHtml}
            onChange={(e) => setForm({ ...form, overviewHtml: e.target.value })}
          />
        </Field>
        {form.type === 'case-study' ? (
          <Field label="Process (HTML)" hint="How the work was delivered — shown under the overview">
            <textarea
              className={adminTextarea}
              value={form.processHtml}
              onChange={(e) => setForm({ ...form, processHtml: e.target.value })}
            />
          </Field>
        ) : (
          <Field label="Description (HTML)" hint="Full product description — features, screenshots">
            <textarea
              className={adminTextarea}
              value={form.descriptionHtml}
              onChange={(e) => setForm({ ...form, descriptionHtml: e.target.value })}
            />
          </Field>
        )}
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
                if (window.confirm('Delete this work sample permanently?'))
                  del.mutate({ id: editingId });
              }
            : undefined
        }
      />
    </div>
  );
}
