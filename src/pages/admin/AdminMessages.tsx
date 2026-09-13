import { useState } from 'react';
import { Inbox, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { trpc } from '../../providers/trpc';

const fmtDate = (d: string | Date) =>
  new Date(d).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function AdminMessages() {
  const utils = trpc.useUtils();
  const list = trpc.content.admin.submissions.useQuery();
  const markRead = trpc.content.admin.markSubmissionRead.useMutation({
    onSuccess: () => utils.content.admin.submissions.invalidate(),
  });
  const del = trpc.content.admin.deleteSubmission.useMutation({
    onSuccess: () => utils.content.admin.submissions.invalidate(),
  });
  const [openId, setOpenId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const rows = list.data ?? [];

  const toggle = (id: number, read: boolean) => {
    setOpenId(openId === id ? null : id);
    if (!read) markRead.mutate({ id, read: true });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Messages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact form submissions from the website.
          </p>
        </div>
        <span className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
          {rows.filter((r) => !r.read).length} unread
        </span>
      </div>

      {list.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!list.isLoading && rows.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border bg-card py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {rows.map((m) => {
          const open = openId === m.id;
          return (
            <div
              key={m.id}
              className={`rounded-xl border bg-card ${m.read ? '' : 'border-primary/40'}`}
            >
              <button
                onClick={() => toggle(m.id, m.read)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${m.read ? 'bg-muted' : 'bg-primary'}`}
                />
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${m.read ? '' : 'font-semibold'}`}>
                    {m.fullName}
                    <span className="ml-2 font-normal text-muted-foreground">{m.contact}</span>
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {m.service ? `${m.service} — ` : ''}
                    {m.message}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {fmtDate(m.createdAt)}
                </span>
                {open ? (
                  <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              {open && (
                <div className="border-t px-5 py-4">
                  {m.service && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service: {m.service}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-6">{m.message}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => markRead.mutate({ id: m.id, read: !m.read })}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium hover:bg-accent"
                    >
                      <MailOpen className="size-3.5" />
                      {m.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    {confirmDeleteId === m.id ? (
                      <>
                        <button
                          onClick={() => del.mutate({ id: m.id })}
                          className="inline-flex h-8 items-center rounded-md bg-destructive px-3 text-xs font-medium text-destructive-foreground"
                        >
                          Confirm delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="inline-flex h-8 items-center rounded-md border px-3 text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(m.id)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
