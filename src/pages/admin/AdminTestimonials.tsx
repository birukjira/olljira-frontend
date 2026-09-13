import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { trpc } from '../../providers/trpc';
import { Field, SaveBar, adminInput, adminTextarea } from './AdminLayout';

type Form = {
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  published: boolean;
  sortOrder: number;
};

const empty: Form = {
  quote: '',
  authorName: '',
  authorRole: '',
  organization: '',
  published: true,
  sortOrder: 0,
};

export default function AdminTestimonials() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.testimonials.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null); // null = list, 0 = new
  const [form, setForm] = useState<Form>(empty);
  const [saved, setSaved] = useState(false);

  const invalidate = () => {
    utils.content.admin.testimonials.invalidate();
    utils.content.testimonials.invalidate();
  };

  const create = trpc.content.admin.createTestimonial.useMutation({ onSuccess: invalidate });
  const update = trpc.content.admin.updateTestimonial.useMutation({ onSuccess: invalidate });
  const del = trpc.content.admin.deleteTestimonial.useMutation({ onSuccess: invalidate });

  const startEdit = (id: number) => {
    const row = list.data?.find((t) => t.id === id);
    if (!row) return;
    setForm({
      quote: row.quote,
      authorName: row.authorName,
      authorRole: row.authorRole ?? '',
      organization: row.organization ?? '',
      published: row.published,
      sortOrder: row.sortOrder,
    });
    setEditingId(id);
  };

  const save = async () => {
    if (editingId === 0) {
      await create.mutateAsync(form);
    } else if (editingId !== null) {
      await update.mutateAsync({ id: editingId, data: form });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setEditingId(null);
    setForm(empty);
  };

  const remove = async (id: number) => {
    await del.mutateAsync({ id });
    if (editingId === id) {
      setEditingId(null);
      setForm(empty);
    }
  };

  if (editingId !== null) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {editingId === 0 ? 'New Testimonial' : 'Edit Testimonial'}
          </h1>
          <button
            onClick={() => {
              setEditingId(null);
              setForm(empty);
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to list
          </button>
        </div>
        <div className="space-y-5 rounded-xl border bg-background p-6">
          <Field label="Quote" hint="The client's words, without the surrounding quotation marks.">
            <textarea
              className={adminTextarea}
              rows={4}
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
            />
          </Field>
          <Field
            label="Name or role shown as author"
            hint="Use a real name with the client's permission (e.g. 'A. Tadesse'), or a role title (e.g. 'IT Administrator')."
          >
            <input
              className={adminInput}
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              placeholder="IT Administrator"
            />
          </Field>
          <Field label="Role / department (optional)">
            <input
              className={adminInput}
              value={form.authorRole}
              onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
              placeholder="ICT Department"
            />
          </Field>
          <Field label="Organization">
            <input
              className={adminInput}
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              placeholder="Summit General Hospital"
            />
          </Field>
          <Field label="Sort order" hint="Higher shows first.">
            <input
              className={adminInput}
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published (visible on the homepage)
          </label>
        </div>
        <SaveBar
          saving={create.isPending || update.isPending}
          saved={saved}
          onSave={save}
          onDelete={editingId !== 0 ? () => remove(editingId) : undefined}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Client quotes shown in the homepage carousel.
          </p>
        </div>
        <button
          onClick={() => {
            setForm(empty);
            setEditingId(0);
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New Testimonial
        </button>
      </div>

      {list.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="flex flex-col gap-3">
        {list.data?.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">“{t.quote}”</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.authorName}
                {t.authorRole ? `, ${t.authorRole}` : ''} — {t.organization}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                t.published
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {t.published ? 'Published' : 'Draft'}
            </span>
            <button
              onClick={() => startEdit(t.id)}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border hover:bg-accent"
              aria-label={`Edit testimonial from ${t.organization}`}
            >
              <Pencil className="size-3.5" />
            </button>
          </div>
        ))}
        {list.data?.length === 0 && (
          <p className="rounded-xl border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
            No testimonials yet. The homepage shows the built-in fallback quotes until you add one.
          </p>
        )}
      </div>
    </div>
  );
}
