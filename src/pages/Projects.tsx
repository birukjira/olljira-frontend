import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ReadyCTA from '../components/ReadyCTA';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

/* OllJira install portfolio — live from the CMS, with an instant static fallback */

const tags = [
  { id: 1, name: 'Network Cabling' },
  { id: 2, name: 'CCTV' },
  { id: 3, name: 'Wi-Fi & Networking' },
  { id: 4, name: 'IT Services' },
];

export interface WorkSample {
  id: number;
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  type: 'case-study' | 'software';
  tagIds: number[];
}

const fallbackSamples: WorkSample[] = [
  {
    id: 1,
    slug: 'summit-general-hospital-enterprise-network',
    title: 'Summit General Hospital Enterprise Network',
    description:
      'Nine floors of enterprise networking: fiber uplinks, a climate-controlled 42U data center, Active Directory, PBX, access control, and 32 CCTV cameras with motion-sensor alerts.',
    featuredImage: '/images/case-studies/office-cabling.webp',
    type: 'case-study',
    tagIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    slug: 'solkeb-hotel-network-infrastructure',
    title: 'Solkeb Hotel Full Network Infrastructure',
    description:
      'Ground plus five floors in Jijiga: managed Wi-Fi with seamless roaming, 32 CCTV cameras with zero blind spots, a PBX phone system, and a mini server room on a TP-Link Omada stack.',
    featuredImage: '/images/case-studies/hotel-cctv.webp',
    type: 'case-study',
    tagIds: [2, 3],
  },
  {
    id: 3,
    slug: 'kegna-trading-assembly-cctv',
    title: 'Kegna Trading Assembly Plant CCTV',
    description:
      'PTZ camera coverage for Ethiopia’s largest agricultural equipment assembly line, industrial-grade structured cabling, rackmount NVR storage, and remote HQ monitoring over VPN.',
    featuredImage: '/images/case-studies/industrial-cctv.webp',
    type: 'case-study',
    tagIds: [1, 2],
  },
];

const fallbackSoftware: WorkSample[] = [
  {
    id: 1,
    slug: 'solkeb-hotel-management-system',
    title: 'Solkeb Hotel — Hotel & Restaurant Management System',
    description:
      'A QR digital menu with table-side waiter calling and an Android app for waiters, kitchen and barista order routing, bank and wallet payment verification, the hotel’s own website with online room booking and in-room ordering, and voucher-based guest Wi-Fi tied to the menu.',
    featuredImage: '/images/case-studies/solkeb-software.webp',
    type: 'software',
    tagIds: [4],
  },
];

const parseTagIds = (csv: string | null | undefined): number[] =>
  (csv ?? '')
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n));

function TagFilter({
  selectedTagId,
  onTagSelect,
}: {
  selectedTagId: number | null;
  onTagSelect: (id: number | null) => void;
}) {
  const cls = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-foreground bg-foreground text-background'
        : 'border-zinc-200 bg-white text-foreground hover:border-zinc-300'
    }`;
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onTagSelect(null)} className={cls(selectedTagId === null)}>
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagSelect(tag.id)}
          className={cls(selectedTagId === tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}

function SampleCard({ sample }: { sample: WorkSample }) {
  return (
    <div className="group">
      <Link
        to={`/projects/${sample.slug}`}
        className="block"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={sample.featuredImage}
            alt={sample.title}
            className="size-full object-cover"
          />
        </div>
        <div className="gap-y-3">
          <h3 className="font-serif text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {sample.title}
          </h3>
          {sample.description && (
            <p className="line-clamp-2 text-xs text-zinc-500">{sample.description}</p>
          )}
          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex min-h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground">
              {sample.type === 'case-study' ? 'Case Study' : 'Software'}
            </span>
            <span className="inline-flex min-h-9 items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover:text-primary">
              {sample.type === 'case-study' ? 'Visit Site' : 'View Project'}
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Projects() {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const { data } = trpc.content.projects.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });

  const { samples, software } = useMemo(() => {
    if (!data) return { samples: fallbackSamples, software: fallbackSoftware };
    const all: WorkSample[] = data.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.cardDescription ?? '',
      featuredImage: p.featuredImage ?? '',
      type: p.type === 'software' ? 'software' : 'case-study',
      tagIds: parseTagIds(p.tagIds),
    }));
    return {
      samples: all.filter((p) => p.type === 'case-study'),
      software: all.filter((p) => p.type === 'software'),
    };
  }, [data]);

  const visible = useMemo(
    () =>
      selectedTagId === null
        ? samples
        : samples.filter((s) => s.tagIds.includes(selectedTagId)),
    [selectedTagId, samples]
  );

  return (
    <>
      <Seo
        title="Work Samples"
        description="Recent installs by OllJira Technology Solution: enterprise networks, CCTV systems, and hotel software delivered for clients like Summit General Hospital and Solkeb Hotel across Ethiopia."
      />
      <PageHeader
        image="/images/brand/header-network.svg"
        imageAlt="OllJira network hub artwork"
        imageClassName="translate-y-[-42px] scale-70 md:translate-y-[-35px] md:scale-80"
      />
      <div className="min-h-screen w-full pb-20">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <header className="mb-8">
            <h1 className="mb-2 font-serif text-[32px] font-medium tracking-tight text-foreground md:text-5xl">
              Recent Installs
            </h1>
            <p className="text-sm text-zinc-500 md:text-base">
              A look at the cabling, cameras, and networks we have delivered across Ethiopia.
            </p>
          </header>
          <h2 className="sr-only">Featured work samples</h2>
          <div className="mb-10">
            <TagFilter selectedTagId={selectedTagId} onTagSelect={setSelectedTagId} />
          </div>
          {visible.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-zinc-500">No work samples found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {visible.map((s) => (
                <SampleCard key={`${s.type}-${s.id}`} sample={s} />
              ))}
            </div>
          )}
          {(selectedTagId === null || selectedTagId === 4) && software.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-2 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                Software Solutions
              </h2>
              <p className="mb-8 text-sm text-zinc-500 md:text-base">
                Systems we designed and built — running on infrastructure we installed ourselves.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {software.map((s) => (
                  <SampleCard key={`software-${s.id}`} sample={s} />
                ))}
              </div>
            </div>
          )}
        </div>
        <ReadyCTA />
      </div>
    </>
  );
}
