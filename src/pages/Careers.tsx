import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from '../components/PageHeader';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

type Role = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  department: string | null;
  location: string | null;
  workplaceType: 'ONSITE' | 'REMOTE' | 'HYBRID' | null;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'TEMP' | null;
  deadlineAt: string | Date | null;
  canApply: boolean;
};

/* Instant first paint — replaced by live CMS jobs when the API answers */
const fallbackRoles: Role[] = [
  {
    id: 2,
    title: 'CCTV Installation Technician',
    slug: 'cctv-installation-technician',
    excerpt:
      'We\u2019re looking for a technician who can mount, cable, and configure IP camera systems to spec. You\u2019ll work with our lead engineer on site surveys, installation, and testing — with Hikvision certification support for the right candidate.',
    department: 'Field Operations',
    location: 'Addis Ababa',
    workplaceType: 'ONSITE',
    employmentType: 'FULL_TIME',
    deadlineAt: '2026-09-15 14:15:00+00',
    canApply: true,
  },
  {
    id: 1,
    title: 'Junior Network Cabling Technician',
    slug: 'junior-network-cabling-technician',
    excerpt:
      'Assist our installation crews with cable pulling, termination, and labeling on structured cabling projects across Addis Ababa. A great first role if you want to learn the trade properly — tested, labeled, documented.',
    department: 'Field Operations',
    location: 'Addis Ababa',
    workplaceType: 'ONSITE',
    employmentType: 'CONTRACT',
    deadlineAt: '2026-08-30 22:11:25.33+00',
    canApply: false,
  },
];

const humanDate = (d: string | Date) =>
  new Date(d).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

function RoleCard({ role }: { role: Role }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/careers/${role.slug}`)}
      className="ease-ui-out group relative block min-h-full cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/30 hover:shadow-md"
    >
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-32 w-40 opacity-60 transition-opacity duration-300 group-hover:opacity-80"
        style={{
          backgroundImage: 'url(/images/brand/diagonal.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          maskImage: 'linear-gradient(to bottom left, black 30%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, black 30%, transparent 80%)',
        }}
      />
      <div className="relative z-10 p-5 sm:p-6">
        <h3 className="line-clamp-2 text-base font-semibold leading-6 tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-lg">
          {role.title}
        </h3>
        {role.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f6668]">{role.excerpt}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5f6668]">
          {role.department && <span className="inline-flex items-center">{role.department}</span>}
          {role.location && <span className="inline-flex items-center">{role.location}</span>}
          {role.employmentType && (
            <span className="inline-flex items-center capitalize">
              {role.employmentType.toLowerCase().replace('_', ' ')}
            </span>
          )}
          {role.workplaceType && (
            <span className="inline-flex items-center capitalize">
              {role.workplaceType.toLowerCase()}
            </span>
          )}
        </div>
        {role.deadlineAt && (
          <div className="mt-2 text-xs font-medium text-primary">
            Deadline: {humanDate(role.deadlineAt)}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Careers() {
  const [query, setQuery] = useState('');
  const jobsQuery = trpc.content.jobs.useQuery(undefined, { staleTime: 60_000, retry: 1 });

  const roles: Role[] = useMemo(() => {
    if (!jobsQuery.data) return fallbackRoles;
    return jobsQuery.data.map((j) => ({
      id: j.id,
      title: j.title,
      slug: j.slug,
      excerpt: j.excerpt,
      department: j.department,
      location: j.location,
      workplaceType: j.workplaceType,
      employmentType: j.employmentType,
      deadlineAt: j.deadlineAt,
      canApply: j.canApply,
    }));
  }, [jobsQuery.data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.department ?? '').toLowerCase().includes(q) ||
        (r.location ?? '').toLowerCase().includes(q)
    );
  }, [query, roles]);

  const open = filtered.filter((r) => r.canApply);
  const closed = filtered.filter((r) => !r.canApply);

  return (
    <main>
      <Seo
        title="Careers"
        description="Join OllJira Technology Solution's certified field team in Addis Ababa. Open roles in network cabling, CCTV installation, and IT services — tested, labeled, documented work."
      />
      <PageHeader image="/images/brand/header-network.svg" imageAlt="OllJira network hub artwork" />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:gap-12">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Careers
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Join a certified field team that takes pride in tested, labeled, documented work.
            </p>
          </div>
          <div className="w-full md:w-[360px]">
            <label htmlFor="careers-search" className="sr-only">
              Search roles
            </label>
            <input
              id="careers-search"
              name="search"
              type="search"
              autoComplete="off"
              placeholder="Search roles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-card text-base shadow-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-sm"
            />
          </div>
        </header>

        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">No roles found. Try a different search.</p>
          </div>
        )}

        {open.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Open roles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              {open.map((r) => (
                <RoleCard key={r.id} role={r} />
              ))}
            </div>
          </section>
        )}

        {closed.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Closed roles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              {closed.map((r) => (
                <RoleCard key={r.id} role={r} />
              ))}
            </div>
          </section>
        )}

        {query.length > 0 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setQuery('')}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
