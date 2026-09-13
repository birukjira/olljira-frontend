import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Images,
  Image,
  Briefcase,
  Inbox,
  Quote,
  Settings,
  LogOut,
  Upload,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useRef, useState } from 'react';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/posts', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/projects', label: 'Work Samples', icon: FolderKanban },
  { to: '/admin/hero', label: 'Hero Slides', icon: Images },
  { to: '/admin/jobs', label: 'Job Openings', icon: Briefcase },
  { to: '/admin/messages', label: 'Messages', icon: Inbox },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/media', label: 'Media Library', icon: Image },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, isLoading, logout } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: '/login',
  });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  if (user.role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-2xl font-semibold">Admins only</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          You are signed in as {user.name ?? user.email}, but this account does not have admin
          access to the OllJira CMS.
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-primary underline hover:text-primary/80"
        >
          Back to the site
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-background">
        <div className="border-b border-border px-5 py-4">
          <p className="font-serif text-sm font-bold text-primary">OllJira CMS</p>
          <p className="truncate text-xs text-muted-foreground">{user.name ?? user.email}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              <n.icon className="size-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            ← View site
          </Link>
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

/* ----------------------- shared form primitives ----------------------- */

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const adminInput =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40';
export const adminTextarea =
  'min-h-[140px] w-full rounded-lg border border-input bg-background px-3 py-2.5 font-mono text-[13px] leading-6 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40';

export function ImagePicker({
  value,
  onChange,
  label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input
          className={adminInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/… or upload →"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          <Upload className="size-4" />
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = '';
          }}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-2 aspect-video w-48 rounded-lg border border-border object-cover"
        />
      )}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </Field>
  );
}

export function SaveBar({
  saving,
  saved,
  onSave,
  onDelete,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="sticky bottom-0 mt-6 flex items-center gap-3 rounded-xl border border-border bg-background/95 p-3 backdrop-blur">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
      {saved && <span className="text-sm font-medium text-green-700">Saved ✓</span>}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto inline-flex h-10 items-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}
