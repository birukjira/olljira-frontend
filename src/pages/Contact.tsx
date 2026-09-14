import { useState } from 'react';
import { Link } from 'react-router';
import {
  Phone,
  MapPin,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  Check,
  CircleCheck,
  ArrowRight,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

const ORG = {
  name: 'OllJira Technology Solution',
  shortName: 'OllJira',
  email: 'info@olljira.com',
  emailHref: 'mailto:info@olljira.com',
  phoneDisplay: '+251 96 575 9999',
  phoneHref: 'tel:+251965759999',
  location: 'Summit 72, Addis Ababa, Ethiopia',
};

const socials = [
  { id: 'threads', label: 'Threads', url: 'https://www.threads.com/@olljira' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/olljira/' },
  { id: 'x', label: 'X', url: 'https://x.com/olljira' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/olljira' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@olljira' },
];

const services = [
  'Network Cabling',
  'CCTV Installation',
  'Access Control Systems',
  'Enterprise Network Design',
  'IP Phone Systems',
  'Hospital IT Consulting',
  'IT Services & Support',
  'Software Development',
  'Maintenance & Warranty',
  'Site Survey & Quote',
];

function SocialIcon({ id }: { id: string }) {
  if (id === 'instagram') return <Instagram className="size-4" />;
  if (id === 'linkedin') return <Linkedin className="size-4" />;
  if (id === 'youtube') return <Youtube className="size-4" />;
  return (
    <span className="flex size-4 items-center justify-center text-[10px] font-semibold">
      {id === 'threads' ? 'Th' : 'X'}
    </span>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary shadow-sm">
        <img
          src="/images/brand/icon-reversed.svg"
          alt={ORG.shortName}
          className="size-7 object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium text-foreground">{ORG.name}</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Reach our team for cabling, CCTV, and IT work — licensed, certified, documented.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">Contact Information</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5">
              <Phone className="size-4 flex-shrink-0 text-muted-foreground" />
            </span>
            <div className="text-sm leading-relaxed text-muted-foreground">
              <a
                href={ORG.phoneHref}
                className="transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                {ORG.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5">
              <MapPin className="size-4 flex-shrink-0 text-muted-foreground" />
            </span>
            <div className="text-sm leading-relaxed text-muted-foreground">
              <p>{ORG.location}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title="OllJira Technology Solution location — Summit 72, Addis Ababa"
              src="https://www.google.com/maps?q=Summit,+Addis+Ababa,+Ethiopia&z=15&output=embed"
              className="h-56 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Summit,+Addis+Ababa,+Ethiopia"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="size-3.5" />
              Open in Google Maps
            </a>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5">
              <Mail className="size-4 flex-shrink-0 text-muted-foreground" />
            </span>
            <div className="text-sm leading-relaxed text-muted-foreground">
              <a
                href={ORG.emailHref}
                className="transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                {ORG.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">Quick Links</p>
        <div className="flex flex-col gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 rounded-md text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <span className="text-muted-foreground transition-colors group-hover:text-primary">
                <SocialIcon id={s.id} />
              </span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceChip({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`ease-ui-out inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isSelected
          ? 'border-primary bg-transparent text-primary'
          : 'border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      {isSelected && <Check className="size-4" />}
    </button>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: '', contact: '', message: '' });
  const submitMutation = trpc.content.submitContact.useMutation();
  const sending = submitMutation.isPending;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await submitMutation.mutateAsync({
        fullName: form.fullName.trim(),
        contact: form.contact.trim(),
        service: service ?? '',
        message: form.message.trim(),
      });
      setSent(true);
    } catch {
      setError('Something went wrong sending your message. Please try again, or reach us by phone or email.');
    }
  };

  if (sent) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center py-12 text-center">
        <CircleCheck className="mb-4 size-16 text-primary" />
        <h3 className="mb-2 text-xl font-semibold">Thank you for contacting us!</h3>
        <p className="mb-6 text-muted-foreground">
          We&apos;ve received your message and will get back to you as soon as possible.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setError(null);
            setForm({ fullName: '', contact: '', message: '' });
            setService(null);
          }}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Contact Information
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="sr-only">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Full Name"
            className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
          />
        </div>
        <div>
          <label htmlFor="contact" className="sr-only">
            Email or phone number
          </label>
          <input
            id="contact"
            name="contact"
            autoComplete="email"
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            placeholder="Email Or Phone Number"
            className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Project message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your project"
          className="min-h-[140px] w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
        />
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          What Do You Need Help With?
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <ServiceChip
              key={s}
              label={s}
              isSelected={service === s}
              onClick={() => setService(service === s ? null : s)}
            />
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={sending}
          className="h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Contact Us"
        description="Get in touch with OllJira Technology Solution in Summit 72, Addis Ababa — for network cabling, CCTV, access control, and IT services. Call, email, or send us a message."
      />
      <PageHero title="Contact Us" image="/images/brand/header-network.svg" imageAlt="OllJira network hub artwork" />

      <div
        className="animate-fade-in-up relative z-10 mx-auto -mt-16 max-w-5xl px-4 pb-12 md:-mt-20 md:px-6 md:pb-16"
        style={{ animationDuration: '0.28s', animationDelay: '0.12s' }}
      >
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm shadow-muted">
          <div className="flex flex-col md:grid md:grid-cols-[minmax(280px,1fr)_1px_1.5fr]">
            <div className="p-6 md:p-10">
              <ContactInfo />
            </div>
            <div className="hidden bg-border md:block" />
            <div className="mx-6 h-px bg-border md:hidden" />
            <div className="p-6 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-20 pt-2">
        <span className="text-sm text-muted-foreground">Or skip the form</span>
        <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
        <Link
          to="/schedule"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-medium text-primary underline-offset-4 decoration-primary/30 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          Book a Site Survey
        </Link>
      </div>
    </main>
  );
}
