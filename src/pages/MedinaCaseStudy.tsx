import { Link } from 'react-router';
import {
  ArrowLeft,
  ArrowUpRight,
  BellRing,
  Globe,
  Hospital,
  Mail,
  MessageSquareText,
  QrCode,
  Smartphone,
  Send,
} from 'lucide-react';
import Seo from '../components/Seo';
import ReadyCTA from '../components/ReadyCTA';

const pillars = [
  {
    icon: Globe,
    title: 'Hospital Website',
    url: 'https://mhcs.org.et/',
    urlLabel: 'mhcs.org.et',
    image: '/images/case-studies/medina-hospital-website.webp',
    caption: 'The Medina Primary Hospital homepage',
    points: [
      'Fully dynamic, CMS-driven — hospital staff publish everything themselves',
      'Find-a-Doctor search with profiles, specialties, and branch assignments',
      'Service and department pages for both branches (Kebele 05 and Kebele 07)',
      'Health-tips blog, research section, and an online learning platform',
      'Careers, news & events, and direct contact by phone or Telegram',
    ],
  },
  {
    icon: Hospital,
    title: 'Patient Portal',
    url: 'https://portal.mhcs.org.et/',
    urlLabel: 'portal.mhcs.org.et',
    image: '/images/case-studies/medina-patient-portal.webp',
    caption: 'Patient sign-in with chart number + SMS code',
    points: [
      'Lab results, procedures, and prescriptions online the moment they are approved',
      'Imaging reports — X-ray, ultrasound, and other scans — viewable and downloadable',
      'Secure sign-in with chart number + one-time SMS code, no passwords to forget',
      'Automatic result notifications by SMS and email',
      'Telegram bot delivers report links to patients on Telegram',
      'Every printed report carries a verifiable QR code',
    ],
  },
  {
    icon: Smartphone,
    title: 'Medina Care Mobile App',
    url: null,
    urlLabel: 'Launching soon',
    image: '/images/case-studies/medina-care-app.webp',
    caption: 'Medina Care — telemedicine, booking & payments',
    points: [
      'Telemedicine video consultations with Medina doctors from anywhere',
      'Online appointment booking with real-time availability across both branches',
      'In-app payments for consultations and services',
      'Direct access to lab results and imaging reports from the portal',
      'Appointment reminders and result notifications on the phone',
    ],
  },
];

const flow = [
  {
    icon: Hospital,
    title: 'Lab approves the result',
    text: 'The moment a lab technician or radiologist approves a report, it becomes available — no printing, no queue, no second trip.',
  },
  {
    icon: BellRing,
    title: 'Patient gets notified',
    text: 'An SMS and an email go out automatically. Patients on Telegram get their report link from the Medina bot.',
  },
  {
    icon: QrCode,
    title: 'Anyone can verify it',
    text: 'Every printed report carries a QR code. Employers, insurers, and other hospitals can verify authenticity in seconds.',
  },
];

const channels = [
  { icon: MessageSquareText, label: 'SMS' },
  { icon: Mail, label: 'Email' },
  { icon: Send, label: 'Telegram Bot' },
];

const stats = [
  { value: '3', label: 'Connected systems — website, portal, mobile app' },
  { value: '2', label: 'Branches served — Kebele 05 & Kebele 07, Jijiga' },
  { value: '24/7', label: 'Always-on access to results and hospital information' },
  { value: '0', label: 'Extra trips to the hospital just to collect a report' },
];

export default function MedinaCaseStudy() {
  return (
    <>
      <Seo
        title="Medina Primary Hospital — Digital Health Platform"
        description="How OllJira built Medina Primary Hospital's complete digital platform: a dynamic hospital website, a secure patient portal with imaging reports and SMS/email/Telegram notifications, and the Medina Care telemedicine app."
        image="/images/case-studies/medina-patient-portal.webp"
      />
      <div className="min-h-screen w-full pb-20">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* back link */}
          <div className="mb-10 flex items-center gap-3">
            <Link
              to="/projects"
              className="group flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>Recent Installs</span>
            </Link>
            <div className="flex-1 border-t border-dashed border-zinc-300" />
          </div>

          {/* header */}
          <header className="mb-12 text-center">
            <span className="mb-6 inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Flagship Case Study
            </span>
            <h1 className="mb-6 font-serif text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Medina Primary Hospital — A Complete Digital Health Platform
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
              One hospital in Jijiga, three connected systems. OllJira designed and built Medina
              Primary Hospital's public website, secure patient portal, and the upcoming Medina
              Care mobile app — one platform that follows the patient from their first search to
              their final report.
            </p>
          </header>

          {/* stats */}
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
              >
                <p className="mb-2 font-serif text-3xl font-semibold text-primary md:text-4xl">
                  {s.value}
                </p>
                <p className="text-xs leading-relaxed text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* pillars */}
          <section className="mb-16">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Three systems, one platform
            </h2>
            <div className="flex flex-col gap-12">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  className={`flex flex-col gap-6 md:items-center ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  <div className="md:w-1/2">
                    <div className="overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={p.image}
                        alt={p.caption}
                        className="aspect-video w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-center text-xs text-zinc-400">{p.caption}</p>
                  </div>
                  <div className="md:w-1/2">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <p.icon size={20} />
                      </span>
                      <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <ul className="mb-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-zinc-600">
                      {p.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                      >
                        {p.urlLabel}
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex h-9 items-center rounded-full bg-amber-100 px-4 text-sm font-medium text-amber-800">
                        {p.urlLabel}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* notification flow */}
          <section className="mb-16 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
            <h2 className="mb-2 text-center font-serif text-2xl font-semibold md:text-3xl">
              The result finds the patient
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              Before the portal, collecting results meant a second trip to the hospital and a wait
              at the records desk. Now the report reaches the patient wherever they are.
            </p>
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              {flow.map((f, i) => (
                <div key={f.title} className="rounded-2xl bg-white/10 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                      <f.icon size={18} />
                    </span>
                    <span className="font-serif text-lg font-semibold">
                      {i + 1}. {f.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-primary-foreground/80">{f.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-primary-foreground/70">Delivered over</span>
              {channels.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium"
                >
                  <c.icon size={15} />
                  {c.label}
                </span>
              ))}
            </div>
          </section>

          {/* why it matters */}
          <section className="mb-8">
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground md:text-2xl">
              Why it matters
            </h2>
            <div className="space-y-4 leading-relaxed text-zinc-600">
              <p>
                Medina Primary Hospital serves Jijiga around the clock — and many of its patients
                travel in from surrounding towns. A second trip just to collect a piece of paper
                can cost a family a full day. This platform removes that trip: results arrive by
                SMS, email, or Telegram the moment they are approved, imaging reports are readable
                online, and every printed copy can be verified by QR code.
              </p>
              <p>
                For the hospital, the website is no longer a brochure — staff publish news, health
                tips, research, and courses themselves through the admin panel, and the learning
                platform keeps their own teams training. With the Medina Care app, the same
                platform will soon put telemedicine, booking, and payments in every patient's
                pocket.
              </p>
              <p>
                Designed, built, and operated by OllJira Technology Solution — the same team that
                wires the networks these systems run on.
              </p>
            </div>
          </section>
        </div>
        <ReadyCTA />
      </div>
    </>
  );
}
