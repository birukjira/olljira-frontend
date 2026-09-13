import { useState } from 'react';
import { Link } from 'react-router';
import { CalendarCheck, CircleCheck, Video } from 'lucide-react';
import PageHero from '../components/PageHero';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

const services = [
  'Network Cabling',
  'CCTV Installation',
  'Access Control Systems',
  'Enterprise Network Design',
  'IP Phone Systems',
  'Hospital IT Consulting',
  'IT Services',
  'Software Development',
  'Maintenance & Support',
];

const inputClass =
  'h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40';

function SurveyForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [service, setService] = useState(services[0]);

  if (sent) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center px-6 py-16 text-center">
        <CircleCheck className="mb-4 size-16 text-primary" />
        <h3 className="mb-2 text-xl font-semibold">Survey request received!</h3>
        <p className="mb-6 max-w-md text-muted-foreground">
          We&apos;ll call you within one business day to confirm the visit time. Your itemized
          quote follows within 48 hours of the survey.
        </p>
        <button
          onClick={() => setSent(false)}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Book Another Survey
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5 p-6 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
          setSending(false);
          setSent(true);
        }, 700);
      }}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CalendarCheck className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Request a site survey</h2>
          <p className="text-sm text-muted-foreground">
            We walk your site, measure everything, and quote within 48 hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input required placeholder="Full Name" autoComplete="name" className={inputClass} />
        <input
          required
          placeholder="Phone Number"
          autoComplete="tel"
          type="tel"
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input required placeholder="Site Address (e.g. Bole, near Atlas)" className={inputClass} />
        <input
          required
          type="date"
          aria-label="Preferred survey date"
          className={`${inputClass} text-muted-foreground`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          What do you need surveyed?
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setService(s)}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                service === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={4}
        placeholder="Anything we should know? (floors, rooms, existing equipment...)"
        className="min-h-[110px] w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      />

      <button
        type="submit"
        disabled={sending}
        className="h-12 w-full rounded-lg bg-accent text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {sending ? 'Sending...' : 'Book My Site Survey'}
      </button>
    </form>
  );
}

/* Default booking calendar — admins can override in Admin → Settings */
const DEFAULT_BOOKING_EMBED_URL =
  'https://cal.com/birukjira/15min?embed=true&theme=light';

function VirtualCallCard() {
  const { data: embedUrl } = trpc.content.bookingEmbedUrl.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const url = (embedUrl ?? '').trim() || DEFAULT_BOOKING_EMBED_URL;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-zinc-100 p-6 md:px-10">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Video className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Prefer a video call? Book a Google Meet
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick a time that suits you — the meeting link lands in your inbox automatically.
          </p>
        </div>
      </div>
      {url ? (
        <iframe
          src={url}
          title="Book a Google Meet call with OllJira"
          className="h-[640px] w-full border-0"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            Our live calendar is being connected. In the meantime, request your virtual
            consultation and we will send you a Google Meet link the same day.
          </p>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request a Virtual Call
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Schedule() {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Book a Site Survey"
        description="Book a free site survey or consultation with OllJira Technology Solution — cabling, CCTV, access control, network design, and IT services in Addis Ababa."
      />
      <PageHero title="Book a Site Survey" image="/images/brand/header-network.svg" imageAlt="OllJira network hub artwork" />

      <div
        className="animate-fade-in-up relative z-10 mx-auto -mt-16 max-w-5xl px-4 pb-20 md:-mt-20 md:px-6"
        style={{ animationDuration: '0.5s', animationDelay: '0.3s' }}
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <SurveyForm />
        </div>
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
          <p className="text-sm font-medium text-muted-foreground">Or</p>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>
        <VirtualCallCard />
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="text-primary underline transition-colors hover:text-primary/80"
          >
            Request an itemized quote
          </Link>
        </div>
      </div>
    </main>
  );
}
