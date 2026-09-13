import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { trpc } from '../../providers/trpc';
import { Field, ImagePicker, SaveBar, adminInput } from './AdminLayout';

type Form = {
  title: string;
  kind: 'image' | 'mockup';
  desktopImage: string;
  mobileImage: string;
  sortOrder: number;
  active: boolean;
};

const empty: Form = {
  title: '',
  kind: 'image',
  desktopImage: '',
  mobileImage: '',
  sortOrder: 10,
  active: true,
};

export default function AdminHero() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.heroSlides.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [saved, setSaved] = useState(false);

  const invalidate = () => {
    utils.content.admin.heroSlides.invalidate();
    utils.content.heroSlides.invalidate();
  };
  const create = trpc.content.admin.createHeroSlide.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const update = trpc.content.admin.updateHeroSlide.useMutation({
    onSuccess: () => {
      invalidate();
      setSaved(true);
    },
  });
  const del = trpc.content.admin.deleteHeroSlide.useMutation({
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
    const s = list.data?.find((x) => x.id === id);
    if (!s) return;
    setForm({
      title: s.title,
      kind: s.kind,
      desktopImage: s.desktopImage ?? '',
      mobileImage: s.mobileImage ?? '',
      sortOrder: s.sortOrder,
      active: s.active,
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
          <h1 className="font-serif text-2xl font-bold text-foreground">Hero Slides</h1>
          <button
            onClick={() => {
              setForm(empty);
              setEditingId(0);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" /> New Slide
          </button>
        </div>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          These are the big rotating pictures on the homepage. A slide can be a plain photo or a
          device mockup (laptop + phone) for software work.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {list.data?.map((s) => (
            <div key={s.id} className="rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex gap-2">
                {s.desktopImage && (
                  <img
                    src={s.desktopImage}
                    alt=""
                    className="h-16 flex-1 rounded-lg object-cover"
                  />
                )}
              </div>
              <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
              <p className="mb-3 text-xs text-muted-foreground">
                #{s.sortOrder} · {s.kind} ·{' '}
                {s.active ? (
                  <span className="text-green-700">Active</span>
                ) : (
                  <span className="text-amber-600">Hidden</span>
                )}
              </p>
              <button
                onClick={() => startEdit(s.id)}
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
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setEditingId(null)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← All slides
        </button>
        <h1 className="font-serif text-xl font-bold text-foreground">
          {editingId ? 'Edit Slide' : 'New Slide'}
        </h1>
      </div>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field label="Title" hint="Alt text / internal name">
          <input
            className={adminInput}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field
          label="Kind"
          hint="Mockup shows your screenshots inside laptop + phone frames (for software work)"
        >
          <select
            className={adminInput}
            value={form.kind}
            onChange={(e) => setForm({ ...form, kind: e.target.value as 'image' | 'mockup' })}
          >
            <option value="image">Photo slide</option>
            <option value="mockup">Device mockup (laptop + phone)</option>
          </select>
        </Field>
        <ImagePicker
          label={form.kind === 'mockup' ? 'Laptop screen (wide screenshot)' : 'Desktop image'}
          value={form.desktopImage}
          onChange={(url) => setForm({ ...form, desktopImage: url })}
        />
        <ImagePicker
          label={form.kind === 'mockup' ? 'Phone screen (tall screenshot)' : 'Mobile image'}
          value={form.mobileImage}
          onChange={(url) => setForm({ ...form, mobileImage: url })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Sort order" hint="Slides play in this order">
            <input
              type="number"
              className={adminInput}
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="size-4 accent-[#0B2E4F]"
          />
          Active (shown in the rotation)
        </label>
      </div>
      <SaveBar
        saving={saving}
        saved={saved}
        onSave={save}
        onDelete={
          editingId
            ? () => {
                if (window.confirm('Delete this slide permanently?')) del.mutate({ id: editingId });
              }
            : undefined
        }
      />
    </div>
  );
}
