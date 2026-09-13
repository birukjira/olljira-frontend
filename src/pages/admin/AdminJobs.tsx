import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { trpc } from '../../providers/trpc';
import { Field, ImagePicker, SaveBar, adminInput, adminTextarea } from './AdminLayout';

type Form = {
  slug: string;
  title: string;
  excerpt: string;
  department: string;
  location: string;
  workplaceType: 'ONSITE' | 'REMOTE' | 'HYBRID';
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'TEMP';
  seniority: string;
  applyEmail: string;
  externalApplyUrl: string;
  deadlineAt: string; // datetime-local value
  canApply: boolean;
  featuredImage: string;
  contentHtml: string;
  published: boolean;
  sortOrder: number;
};

const empty: Form = {
  slug: '',
  title: '',
  excerpt: '',
  department: '',
  location: 'Addis Ababa',
  workplaceType: 'ONSITE',
  employmentType: 'FULL_TIME',
  seniority: '',
  applyEmail: 'careers@olljira.com',
  externalApplyUrl: '',
  deadlineAt: '',
  canApply: true,
  featuredImage: '',
  contentHtml: '',
  published: true,
  sortOrder: 0,
};

const slugify = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

const toLocalInput = (d: string | Date | null) => {
  if (!d) return '';
  const dt = new Date(d);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
};

export default function AdminJobs() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.jobs.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null); // null = list, 0 = new
  const [form, setForm] = useState<Form>(empty);
  const [saved, setSaved] = useState(false);

  const invalidate = () => {
    utils.content.admin.jobs.invalidate();
    utils.content.jobs.invalidate();
    utils.content.jobBySlug.invalidate();
  };

  const create = trpc.content.admin.createJob.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const update = trpc.content.admin.updateJob.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const del = trpc.content.admin.deleteJob.useMutation({
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
    const j = list.data?.find((x) => x.id === id);
    if (!j) return;
    setForm({
      slug: j.slug,
      title: j.title,
      excerpt: j.excerpt ?? '',
      department: j.department ?? '',
      location: j.location ?? '',
      workplaceType: j.workplaceType ?? 'ONSITE',
      employmentType: j.employmentType ?? 'FULL_TIME',
      seniority: j.seniority ?? '',
      applyEmail: j.applyEmail ?? '',
      externalApplyUrl: j.externalApplyUrl ?? '',
      deadlineAt: toLocalInput(j.deadlineAt),
      canApply: j.canApply,
      featuredImage: j.featuredImage ?? '',
      contentHtml: j.contentHtml ?? '',
      published: j.published,
      sortOrder: j.sortOrder,
    });
    setEditingId(id);
  };

  const save = () => {
    const payload = {
      ...form,
      deadlineAt: form.deadlineAt ? new Date(form.deadlineAt) : null,
    };
    if (editingId) update.mutate({ id: editingId, data: payload });
    else create.mutate(payload);
  };

  if (editingId === null) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-foreground">Job Openings</h1>
          <button
            onClick={() => {
              setForm(empty);
              setEditingId(0);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" /> New Opening
          </button>
        </div>
        <div className="space-y-2">
          {list.data?.map((j) => (
            <div
              key={j.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{j.title}</p>
                <p className="text-xs text-muted-foreground">
                  {j.department} · {j.location} ·{' '}
                  {j.canApply ? (
                    <span className="text-green-700">Open</span>
                  ) : (
                    <span className="text-amber-600">Closed</span>
                  )}{' '}
                  ·{' '}
                  {j.published ? (
                    <span className="text-green-700">Published</span>
                  ) : (
                    <span className="text-amber-600">Draft</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => startEdit(j.id)}
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
          ← All openings
        </button>
        <h1 className="font-serif text-xl font-bold text-foreground">
          {editingId ? 'Edit Opening' : 'New Opening'}
        </h1>
      </div>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field label="Job title">
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
        <Field label="Slug" hint="Used in the URL: /careers/your-slug">
          <input
            className={adminInput}
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
          />
        </Field>
        <Field label="Excerpt" hint="One or two sentences shown on the careers list">
          <textarea
            className="min-h-[70px] w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Department">
            <input
              className={adminInput}
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <input
              className={adminInput}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Employment type">
            <select
              className={adminInput}
              value={form.employmentType}
              onChange={(e) =>
                setForm({ ...form, employmentType: e.target.value as Form['employmentType'] })
              }
            >
              <option value="FULL_TIME">Full time</option>
              <option value="PART_TIME">Part time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="TEMP">Temp</option>
            </select>
          </Field>
          <Field label="Workplace">
            <select
              className={adminInput}
              value={form.workplaceType}
              onChange={(e) =>
                setForm({ ...form, workplaceType: e.target.value as Form['workplaceType'] })
              }
            >
              <option value="ONSITE">On-site</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Seniority" hint="e.g. JUNIOR, MID, SENIOR">
            <input
              className={adminInput}
              value={form.seniority}
              onChange={(e) => setForm({ ...form, seniority: e.target.value })}
            />
          </Field>
          <Field label="Application deadline">
            <input
              type="datetime-local"
              className={adminInput}
              value={form.deadlineAt}
              onChange={(e) => setForm({ ...form, deadlineAt: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Apply email" hint="Shown as a mailto link">
            <input
              className={adminInput}
              value={form.applyEmail}
              onChange={(e) => setForm({ ...form, applyEmail: e.target.value })}
            />
          </Field>
          <Field label="External apply URL" hint="Optional — e.g. a form link">
            <input
              className={adminInput}
              value={form.externalApplyUrl}
              onChange={(e) => setForm({ ...form, externalApplyUrl: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Sort order" hint="Higher numbers appear first">
          <input
            type="number"
            className={adminInput}
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
          />
        </Field>
        <ImagePicker
          label="Cover image"
          value={form.featuredImage}
          onChange={(url) => setForm({ ...form, featuredImage: url })}
        />
        <Field
          label="Job description (HTML)"
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
            checked={form.canApply}
            onChange={(e) => setForm({ ...form, canApply: e.target.checked })}
            className="size-4 accent-[#0B2E4F]"
          />
          Open for applications
        </label>
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
                if (window.confirm('Delete this opening permanently?'))
                  del.mutate({ id: editingId });
              }
            : undefined
        }
      />
    </div>
  );
}
