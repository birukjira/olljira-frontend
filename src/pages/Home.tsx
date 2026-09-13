import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight,
  Plus,
  Minus,
  Cable,
  Cctv,
  Wrench,
  ShieldCheck,
  CodeXml,
  DoorOpen,
  Network,
  PhoneCall,
  HeartPulse,
  CalendarCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Zap,
  Layers,
  FileText,
  X,
} from 'lucide-react';
import LogoMarquee from '../components/LogoMarquee';
import TechMarquee from '../components/TechMarquee';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

/* ============================== HERO ============================== */

/* Fallback hero slides — replaced by live CMS slides when the API answers */
const fallbackHeroSlides = [
  {
    id: 1,
    title: 'Structured network cabling installation',
    desktop: '/images/hero/cabling-desktop.webp',
    mobile: '/images/hero/cabling-mobile.webp',
    mockup: false,
  },
  {
    id: 2,
    title: 'CCTV surveillance installation',
    desktop: '/images/hero/cctv-desktop.webp',
    mobile: '/images/hero/cctv-mobile.webp',
    mockup: false,
  },
  {
    id: 3,
    title: 'Business IT services',
    desktop: '/images/hero/it-desktop.webp',
    mobile: '/images/hero/it-mobile.webp',
    mockup: false,
  },
  {
    id: 4,
    title: 'Custom software — live at Solkeb Hotel',
    desktop: '/images/hero/mockup-laptop.webp',
    mobile: '/images/hero/mockup-phone.webp',
    mockup: true,
  },
];

const avatars = [
  '/images/avatars/client-1.webp',
  '/images/avatars/client-2.webp',
  '/images/avatars/client-3.webp',
  '/images/avatars/client-4.webp',
];

const slideTransform = (i: number, current: number) =>
  `translate3d(${(i - current) * 100}%, 0, 0)`;

function useSlideRotation(count: number) {
  const [current, setCurrent] = useState(0);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    if (count <= 1 || engaged) return;
    const engage = () => setEngaged(true);
    const id = window.setTimeout(engage, 4000);
    window.addEventListener('pointerdown', engage, { once: true, passive: true });
    window.addEventListener('keydown', engage, { once: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('pointerdown', engage);
      window.removeEventListener('keydown', engage);
    };
  }, [count, engaged]);

  useEffect(() => {
    if (!engaged || count <= 1) return;
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % count), 5500);
    return () => window.clearInterval(id);
  }, [engaged, count]);

  return current;
}

function ClientAvatars({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'inline-flex max-w-[calc(100vw-2rem)] flex-nowrap items-center gap-3 rounded-2xl bg-background/95 p-3 shadow-[0_18px_48px_rgba(15,23,42,0.16)] backdrop-blur-[6px]'
          : 'inline-flex max-w-full flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-background/95 px-3 py-2 shadow-sm backdrop-blur-[2px]'
      }
    >
      <div className={compact ? 'flex shrink-0 -gap-x-2' : 'flex shrink-0 -gap-x-3'}>
        {avatars.map((src) => (
          <div key={src} className="relative z-0 transition-all hover:z-10">
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className={
                compact
                  ? 'size-8 rounded-full object-cover ring-2 ring-white'
                  : 'size-10 rounded-full border-[2px] border-background object-cover sm:size-11'
              }
            />
          </div>
        ))}
        <div
          className={
            compact
              ? 'relative z-10 flex size-8 items-center justify-center rounded-full border border-dashed border-primary/40 bg-[#f6f3e8]'
              : 'relative z-10 flex size-10 items-center justify-center rounded-full border-[2px] border-background bg-muted sm:size-11'
          }
        >
          <span
            className={
              compact
                ? 'text-xs font-medium text-muted-foreground'
                : 'text-[10px] font-medium text-muted-foreground'
            }
          >
            You
          </span>
        </div>
      </div>
      <span
        className={
          compact
            ? 'min-w-0 whitespace-nowrap text-[13px] font-medium leading-none text-primary'
            : 'text-[11px] font-medium leading-none text-primary sm:text-sm'
        }
      >
        Trusted across Ethiopia
      </span>
    </div>
  );
}

function AnnouncementPill() {
  return (
    <div className="ease-ui-out group inline-flex h-8 max-w-full items-center gap-2 rounded-full border border-border/50 bg-muted p-1 pl-3 text-[11px] font-medium text-foreground shadow-md shadow-zinc-950/5 transition-[background-color,border-color,transform] duration-300 hover:border-primary/20 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98] sm:gap-3 sm:pl-4">
      <Link to="/schedule" className="min-w-0 truncate">
        Now booking site surveys across Addis Ababa
      </Link>
      <span aria-hidden="true" className="hidden h-4 w-px rounded-full bg-border sm:block" />
      <span className="ease-ui-out flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors duration-300 group-hover:bg-muted">
        <ArrowRight
          aria-hidden="true"
          className="ease-ui-out size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </div>
  );
}

function HeroButtons({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="flex w-full items-center gap-3 pt-1 min-[390px]:w-auto">
      <button
        type="button"
        onClick={onBookClick}
        className="ease-ui-out group inline-flex h-11 items-center rounded-full bg-accent py-1 pl-1 pr-4 text-white shadow-[0_12px_28px_rgba(242,140,40,0.25)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-accent/90 hover:shadow-[0_14px_34px_rgba(242,140,40,0.3)] focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.97]"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-white shadow-inner">
          <CalendarCheck className="size-5 text-accent" aria-hidden="true" />
        </span>
        <span className="ml-2 text-sm font-medium">Book a Site Survey</span>
      </button>
      <Link
        to="/projects"
        className="ease-ui-out inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-primary transition-[color,transform] duration-200 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 active:scale-[0.97]"
      >
        Recent Installs
      </Link>
    </div>
  );
}

function SoftwareMockup({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const altLaptop = active ? 'Solkeb Hotel digital menu running on a laptop' : '';
  const altPhone = active ? 'Solkeb guest QR menu on a phone' : '';
  return (
    <div className="flex size-full items-center justify-center bg-[#e8edf3]">
      <div className={`relative ${compact ? 'w-[88%]' : 'w-[72%] max-w-[780px]'}`}>
        {/* laptop */}
        <div className="relative">
          <div className="rounded-t-[12px] border-[7px] border-b-0 border-[#101c2b] bg-[#101c2b] shadow-[0_28px_56px_rgba(11,46,79,0.35)] sm:border-[9px]">
            <div className="overflow-hidden rounded-t-[5px]">
              <img
                src="/images/hero/mockup-laptop.webp"
                alt={altLaptop}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="relative left-1/2 h-[9px] w-[calc(100%+36px)] -translate-x-1/2 rounded-b-[10px] bg-gradient-to-b from-[#33455c] to-[#101c2b] shadow-[0_14px_28px_rgba(11,46,79,0.3)] sm:h-[12px]" />
        </div>
        {/* phone */}
        <div className="absolute -bottom-7 -right-3 w-[24%] rounded-[18px] border-[4px] border-[#101c2b] bg-[#101c2b] shadow-[0_18px_36px_rgba(11,46,79,0.45)] sm:-right-6 sm:rounded-[24px] sm:border-[5px]">
          <div className="overflow-hidden rounded-[13px] sm:rounded-[18px]">
            <img
              src="/images/hero/mockup-phone.webp"
              alt={altPhone}
              loading="lazy"
              decoding="async"
              className="w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type HeroSlideVM = {
  id: number;
  title: string;
  desktop: string;
  mobile: string;
  mockup: boolean;
};

function DesktopSlides({ current, slides }: { current: number; slides: HeroSlideVM[] }) {
  return (
    <div className="relative mx-auto hidden size-full max-w-[1278px] md:block">
      <div className="relative aspect-[16/9] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== current}
            className="absolute inset-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
            style={{ opacity: i === current ? 1 : 0.001, transform: slideTransform(i, current) }}
          >
            {s.mockup ? (
              <SoftwareMockup active={i === current} />
            ) : (
              <img
                src={s.desktop}
                alt={i === current ? s.title : ''}
                width={1400}
                height={788}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`size-full object-cover transition-transform ease-out motion-reduce:transition-none ${
                  i === current ? 'scale-[1.025] duration-[6500ms]' : 'scale-100 duration-700'
                }`}
              />
            )}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-background/10 to-background/70" />
      </div>
      <div className="absolute left-3 bottom-14 z-20 xl:-left-[56px]">
        <ClientAvatars />
      </div>
    </div>
  );
}

function MobileSlides({ current, slides }: { current: number; slides: HeroSlideVM[] }) {
  return (
    <div className="relative mx-auto -mt-14 mb-10 w-full max-w-[376px] md:hidden">
      <div className="relative aspect-[9/16] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== current}
            className="absolute inset-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
            style={{ opacity: i === current ? 1 : 0.001, transform: slideTransform(i, current) }}
          >
            {s.mockup ? (
              <SoftwareMockup active={i === current} compact />
            ) : (
              <img
                src={s.mobile}
                alt={i === current ? s.title : ''}
                width={540}
                height={960}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="size-full object-contain transition-transform duration-700 ease-out motion-reduce:transition-none"
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 -bottom-4 z-20 flex justify-center px-4">
        <ClientAvatars compact />
      </div>
    </div>
  );
}

function Hero({ onBookClick }: { onBookClick: () => void }) {
  const { data: slideRows } = trpc.content.heroSlides.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const slides: HeroSlideVM[] =
    slideRows && slideRows.length > 0
      ? slideRows.map((s) => ({
          id: s.id,
          title: s.title,
          desktop: s.desktopImage ?? '',
          mobile: s.mobileImage ?? '',
          mockup: s.kind === 'mockup',
        }))
      : fallbackHeroSlides;
  const current = useSlideRotation(slides.length);
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pb-0 pt-0 sm:px-6 md:min-h-[760px] md:pt-12 lg:px-8">
      <MobileSlides current={current} slides={slides} />
      <div className="mx-auto flex w-full max-w-[820px] flex-col items-start text-left md:items-center md:text-center">
        <div className="animate-fade-in-up mb-4 max-w-full" style={{ animationDuration: '0.42s' }}>
          <AnnouncementPill />
        </div>
        <h1
          className="animate-fade-in-up w-full max-w-[730px] text-pretty text-[36px] font-semibold leading-[1.03] tracking-tight text-foreground sm:text-4xl md:text-[46px] lg:text-[50px]"
          style={{ animationDuration: '0.42s', animationDelay: '60ms' }}
        >
          Every Run Tested. Every Port Labeled.
        </h1>
        <p
          className="animate-fade-in-up mt-4 w-full max-w-[610px] text-pretty text-[15px] leading-[1.55] text-muted-foreground sm:text-[15px] md:mt-3"
          style={{ animationDuration: '0.42s', animationDelay: '120ms' }}
        >
          OllJira designs and installs structured network cabling, CCTV surveillance, and
          business IT systems for offices, clinics, schools, and hotels across Addis Ababa —
          licensed, certified, and documented.
        </p>
        <div
          className="animate-fade-in-up mt-5 md:hidden"
          style={{ animationDuration: '0.42s', animationDelay: '180ms' }}
        >
          <HeroButtons onBookClick={onBookClick} />
        </div>
        <div className="mt-8 md:hidden">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Trusted across Ethiopia</p>
          <LogoMarquee compact />
        </div>
      </div>
      <div className="relative mt-4 flex flex-1 items-end justify-center md:mt-4">
        <DesktopSlides current={current} slides={slides} />
      </div>
    </section>
  );
}

/* ============================== SERVICES ============================== */

const serviceCards = [
  {
    id: 'cabling',
    title: 'Network Cabling',
    description:
      'Structured Cat6/Cat6A cabling with racks, patch panels, and cable management — every run Fluke-tested and labeled.',
    icon: Cable,
    image: '/images/services/cabling.webp',
  },
  {
    id: 'cctv',
    title: 'CCTV Installation',
    description:
      'Hikvision and Dahua IP camera systems with NVR storage sized for 30+ days of retention and remote viewing setup.',
    icon: Cctv,
    image: '/images/services/cctv.webp',
  },
  {
    id: 'it',
    title: 'IT Services',
    description:
      'MikroTik routing, Wi-Fi coverage design, firewall setup, and workstation support for offices that cannot afford downtime.',
    icon: Wrench,
    image: '/images/services/it.webp',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description:
      'Scheduled inspections, camera cleaning, firmware updates, and a 1-year workmanship warranty on every installation.',
    icon: ShieldCheck,
    image: '/images/services/maintenance.webp',
  },
  {
    id: 'access-control',
    title: 'Access Control Systems',
    description:
      'Magnetic locks, strike locks, RFID readers, and biometric terminals installed and configured — so your team feels safe and your building stays secure.',
    icon: DoorOpen,
    image: '/images/services/access-control.webp',
  },
  {
    id: 'enterprise-network',
    title: 'Enterprise Network Design',
    description:
      'Layer 3 switch and router design, configuration, and implementation — VLANs, routing, and enterprise-grade access point planning done right.',
    icon: Network,
    image: '/images/services/enterprise-network.webp',
  },
  {
    id: 'ip-phone',
    title: 'IP Phone Systems',
    description:
      'On-premises IP PBX servers designed and implemented — desk phones, extensions, and call routing that your reception and wards can rely on.',
    icon: PhoneCall,
    image: '/images/services/ip-phone.webp',
  },
  {
    id: 'hospital-it',
    title: 'Hospital IT Consulting',
    description:
      'Honest advice on HMS, EMR, and PACS for X-ray and MRI, plus patient workflow consulting — from a team that has actually done it in a working hospital.',
    icon: HeartPulse,
    image: '/images/services/hospital-it.webp',
  },
  {
    id: 'software',
    title: 'Software Development',
    description:
      'Custom web apps, APIs, and internal tools built with Go, Node.js, and React — from management systems to booking platforms.',
    icon: CodeXml,
    image: '/images/services/software.webp',
  },
];

function ServiceCard({ card }: { card: (typeof serviceCards)[number] }) {
  const Icon = card.icon;
  return (
    <div className="h-full rounded-3xl bg-white transition-all duration-300">
      <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#E4EAF0] md:h-[360px]">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <div className="px-2 py-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-8 items-center justify-center text-primary">
            <Icon size={24} strokeWidth={1.5} />
          </span>
          <h3 className="font-serif text-lg text-primary md:text-xl">{card.title}</h3>
        </div>
        <p className="mb-6 text-sm font-light leading-relaxed text-zinc-500 md:text-base">
          {card.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
          >
            Get a Quote
          </Link>
          <Link
            to="/services"
            aria-label={`Learn more about ${card.title}`}
            className="group flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            Learn More
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(min-width: 1280px)').matches)
      return;
    const id = setInterval(() => setIndex((i) => (i + 1) % serviceCards.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = serviceCards[index];
  const SlideIcon = slide.icon;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center md:mb-18 xl:mb-24">
          <h2 className="mb-6 text-balance font-serif text-3xl leading-tight text-zinc-900 md:text-4xl">
            Networks, Cameras &amp; IT — <span className="italic">Done Once, Done Right</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-light text-zinc-500 md:text-base">
            From the first site survey to the final test report, we document everything
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="gap-y-8 md:hidden">
          {serviceCards.map((c) => (
            <ServiceCard key={c.id} card={c} />
          ))}
        </div>

        {/* Tablet: 2x2 grid */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:gap-8 xl:hidden">
          {serviceCards.map((c) => (
            <ServiceCard key={c.id} card={c} />
          ))}
        </div>

        {/* Desktop: auto-rotating showcase */}
        <div className="hidden items-center gap-12 xl:grid xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] 2xl:gap-20">
          <div className="relative order-2 min-h-[300px]">
            <div className="transition-all duration-500 ease-in-out">
              <div className="align-center flex items-center gap-2">
                <span className="mb-6 flex size-14 flex-col items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300">
                  <SlideIcon size={28} strokeWidth={1.5} />
                </span>
                <h3 className="mb-6 min-h-[2.5rem] font-serif text-3xl text-primary transition-all duration-300">
                  {slide.title}
                </h3>
              </div>
              <p className="mb-10 min-h-[5rem] text-lg font-light leading-relaxed text-zinc-500 transition-all duration-300">
                {slide.description}
              </p>
              <div className="mb-12 flex flex-wrap items-center gap-4 2xl:gap-8">
                <Link
                  to="/contact"
                  className="rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
                >
                  Get a Quote
                </Link>
                <Link
                  to="/services"
                  aria-label={`Learn more about ${slide.title}`}
                  className="group flex items-center gap-2 font-medium text-zinc-500 transition-colors hover:text-primary"
                >
                  Learn More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="flex items-center gap-3">
                {serviceCards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? 'w-12 bg-primary' : 'w-2 bg-zinc-200 hover:bg-zinc-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="group relative z-0 order-1 flex h-[420px] items-center justify-center xl:h-[500px] 2xl:h-[540px]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-secondary p-4 transition-all duration-700" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-[2.5rem] bg-gradient-to-t from-background to-transparent"
            />
            <div className="z-10 flex size-full items-center justify-center">
              <div key={slide.id} className="animate-fade-in-up flex size-full items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="size-full rounded-2xl object-cover p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== STATS + TECH ============================== */

function StatsTech() {
  return (
    <section className="mx-auto max-w-7xl overflow-x-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="mb-0">
          <h2 className="mb-6 text-balance font-serif text-[28px] font-normal leading-tight text-foreground md:text-2xl lg:text-4xl">
            One hub. Every connection documented.
          </h2>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-zinc-500">
            OllJira is founded and led by engineer Biruk Jira Gobesho. We hold an ECA indoor
            license, and our lead technicians are Hikvision HCSA and MikroTik MTCNA certified —
            so every install is tested, labeled, and warrantied.
          </p>
          <div className="gap-y-5 sm:flex sm:flex-wrap sm:items-start sm:gap-8 sm:gap-y-0 lg:gap-12">
            <div className="hidden justify-center sm:justify-start md:flex lg:translate-y-4">
              <img src="/images/brand/icon.svg" className="w-14 md:w-20 lg:w-24" alt="OllJira hub mark" />
            </div>
            <div className="grid min-w-0 grid-cols-2 gap-4 sm:flex sm:gap-8 lg:gap-12">
              <div className="min-w-0 text-left">
                <div className="mb-2 font-serif text-5xl font-normal leading-none tracking-tight text-primary md:text-6xl lg:text-7xl">
                  1,200+
                </div>
                <div className="max-w-[9rem] text-xs font-medium capitalize tracking-wide text-zinc-500">
                  Cable runs tested &amp; labeled
                </div>
              </div>
              <div className="min-w-0 text-left">
                <div className="mb-2 font-serif text-5xl font-normal leading-none tracking-tight text-primary md:text-6xl lg:text-7xl">
                  350+
                </div>
                <div className="max-w-[9rem] text-xs font-medium capitalize tracking-wide text-zinc-500">
                  Cameras installed &amp; tuned
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-0 gap-y-4 overflow-hidden p-2">
          <div className="relative overflow-hidden rounded-3xl">
            <p className="mb-8 text-center text-xs uppercase tracking-widest text-zinc-400">
              Brands we install
            </p>
            <TechMarquee />
            <div className="absolute left-1/2 top-1/2 -z-10 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== WORKFLOW ============================== */

const workflowSteps = [
  {
    stepNumber: '01',
    video: '/images/workflow-discovery.mp4',
    title: 'Site Survey',
    description:
      'We walk your site, measure distances, check power and pathways, and note every constraint before quoting.',
  },
  {
    stepNumber: '02',
    video: '/images/workflow-design.mp4',
    title: 'Design & Itemized Quote',
    description:
      'You get a layout and a line-item quote — cable types, camera models, labor — so you can compare it against anyone.',
  },
  {
    stepNumber: '03',
    video: '/images/workflow-development.mp4',
    title: 'Installation',
    description:
      'Certified technicians pull, terminate, and mount to spec, keeping your space clean and your business running.',
  },
  {
    stepNumber: '04',
    video: '/images/workflow-deploy.mp4',
    title: 'Test, Label & Handover',
    description:
      'Every run is tested, every port labeled, and you receive the full documentation package with your warranty.',
  },
];

function WorkflowStep({
  stepNumber,
  video,
  title,
  description,
}: (typeof workflowSteps)[number]) {
  return (
    <div className="flex h-[420px] flex-col justify-between rounded-3xl border border-border/40 p-6 transition-colors duration-300 hover:border-border/80">
      <div className="gap-y-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-sm font-extralight text-primary">
          {stepNumber}
        </div>
        <div className="mt-4">
          <h3 className="mb-3 font-serif text-xl text-card-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="-mx-2 mt-6 overflow-hidden rounded-xl">
        <video
          src={video}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full object-cover opacity-90 mix-blend-multiply hue-rotate-[115deg]"
        />
      </div>
    </div>
  );
}

function Workflow() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 md:text-center">
        <h2 className="mb-4 font-serif text-3xl font-normal leading-tight text-foreground md:text-5xl">
          How Every Project Runs, <br className="md:hidden" /> Start to Handover
        </h2>
        <p className="text-sm font-light text-muted-foreground md:text-base">
          From the first site visit to the final test report
        </p>
      </div>
      <div className="gap-y-8 md:grid md:grid-cols-2 md:gap-6 md:gap-y-0 lg:grid-cols-4">
        {workflowSteps.map((s) => (
          <WorkflowStep key={s.stepNumber} {...s} />
        ))}
      </div>
    </section>
  );
}

/* ============================== PRICING ============================== */

function PricingFeature({
  icon: Icon,
  text,
  textColor,
}: {
  icon: typeof Zap;
  text: string;
  textColor: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        <Icon className={`flex-shrink-0 ${textColor.includes('primary-foreground') ? 'text-primary-foreground' : 'text-primary'}`} size={20} />
      </div>
      <span className={`text-sm font-extralight leading-relaxed ${textColor}`}>{text}</span>
    </div>
  );
}

function Pricing({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10 lg:px-8 lg:py-20">
      <div className="mb-8 lg:mb-0 lg:max-w-md lg:self-center">
        <h2 className="mb-4 text-balance font-serif text-3xl font-normal leading-tight text-foreground md:text-4xl">
          Clear, Itemized Pricing
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 md:text-base">
          Every quote lists materials, models, and labor line by line — so you know exactly what
          you are paying for before we touch a cable.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 xl:gap-8">
        <div
          className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-[32px] bg-primary p-8 text-primary-foreground transition-all md:p-10 xl:min-h-[480px]"
          style={{
            backgroundImage: 'url(/images/misc/pricing-texture.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-primary/40" />
          <h3 className="relative z-10 mb-3 text-xl font-normal md:text-2xl">
            Network Cabling
          </h3>
          <p className="relative z-10 mb-8 max-w-[85%] text-xs leading-relaxed text-primary-foreground/80 md:text-sm">
            Structured cabling for offices, clinics, schools, and hotels — quoted per point
          </p>
          <div className="relative z-10 mb-8 flex flex-col gap-y-6 tracking-wide">
            <PricingFeature
              icon={Zap}
              text="Cat6/Cat6A runs with patch panels, racks, and cable management"
              textColor="text-primary-foreground font-light"
            />
            <PricingFeature
              icon={Layers}
              text="Every run tested with printed results for your records"
              textColor="text-primary-foreground font-light"
            />
            <PricingFeature
              icon={FileText}
              text="Labeled ports and as-built documentation at handover"
              textColor="text-primary-foreground font-light"
            />
          </div>
          <div className="relative z-10 mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-1 text-sm font-normal text-primary-foreground/80">Starting at, per point</div>
              <div className="whitespace-nowrap text-2xl font-normal tracking-tight md:text-3xl">1,850 ETB</div>
            </div>
            <button
              onClick={onBookClick}
              className="w-full whitespace-nowrap rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent/90 sm:w-auto md:px-8 md:py-4"
            >
              Book a Site Survey
            </button>
          </div>
        </div>

        <div className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-[32px] border border-border bg-muted p-8 md:p-10 xl:min-h-[480px]">
          <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <h3 className="relative z-10 mb-3 text-xl font-medium text-foreground md:text-2xl">
            CCTV Installation
          </h3>
          <p className="relative z-10 mb-8 max-w-[90%] text-xs leading-relaxed text-zinc-500 md:text-sm">
            Hikvision and Dahua systems designed per camera, with remote viewing on your phone
          </p>
          <div className="relative z-10 mb-8 flex flex-col gap-y-6">
            <PricingFeature
              icon={Cctv}
              text="IP cameras, NVR, and storage sized for 30+ days of retention"
              textColor="text-zinc-600"
            />
            <PricingFeature
              icon={ShieldCheck}
              text="1-year workmanship warranty on every install"
              textColor="text-zinc-600"
            />
          </div>
          <div className="relative z-10 mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-1 text-sm font-normal text-zinc-500">Starting at, per camera</div>
              <div className="whitespace-nowrap text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                4,200 ETB
              </div>
            </div>
            <button
              onClick={onBookClick}
              className="w-full whitespace-nowrap rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto md:px-8 md:py-4"
            >
              Book a Site Survey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== TESTIMONIALS ============================== */

type TestimonialVM = {
  comment: string;
  companyName: string;
  spokePersonName: string;
  spokePersonTitle: string;
};

const fallbackTestimonials: TestimonialVM[] = [
  {
    comment:
      'Nine floors of fiber, a proper data center, and cameras on every corridor — all while the hospital stayed open. The documentation folder alone was worth it.',
    companyName: 'Summit General Hospital',
    spokePersonName: 'IT Administrator',
    spokePersonTitle: 'ICT Department',
  },
  {
    comment:
      'Wi-Fi that follows guests across six floors, 32 cameras with zero blind spots, and a server room our own staff can actually manage. Delivered exactly as quoted.',
    companyName: 'Solkeb Hotel, Jijiga',
    spokePersonName: 'General Manager',
    spokePersonTitle: 'Management',
  },
  {
    comment:
      'They cabled an active tractor assembly line and gave us cameras our headquarters watches from Addis Ababa. When one camera failed, they swapped it under warranty in two days.',
    companyName: 'Kegna Trading',
    spokePersonName: 'Operations Manager',
    spokePersonTitle: 'Operations',
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const { data } = trpc.content.testimonials.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const testimonials: TestimonialVM[] = useMemo(
    () =>
      data && data.length > 0
        ? data.map((t) => ({
            comment: t.quote,
            companyName: t.organization ?? '',
            spokePersonName: t.authorName,
            spokePersonTitle: t.authorRole ?? '',
          }))
        : fallbackTestimonials,
    [data]
  );
  const t = testimonials[Math.min(index, testimonials.length - 1)];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-serif text-3xl font-normal italic leading-tight text-foreground md:text-4xl">
          Client Success Stories
        </h2>
        <p className="text-sm text-zinc-500">Hear it from the teams we work with.</p>
      </div>

      <div className="relative md:mx-auto md:max-w-4xl">
        <div key={index} className="overflow-hidden rounded-2xl bg-zinc-100">
          <div className="flex flex-col md:flex-row">
            <div className="hidden w-[200px] flex-shrink-0 items-end justify-center md:flex">
              <img
                src="/images/testimonial-silhouette.svg"
                alt="Testimonial silhouette"
                className="h-full max-h-[280px] object-contain object-bottom"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-8 md:p-10 md:pl-6">
              <p className="mb-8 text-base leading-relaxed text-zinc-600 md:text-lg">
                {t.comment}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <Building2 size={16} className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    {t.companyName}
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-zinc-300" />
                <div className="flex items-center">
                  <span className="text-sm text-zinc-700">
                    {t.spokePersonName}
                    <span className="text-[#5f6668]">, {t.spokePersonTitle}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`flex h-10 items-center justify-center rounded-full transition-all duration-300 ${
                index === i ? 'w-10 bg-primary/15' : 'w-10 bg-transparent hover:bg-zinc-100'
              }`}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === i ? 'w-8 bg-primary' : 'w-3 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== FAQ ============================== */

const faqs = [
  {
    id: 1,
    question: 'How does a project start?',
    answer:
      'With a site survey. We measure, photograph, and map cable pathways, then send you an itemized quote within 48 hours.',
  },
  {
    id: 2,
    question: 'Are you licensed and certified?',
    answer:
      'Yes. We hold an ECA indoor license, and our lead engineers are Hikvision HCSA and MikroTik MTCNA certified.',
  },
  {
    id: 3,
    question: 'What warranty do you give?',
    answer:
      'One year on workmanship. If a run or camera we installed fails, we come back and fix it — free.',
  },
  {
    id: 4,
    question: 'Can you work around our business hours?',
    answer:
      'Yes. We regularly install at night and on weekends for hotels, clinics, and offices that cannot shut down.',
  },
  {
    id: 5,
    question: 'Do you hand over documentation?',
    answer:
      'Always — test results, port maps, and as-built diagrams. Your next technician will thank you.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="flex flex-col justify-between lg:col-span-6">
          <h2 className="my-4 font-serif text-3xl font-normal leading-tight text-foreground md:max-w-sm md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="relative mt-6 overflow-hidden rounded-[32px] bg-[#E7EDF3] p-5 md:mt-0 md:px-7 md:py-6">
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
              <div className="shrink-0 self-start sm:self-end">
                <img
                  src="/images/misc/faq-technician.webp"
                  alt=""
                  width={600}
                  height={900}
                  loading="lazy"
                  className="h-[108px] w-[88px] rounded-xl object-cover object-top sm:h-[132px] sm:w-[108px] md:h-[150px] md:w-[122px]"
                />
              </div>
              <div className="min-w-0 max-w-[27rem] gap-y-4 md:gap-y-5">
                <p className="text-pretty font-serif text-xl leading-[1.35] text-foreground">
                  Still have questions? Ask us anything about cabling, cameras, or IT.
                </p>
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="mt-4 inline-flex h-11 w-fit items-center rounded-full bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent/90 md:h-12 md:px-6 md:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-y-0 lg:col-span-6">
          {faqs.map((f, i) => (
            <div key={f.id} className="border-b border-zinc-200 last:border-0">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${f.id}`}
                className="group flex w-full items-start justify-between py-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="pr-8 font-serif text-lg font-medium leading-snug text-foreground md:text-xl">
                  {f.question}
                </span>
                <span className="flex-shrink-0 pt-1 text-zinc-400 transition-colors group-hover:text-foreground">
                  {open === i ? (
                    <Minus aria-hidden="true" size={24} strokeWidth={1.5} />
                  ) : (
                    <Plus aria-hidden="true" size={24} strokeWidth={1.5} />
                  )}
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: open === i ? '1fr' : '0fr', opacity: open === i ? 1 : 0 }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    id={`faq-answer-${f.id}`}
                    className="pb-8 pr-8 text-base leading-relaxed text-zinc-600"
                  >
                    {f.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== BLOGS PREVIEW ============================== */

const fallbackBlogPosts = [
  {
    id: 7,
    slug: 'ip-phones-vs-regular-lines-small-offices',
    title: 'IP Phones vs. Regular Lines for Small Offices',
    publishDate: '2026-08-15 15:00:00+00',
    image: '/images/blogs/ip-phone-office.webp',
  },
  {
    id: 6,
    slug: 'access-control-for-offices-maglocks-keypads',
    title: 'Access Control for Offices: Maglocks, Keypads, and What to Ask Your Installer',
    publishDate: '2026-08-15 13:00:00+00',
    image: '/images/blogs/access-control-office.webp',
  },
  {
    id: 5,
    slug: 'why-your-office-needs-a-layer-3-network',
    title: 'Why Your Office Needs a Layer 3 Network',
    publishDate: '2026-08-15 11:00:00+00',
    image: '/images/blogs/layer3-network.webp',
  },
  {
    id: 4,
    slug: 'hospital-hms-emr-pacs-buying-checklist',
    title: 'What a Hospital Should Check Before Buying an HMS',
    publishDate: '2026-08-15 09:00:00+00',
    image: '/images/blogs/hms-checklist.webp',
  },
  {
    id: 3,
    slug: 'cctv-installation-checklist-addis-ababa',
    title: 'CCTV Installation Checklist for Addis Ababa Businesses',
    publishDate: '2026-07-20 09:00:00+00',
    image: '/images/blogs/cctv-checklist.webp',
  },
  {
    id: 2,
    slug: 'cat6-vs-cat6a-which-cable-for-your-office',
    title: 'Cat6 vs Cat6A: Which Cable Does Your Office Actually Need?',
    publishDate: '2026-07-02 09:00:00+00',
    image: '/images/blogs/cat6-vs-cat6a.webp',
  },
  {
    id: 1,
    slug: 'why-every-cable-run-must-be-tested-and-labeled',
    title: 'Why Every Cable Run Must Be Tested and Labeled',
    publishDate: '2026-06-11 09:00:00+00',
    image: '/images/blogs/testing-labeling.webp',
  },
];

const formatBlogDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/* ========================== Work Samples ========================== */

const fallbackWorkSamples = [
  {
    id: 3,
    title: 'Solkeb Hotel — Hotel & Restaurant Management System',
    slug: 'solkeb-hotel-management-system',
    image: '/images/case-studies/solkeb-software.webp',
  },
  {
    id: 2,
    title: 'Solkeb Hotel Full Network Infrastructure',
    slug: 'solkeb-hotel-network-infrastructure',
    image: '/images/case-studies/hotel-cctv.webp',
  },
  {
    id: 1,
    title: 'Summit General Hospital Enterprise Network',
    slug: 'summit-general-hospital-enterprise-network',
    image: '/images/case-studies/office-cabling.webp',
  },
];

function WorkSampleCard({ project }: { project: (typeof fallbackWorkSamples)[number] }) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl bg-muted p-5">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={project.title}
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 rounded-b-xl bg-gradient-to-t from-black/50 via-black/30 to-transparent pb-6 pt-16 opacity-100 backdrop-blur-[2px] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <Link
            to={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="translate-y-4 rounded-full border-0 bg-card/90 px-5 py-2 text-xs font-medium text-primary shadow-lg transition-all delay-75 duration-300 hover:bg-card group-hover:translate-y-0"
          >
            Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}

function WorkSamples() {
  const { data } = trpc.content.projects.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const workSamples =
    data && data.length > 0
      ? data.slice(0, 4).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          image: p.featuredImage ?? '',
        }))
      : fallbackWorkSamples;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <h2 className="mb-2 text-2xl font-semibold text-foreground md:text-3xl">Work Samples</h2>
        <p className="text-sm text-muted-foreground">Recent installs across Ethiopia.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {workSamples.map((p) => (
          <WorkSampleCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function BlogsPreview() {
  const { data } = trpc.content.posts.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const blogPosts =
    data && data.length > 0
      ? data.slice(0, 3).map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          publishDate: p.publishedAt,
          image: p.imageUrl ?? '',
        }))
      : fallbackBlogPosts;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground md:text-3xl">Blogs</h2>
          <p className="text-sm text-muted-foreground">Field notes on cabling, CCTV, and business IT.</p>
        </div>
        <div className="sm:pt-1">
          <Link
            to="/blogs"
            className="inline-flex h-10 items-center rounded-full bg-primary px-6 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore More
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogPosts.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/30"
          >
            <Link to={`/blogs/${p.slug}`} className="block h-full">
              <div className="aspect-[16/7] overflow-hidden bg-primary/90">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="mb-2 text-[11px] font-medium text-muted-foreground">
                  {formatBlogDate(p.publishDate)}
                </p>
                <h3 className="mb-2 line-clamp-2 font-serif text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================== FINAL CTA ============================== */

const ORG = {
  phoneDisplay: '+251 91 234 5678',
  email: 'info@olljira.com',
  location: 'Bole, Addis Ababa, Ethiopia',
};

function FinalCTA() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ fullName: '', contact: '', message: '' });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  return (
    <>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Ready to wire it right?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Tell us about your site — we will walk it, measure it, and send you an itemized
            quote within 48 hours.
          </p>
          {!open && (
            <span className="relative inline-block">
              <span className="absolute inset-0 items-center justify-center rounded-[100px] bg-primary" />
              <button
                onClick={() => setOpen(true)}
                className="relative h-14 px-8 py-3 text-lg font-medium tracking-tight text-primary-foreground"
              >
                Contact Us
              </button>
            </span>
          )}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="animate-fade-in-up relative flex h-full max-h-[95vh] w-full overflow-hidden bg-primary"
            style={{ borderRadius: '24px', animationDuration: '0.4s' }}
          >
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ borderRadius: '24px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
              <div className="absolute inset-0 opacity-10">
                <div className="size-full bg-plus-pattern" />
              </div>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <div className="relative z-10 mx-auto flex size-full max-w-7xl flex-col overflow-y-auto lg:flex-row">
              <div className="flex min-h-[400px] flex-1 flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
                <h2 className="mb-6 mt-8 font-serif text-3xl font-medium leading-tight tracking-tight sm:mt-0 sm:text-4xl lg:text-5xl">
                  Let&apos;s talk
                </h2>
                <div className="hidden space-y-5 sm:block">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                        Tell us about your site and we will schedule a survey visit at a time
                        that works for you.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                        Itemized quotes within 48 hours of the survey — no vague estimates, no
                        hidden lines.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 space-y-4 border-t border-white/20 pt-8">
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{ORG.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{ORG.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{ORG.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center p-8 sm:p-12 lg:p-16">
                <div className="w-full rounded-2xl bg-white p-6 sm:p-8">
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                        Thank you for contacting us!
                      </h3>
                      <p className="mb-6 text-zinc-500">
                        We&apos;ve received your message and will get back to you as soon as
                        possible.
                      </p>
                      <button
                        onClick={close}
                        className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                    >
                      <input
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                      />
                      <input
                        required
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="Email Or Phone Number"
                        className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                      />
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your project"
                        className="min-h-[120px] w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                      />
                      <button
                        type="submit"
                        className="h-12 w-full rounded-lg bg-primary text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================== PAGE ============================== */

export default function Home() {
  const navigate = useNavigate();
  const bookCall = () => {
    navigate('/schedule');
  };

  return (
    <main>
      <Seo />
      <div className="relative isolate overflow-hidden bg-background">
        <Hero onBookClick={bookCall} />
        <div className="relative z-20 hidden max-w-[100rem] pb-10 md:mt-6 md:block md:pb-12">
          <LogoMarquee />
        </div>
      </div>
      <StatsTech />
      <Services />
      <Workflow />
      <Pricing onBookClick={bookCall} />
      <Testimonials />
      <FAQ />
      <WorkSamples />
      <BlogsPreview />
      <FinalCTA />
    </main>
  );
}
