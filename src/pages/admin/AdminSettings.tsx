import { useEffect, useState } from 'react';
import { trpc } from '../../providers/trpc';
import { Field, SaveBar, adminInput } from './AdminLayout';

export default function AdminSettings() {
  const utils = trpc.useUtils();
  const current = trpc.content.admin.getSetting.useQuery({ key: 'booking_embed_url' });
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (current.data !== undefined && current.data !== null) setValue(current.data);
  }, [current.data]);

  const set = trpc.content.admin.setSetting.useMutation({
    onSuccess: () => {
      utils.content.bookingEmbedUrl.invalidate();
      utils.content.admin.getSetting.invalidate();
      setSaved(true);
    },
  });

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Settings</h1>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field
          label="Google Meet booking embed URL"
          hint="From Cal.com (free): create an event type, connect Google Meet as the location, then Share → Embed → copy the link, e.g. https://cal.com/yourname/intro-call?embed=true&theme=light. Shown on the Schedule page."
        >
          <input
            className={adminInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://cal.com/olljira/intro-call?embed=true&theme=light"
          />
        </Field>
        <p className="rounded-lg bg-muted p-3 text-xs leading-5 text-muted-foreground">
          Leave empty to show a &quot;Request a Virtual Call&quot; button instead of the live
          calendar.
        </p>
      </div>
      <SaveBar
        saving={set.isPending}
        saved={saved}
        onSave={() => set.mutate({ key: 'booking_embed_url', value: value.trim() })}
      />

      <EmailSettings />

      <PasswordSettings />
    </div>
  );
}

function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const change = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      setMessage({ ok: true, text: 'Password updated. Use it next time you sign in.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
    },
    onError: (err) => setMessage({ ok: false, text: err.message }),
  });

  const submit = () => {
    setMessage(null);
    if (newPassword.length < 8) {
      setMessage({ ok: false, text: 'New password must be at least 8 characters.' });
      return;
    }
    if (newPassword !== confirm) {
      setMessage({ ok: false, text: 'New passwords do not match.' });
      return;
    }
    change.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="mt-8">
      <h2 className="mb-2 font-serif text-xl font-bold text-foreground">Change Password</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Changes the password for the account you are currently signed in with.
      </p>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field label="Current password">
          <input
            className={adminInput}
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Field>
        <Field label="New password" hint="At least 8 characters.">
          <input
            className={adminInput}
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Field>
        <Field label="Confirm new password">
          <input
            className={adminInput}
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Field>
        {message && (
          <p className={`text-sm ${message.ok ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={change.isPending || !currentPassword || !newPassword || !confirm}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {change.isPending ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </div>
  );
}

const EMAIL_KEYS = [
  'email_notify_to',
  'email_from',
  'email_resend_api_key',
  'email_smtp_url',
] as const;

function EmailSettings() {
  const utils = trpc.useUtils();
  const queries = EMAIL_KEYS.map((key) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    trpc.content.admin.getSetting.useQuery({ key })
  );
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const set = trpc.content.admin.setSetting.useMutation();

  const loaded = queries.every((q) => q.data !== undefined);
  useEffect(() => {
    if (!loaded) return;
    const next: Record<string, string> = {};
    EMAIL_KEYS.forEach((key, i) => {
      next[key] = queries[i].data ?? '';
    });
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const saving = set.isPending;
  const saveAll = async () => {
    for (const key of EMAIL_KEYS) {
      await set.mutateAsync({ key, value: (values[key] ?? '').trim() });
    }
    utils.content.admin.getSetting.invalidate();
    setSaved(true);
  };

  const v = (key: string) => values[key] ?? '';
  const setV = (key: string, val: string) => setValues((s) => ({ ...s, [key]: val }));

  return (
    <div className="mt-8">
      <h2 className="mb-2 font-serif text-xl font-bold text-foreground">Email Notifications</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Get an email each time someone submits the contact form. Leave empty to keep messages
        in the Messages inbox only.
      </p>
      <div className="space-y-5 rounded-xl border border-border bg-background p-6">
        <Field label="Send notifications to" hint="Your email address, e.g. info@olljira.com. Required for email notifications.">
          <input
            className={adminInput}
            value={v('email_notify_to')}
            onChange={(e) => setV('email_notify_to', e.target.value)}
            placeholder="info@olljira.com"
          />
        </Field>
        <Field
          label="Resend API key"
          hint="Recommended. Free at resend.com — create an API key (re_...). Works instantly with the default sender."
        >
          <input
            className={adminInput}
            type="password"
            value={v('email_resend_api_key')}
            onChange={(e) => setV('email_resend_api_key', e.target.value)}
            placeholder="re_..."
          />
        </Field>
        <Field
          label="SMTP URL (alternative to Resend)"
          hint="For Gmail use an App Password: smtps://you@gmail.com:app-password@smtp.gmail.com:465 — for Outlook: smtp://you@outlook.com:password@smtp.office365.com:587"
        >
          <input
            className={adminInput}
            type="password"
            value={v('email_smtp_url')}
            onChange={(e) => setV('email_smtp_url', e.target.value)}
            placeholder="smtps://user:pass@smtp.gmail.com:465"
          />
        </Field>
        <Field
          label="From address (optional)"
          hint="With Resend's test sender leave empty. With your own verified domain: Website <hello@yourdomain.com>. With SMTP this usually must be the account address."
        >
          <input
            className={adminInput}
            value={v('email_from')}
            onChange={(e) => setV('email_from', e.target.value)}
            placeholder="OllJira Website <hello@olljira.com>"
          />
        </Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={saveAll} />
    </div>
  );
}
