import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

type Vacancy = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  department: string | null;
  location: string | null;
  workplaceType: string | null;
  employmentType: string | null;
  seniority: string | null;
  externalApplyUrl: string | null;
  applyEmail: string | null;
  deadlineAt: string | Date | null;
  canApply: boolean;
  featuredImageUrl: string | null;
  contentHtml: string;
};

/* Instant fallback while the CMS answers */
const fallbackVacancies: Vacancy[] = [
  {
    id: 2,
    title: 'CCTV Installation Technician',
    slug: 'cctv-installation-technician',
    excerpt:
      'We’re looking for a technician who can mount, cable, and configure IP camera systems to spec. You’ll work with our lead engineer on site surveys, installation, and testing — with Hikvision certification support for the right candidate.',
    department: 'Field Operations',
    location: 'Addis Ababa',
    workplaceType: 'ONSITE',
    employmentType: 'FULL_TIME',
    seniority: 'MID',
    externalApplyUrl: null,
    applyEmail: 'careers@olljira.com',
    deadlineAt: '2026-09-15 14:15:00+00',
    canApply: true,
    featuredImageUrl: '/images/careers/field-team.webp',
    contentHtml: '',
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
    seniority: 'JUNIOR',
    externalApplyUrl: null,
    applyEmail: 'careers@olljira.com',
    deadlineAt: '2026-08-30 22:11:25.33+00',
    canApply: false,
    featuredImageUrl: '/images/careers/field-team.webp',
    contentHtml: '',
  },
];

const humanDate = (d: string | Date) =>
  new Date(d).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

function Badge({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
        open
          ? 'border-transparent bg-primary text-primary-foreground'
          : 'border-border text-foreground'
      }`}
    >
      {open ? 'Open' : 'Closed'}
    </span>
  );
}

function CompactRoleCard({ role }: { role: Vacancy }) {
  return (
    <Link
      to={`/careers/${role.slug}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="ease-ui-out group relative block overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/30 hover:shadow-md sm:p-5"
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
      <h3 className="line-clamp-2 text-sm font-semibold leading-6 tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
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
    </Link>
  );
}

function MoreCareers({ current, all }: { current: Vacancy; all: Vacancy[] }) {
  const others = all.filter((v) => v.id !== current.id).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <aside className="hidden md:block md:w-1/3 md:max-w-xs md:self-start md:sticky md:top-24">
      <div className="flex items-center gap-4">
        <h2 className="text-sm uppercase tracking-[0.08em] text-muted-foreground">More Careers</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {others.map((r) => (
          <CompactRoleCard key={r.id} role={r} />
        ))}
      </div>
    </aside>
  );
}

const inputClass =
  'h-11 w-full rounded-xl border border-input bg-card px-3 text-base shadow-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-sm';

function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="text-base font-semibold text-foreground">Thanks for applying!</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We've received your application and will get back to you if there's a match.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
          setSubmitting(false);
          setDone(true);
        }, 900);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full name
          </label>
          <input id="fullName" name="fullName" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="resume" className="text-sm font-medium text-foreground">
            Resume
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="h-11 w-full rounded-xl border border-input bg-card px-3 py-2 text-base shadow-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-sm"
          />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="linkedinUrl" className="text-sm font-medium text-foreground">
            LinkedIn URL
          </label>
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/..."
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="portfolioUrl" className="text-sm font-medium text-foreground">
            Portfolio URL
          </label>
          <input
            id="portfolioUrl"
            name="portfolioUrl"
            type="url"
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="coverLetter" className="text-sm font-medium text-foreground">
          Cover letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={5}
          placeholder="Tell us why you're a great fit..."
          className="w-full rounded-xl border border-input bg-card px-3 py-2 text-base shadow-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-sm"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
        />
        I consent to having my data processed for recruitment purposes.
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}

export default function CareerDetail() {
  const { slug } = useParams();
  const jobsQuery = trpc.content.jobs.useQuery(undefined, { staleTime: 60_000, retry: 1 });
  const jobQuery = trpc.content.jobBySlug.useQuery(
    { slug: slug ?? '' },
    { staleTime: 60_000, retry: 1, enabled: Boolean(slug) }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const all: Vacancy[] = (jobsQuery.data ?? []).map((j) => ({
    id: j.id,
    title: j.title,
    slug: j.slug,
    excerpt: j.excerpt,
    department: j.department,
    location: j.location,
    workplaceType: j.workplaceType,
    employmentType: j.employmentType,
    seniority: j.seniority,
    externalApplyUrl: j.externalApplyUrl,
    applyEmail: j.applyEmail,
    deadlineAt: j.deadlineAt,
    canApply: j.canApply,
    featuredImageUrl: j.featuredImage,
    contentHtml: j.contentHtml ?? '',
  }));
  const list = all.length > 0 ? all : fallbackVacancies;

  const fallbackRole = list.find((v) => v.slug === slug);
  const role: Vacancy | undefined = jobQuery.data
    ? {
        id: jobQuery.data.id,
        title: jobQuery.data.title,
        slug: jobQuery.data.slug,
        excerpt: jobQuery.data.excerpt,
        department: jobQuery.data.department,
        location: jobQuery.data.location,
        workplaceType: jobQuery.data.workplaceType,
        employmentType: jobQuery.data.employmentType,
        seniority: jobQuery.data.seniority,
        externalApplyUrl: jobQuery.data.externalApplyUrl,
        applyEmail: jobQuery.data.applyEmail,
        deadlineAt: jobQuery.data.deadlineAt,
        canApply: jobQuery.data.canApply,
        featuredImageUrl: jobQuery.data.featuredImage,
        contentHtml: jobQuery.data.contentHtml ?? '',
      }
    : fallbackRole;
  const content = role?.contentHtml ?? '';

  if (!role) {
    return (
      <div className="min-h-screen w-full pb-20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Careers
          </Link>
          <p className="mt-10 text-sm text-muted-foreground">Role not found.</p>
        </div>
      </div>
    );
  }

  const meta = [
    role.department,
    role.location,
    role.employmentType,
    role.workplaceType,
    role.seniority,
    role.deadlineAt && `Deadline: ${humanDate(role.deadlineAt)}`,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen w-full pb-20">
      <Seo
        title={`${role.title} — Careers`}
        description={role.excerpt ?? `OllJira Technology Solution is hiring: ${role.title} in ${role.location ?? 'Addis Ababa'}.`}
        image={role.featuredImageUrl ?? undefined}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:gap-8">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex items-center gap-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                Careers
              </Link>
              <div className="h-px flex-1 bg-border" />
              <Badge open={role.canApply} />
            </div>

            {role.featuredImageUrl ? (
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl sm:aspect-video">
                <img
                  src={role.featuredImageUrl}
                  alt={role.title}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                    {role.title}
                  </h1>
                  {role.excerpt && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">{role.excerpt}</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75">
                    {meta.map((m, i) => (
                      <span key={i} className="inline-flex items-center gap-3">
                        {i > 0 && <span className="text-white/50">•</span>}
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                  {role.title}
                </h1>
                {role.excerpt && (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {role.excerpt}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {meta.map((m, i) => (
                    <span key={i} className="inline-flex items-center gap-3">
                      {i > 0 && <span>•</span>}
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {role.canApply && (role.externalApplyUrl || role.applyEmail) && (
              <div className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
                <h2 className="text-xl font-semibold">Apply options</h2>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {role.externalApplyUrl && (
                    <a
                      href={role.externalApplyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Apply externally
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                  {role.applyEmail && (
                    <a
                      href={`mailto:${role.applyEmail}`}
                      className="inline-flex h-10 items-center rounded-full border border-input px-5 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Email: {role.applyEmail}
                    </a>
                  )}
                </div>
              </div>
            )}

            <section className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
              <h2 className="text-xl font-semibold">Job description</h2>
              <div
                className="mt-4 text-[15px] leading-7 text-[#444] [&_a]:text-primary [&_a]:underline [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_p]:my-3 [&_img]:my-4 [&_img]:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </section>

            <section className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
              <h2 className="text-xl font-semibold">Apply</h2>
              {role.canApply ? (
                <ApplicationForm />
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  This role is currently closed for applications.
                </p>
              )}
            </section>
          </div>

          <MoreCareers current={role} all={list} />
        </div>
      </div>
    </div>
  );
}
