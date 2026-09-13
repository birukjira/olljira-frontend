import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

interface ProjectVM {
  slug: string;
  title: string;
  type: 'case-study' | 'software';
  firstTag: string;
  clientName: string | null;
  liveUrl: string | null;
  featuredImage: string | null;
  imageCaption: string;
  overviewHtml: string;
  processHtml: string | null;
  descriptionHtml: string | null;
}

function DetailHeader({
  title,
  firstTag,
  externalLink,
}: {
  title: string;
  firstTag: string;
  externalLink?: string | null;
}) {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-6 font-serif text-3xl font-semibold leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <div className="flex items-center justify-center gap-3">
        {firstTag && (
          <span className="inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
            {firstTag}
          </span>
        )}
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <span>See It Live</span>
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

function DetailImage({
  imageUrl,
  caption,
  title,
}: {
  imageUrl: string;
  caption: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/projects"
          className="group flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Recent Installs</span>
        </Link>
        <div className="flex-1 border-t border-dashed border-zinc-300" />
      </div>
      <div className="w-full overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt={caption || title}
          className="aspect-video w-full object-cover"
        />
      </div>
    </div>
  );
}

function ClientRow({ clientName }: { clientName: string | null }) {
  if (!clientName) return null;
  return (
    <div className="mb-10 flex items-center justify-between border-b border-zinc-100 py-4">
      <span className="text-base text-zinc-600">Client</span>
      <span className="text-base font-medium text-foreground">{clientName}</span>
    </div>
  );
}

function DetailSection({ title, html }: { title: string; html: string | null }) {
  if (!html) return null;
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-serif text-xl font-semibold text-foreground md:text-2xl">{title}</h2>
      <div
        className="leading-relaxed text-zinc-600 [&_a]:text-primary [&_a]:underline [&_img]:my-4 [&_img]:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function LiveLinksRow({ links }: { links: { label: string; url: string }[] }) {
  if (links.length === 0) return null;
  return (
    <div className="mb-10 flex flex-col gap-3 border-b border-zinc-100 pb-6">
      <span className="text-base text-zinc-600">Live Systems</span>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            {l.label}
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* Extra live links per project slug (beyond the primary See It Live link) */
const extraLiveLinks: Record<string, { label: string; url: string }[]> = {
  'solkeb-hotel-management-system': [
    { label: 'Hotel Website & Booking', url: 'https://hotel.solkebhotel.com/' },
    { label: 'Guest Menu (Table t-1)', url: 'https://menu.solkebhotel.com/menu/t-1' },
    { label: 'Staff App', url: 'https://restaurant.solkebhotel.com/' },
  ],
};

function ProjectBody({ project }: { project: ProjectVM }) {
  const isSoftware = project.type === 'software';
  return (
    <div className="min-h-screen w-full pb-20">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <DetailHeader
          title={project.title}
          firstTag={project.firstTag}
          externalLink={isSoftware ? project.liveUrl : null}
        />
        {project.featuredImage && (
          <DetailImage
            imageUrl={project.featuredImage}
            caption={project.imageCaption}
            title={project.title}
          />
        )}
        <ClientRow clientName={project.clientName} />
        {isSoftware && <LiveLinksRow links={extraLiveLinks[project.slug] ?? []} />}
        <DetailSection
          title={isSoftware ? 'Overview' : 'Project Overview'}
          html={project.overviewHtml || null}
        />
        {isSoftware ? (
          <DetailSection title="Description" html={project.descriptionHtml} />
        ) : (
          <DetailSection title="Process" html={project.processHtml} />
        )}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl animate-pulse px-6 py-8">
      <div className="mx-auto mb-12 h-10 w-2/3 rounded-xl bg-muted/60" />
      <div className="mb-10 aspect-video w-full rounded-2xl bg-muted/50" />
      <div className="mb-6 h-4 w-1/2 rounded bg-muted/50" />
      <div className="h-24 w-full rounded-xl bg-muted/40" />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, isLoading } = trpc.content.projectBySlug.useQuery(
    { slug: slug ?? '' },
    { staleTime: 60_000, retry: 1, enabled: Boolean(slug) }
  );

  const project: ProjectVM | null = useMemo(() => {
    if (!data) return null;
    return {
      slug: data.slug,
      title: data.title,
      type: data.type === 'software' ? 'software' : 'case-study',
      firstTag: data.firstTag ?? '',
      clientName: data.clientName || null,
      liveUrl: data.liveUrl || null,
      featuredImage: data.featuredImage || null,
      imageCaption: data.imageCaption ?? '',
      overviewHtml: data.overviewHtml ?? '',
      processHtml: data.processHtml,
      descriptionHtml: data.descriptionHtml,
    };
  }, [data]);

  if (isLoading) return <DetailSkeleton />;

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Project not found</h1>
        <p className="text-muted-foreground">
          This work sample may have been moved or unpublished.
        </p>
        <Link to="/projects" className="text-primary underline hover:text-primary/80">
          Back to Recent Installs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={project.title}
        description={
          data?.cardDescription ??
          `${project.title} — delivered by OllJira Technology Solution${project.clientName ? ` for ${project.clientName}` : ''}.`
        }
        image={project.featuredImage ?? undefined}
      />
      <ProjectBody key={project.slug} project={project} />
    </>
  );
}
