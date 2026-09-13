import { Link } from 'react-router';
import { trpc } from '../../providers/trpc';

export default function AdminDashboard() {
  const posts = trpc.content.admin.posts.useQuery();
  const projects = trpc.content.admin.projects.useQuery();
  const slides = trpc.content.admin.heroSlides.useQuery();
  const media = trpc.content.admin.media.useQuery();

  const cards = [
    { label: 'Blog Posts', count: posts.data?.length, to: '/admin/posts' },
    { label: 'Work Samples', count: projects.data?.length, to: '/admin/projects' },
    { label: 'Hero Slides', count: slides.data?.length, to: '/admin/hero' },
    { label: 'Media Files', count: media.data?.length, to: '/admin/media' },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/50"
          >
            <p className="text-3xl font-bold text-primary">{c.count ?? '—'}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 max-w-2xl rounded-xl border border-border bg-background p-5 text-sm leading-6 text-muted-foreground">
        <p className="mb-2 font-semibold text-foreground">How posting works</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Blog Posts</strong> — write a post, attach a cover image, publish. It appears on
            the Blogs page and homepage instantly.
          </li>
          <li>
            <strong>Work Samples</strong> — add case studies or software projects with photos; they
            show up under Recent Installs.
          </li>
          <li>
            <strong>Hero Slides</strong> — change the big homepage pictures.
          </li>
          <li>
            <strong>Media Library</strong> — upload posters and photos; copy the link to use
            anywhere.
          </li>
          <li>
            <strong>Settings</strong> — paste your Cal.com / Google Meet booking link for the
            Schedule page.
          </li>
        </ul>
      </div>
    </div>
  );
}
