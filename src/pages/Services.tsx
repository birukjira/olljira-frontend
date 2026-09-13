import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReadyCTA from '../components/ReadyCTA';
import Seo from '../components/Seo';

/* ========================== Featured carousel ========================== */

const featured = [
  {
    id: 'cabling',
    title: 'Structured Network Cabling, Tested End to End',
    description:
      'Cat6/Cat6A runs, racks, and patch panels for offices, clinics, schools, and hotels — every run Fluke-tested, every port labeled.',
    image: '/images/case-studies/office-cabling.webp',
    ctaText: 'Request a Quote',
    ctaLink: '/contact',
    secondaryCtaText: 'See Recent Installs',
    secondaryCtaLink: '/projects',
  },
  {
    id: 'cctv',
    title: 'CCTV That Covers Every Corner',
    description:
      'Hikvision and Dahua IP systems designed camera by camera — NVR storage sized for 30+ days, with remote viewing on your phone.',
    image: '/images/case-studies/hotel-cctv.webp',
    ctaText: 'Request a Quote',
    ctaLink: '/contact',
    secondaryCtaText: 'See Recent Installs',
    secondaryCtaLink: '/projects',
  },
];

function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, [update]);

  const scrollTo = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <section className="w-full" aria-label="Featured services">
      <div className="group relative">
        <div
          ref={trackRef}
          className="flex touch-pan-y snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((item) => (
            <div key={item.id} className="relative min-w-0 flex-[0_0_100%] snap-start pl-0">
              <div className="relative flex min-h-[520px] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-primary to-accent/20 px-5 pt-7 sm:px-6 sm:pt-8 md:px-8 lg:min-h-[640px] lg:px-16">
                <div className="relative z-10 mb-8 flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                  <div className="w-full lg:w-1/2">
                    <h2 className="font-serif text-3xl font-semibold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
                      {item.title}
                    </h2>
                  </div>
                  <div className="w-full pt-2 lg:w-1/2 lg:max-w-md lg:pt-4">
                    <p className="mb-6 text-base leading-7 text-primary-foreground/90 lg:mb-8 lg:text-lg">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      {item.ctaText && (
                        <Link
                          to={item.ctaLink}
                          className="inline-flex h-12 items-center rounded-full bg-background px-6 text-base font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-background/90 sm:px-8"
                        >
                          {item.ctaText}
                        </Link>
                      )}
                      {item.secondaryCtaText && (
                        <Link
                          to={item.secondaryCtaLink}
                          className="inline-flex h-12 items-center rounded-full px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-background/10 hover:text-primary-foreground sm:px-8"
                        >
                          {item.secondaryCtaText}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative mt-auto flex h-[260px] w-full items-end justify-center sm:h-[340px] lg:h-[420px]">
                  <div className="relative mx-auto flex size-full max-w-7xl items-end transition-transform duration-300 md:translate-y-[5%] md:group-hover:scale-[1.01]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full rounded-t-3xl object-cover object-center drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-2 rounded-full bg-primary/90 p-2 shadow-lg lg:flex">
          <button
            onClick={() => scrollTo(-1)}
            className="flex size-10 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-background/10 hover:text-primary-foreground"
          >
            <ArrowLeft data-icon="inline-start" />
            <span className="sr-only">Previous slide</span>
          </button>
          <button
            onClick={() => scrollTo(1)}
            className="flex size-10 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-background/10 hover:text-primary-foreground"
          >
            <ArrowRight data-icon="inline-end" />
            <span className="sr-only">Next slide</span>
          </button>
        </div>
        <span className="sr-only">Slide {index + 1} of {featured.length}</span>
      </div>
    </section>
  );
}

/* ========================== Generic split card ========================== */

function SplitServiceCard({
  title,
  description,
  image,
  cta,
  secondaryCta,
  reverse = false,
}: {
  title: string;
  description: string;
  image: string;
  cta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[420px] w-full flex-col overflow-hidden rounded-3xl bg-secondary lg:min-h-[500px] lg:flex-row ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className="flex w-full flex-col items-start justify-center p-6 sm:p-8 md:p-10 lg:w-1/2 lg:p-16">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-secondary-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          {cta && (
            <Link
              to={cta.link}
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 sm:px-8"
            >
              {cta.text}
            </Link>
          )}
          {secondaryCta && (
            <Link
              to={secondaryCta.link}
              className="inline-flex h-12 items-center rounded-full px-6 text-base font-medium text-primary transition-colors hover:bg-primary/10 hover:text-accent sm:px-8"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
      <div className="relative flex h-[300px] w-full items-end justify-center bg-gradient-to-br from-transparent to-background/20 md:h-[380px] lg:h-auto lg:w-1/2">
        <div className="flex size-full items-end justify-center">
          <img
            src={image}
            alt={title}
            className="size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

/* ========================== Branding card ========================== */

function BrandingCard() {
  return (
    <section className="w-full overflow-hidden rounded-3xl bg-secondary">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-8 md:px-10 md:py-12 lg:w-1/2 lg:px-16">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-secondary-foreground md:text-4xl">
            Maintenance &amp; Support,
            <br />
            With a 1-Year Warranty
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground md:mt-6">
            Scheduled inspections, camera cleaning, firmware updates, and priority callouts. If
            something we installed fails within a year, we come back and fix it — free.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/schedule"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              Book a Site Survey
            </Link>
            <Link
              to="/projects"
              className="inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-base font-medium text-primary transition-colors hover:bg-primary/10 hover:text-accent sm:w-auto"
            >
              See Recent Installs
            </Link>
          </div>
        </div>
        <div className="relative flex w-full items-end justify-center bg-transparent lg:w-1/2">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-28 size-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -right-24 size-80 rounded-full bg-white/5 blur-3xl" />
          </div>
          <img
            src="/images/services/maintenance.webp"
            alt="Technician performing scheduled maintenance on a network rack"
            className="relative z-10 h-full min-h-[320px] w-full bg-transparent object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ========================== Hosting card ========================== */

function HostingCard() {
  return (
    <div className="w-full">
      <div className="relative flex min-h-[520px] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-primary to-accent/20 px-5 pt-7 sm:px-6 sm:pt-8 md:px-8 lg:min-h-[640px] lg:px-16">
        <div className="relative z-10 mb-8 flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              24/7 Monitoring &amp; Managed IT Support
            </h2>
          </div>
          <div className="w-full pt-2 lg:w-1/2 lg:max-w-md lg:pt-4">
            <p className="mb-6 text-base leading-7 text-primary-foreground/90 lg:mb-8 lg:text-lg">
              We watch your network and cameras around the clock, catch failures before you do,
              and keep every device patched and documented.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center rounded-full bg-background px-6 text-base font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-background/90 sm:px-8"
              >
                Request a Quote
              </Link>
              <Link
                to="/projects"
                className="inline-flex h-12 items-center rounded-full px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-background/10 hover:text-primary-foreground sm:px-8"
              >
                See Recent Installs
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />
        <div className="relative mt-auto flex w-full flex-1 items-end justify-center">
          <div className="relative mx-auto h-[300px] w-full max-w-7xl sm:h-[400px] lg:h-[500px]">
            <img
              src="/images/services/monitoring.webp"
              alt="Network monitoring operations center"
              className="h-full w-full rounded-t-3xl object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================== Page ========================== */

export default function Services() {
  return (
    <div className="min-h-screen w-full pb-20">
      <Seo
        title="Services"
        description="Network cabling, CCTV installation, access control, enterprise network design, IP phone systems, hospital IT consulting, and custom software — delivered licensed, certified, and documented in Addis Ababa."
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:gap-16">
        <h1 className="sr-only">Services</h1>
        <FeaturedCarousel />
        <SplitServiceCard
          title="Access Control That Feels Safe and Secure"
          description="Magnetic locks, strike locks, RFID card readers, and biometric terminals — installed, wired, and configured so the right people get in and everyone else stays out. The same system we deployed at Summit General Hospital."
          image="/images/services/access-control.webp"
          cta={{ text: 'Book a Site Survey', link: '/schedule' }}
          secondaryCta={{ text: 'See Recent Installs', link: '/projects' }}
        />
        <SplitServiceCard
          title="Enterprise Network Design & Configuration"
          description="Layer 3 switch and router design, VLAN segmentation, routing configuration, and enterprise-grade access point planning and implementation — a network engineered for your building, not copied from a template."
          image="/images/services/enterprise-network.webp"
          cta={{ text: 'Request a Quote', link: '/contact' }}
          secondaryCta={{ text: 'See Recent Installs', link: '/projects' }}
          reverse
        />
        <SplitServiceCard
          title="IP Phone Systems, On Your Premises"
          description="We design and implement on-premises IP PBX servers with desk phones, extensions, and call routing — reception, wards, and offices connected on a phone system you own and control. Proven at Summit General Hospital and Solkeb Hotel."
          image="/images/services/ip-phone.webp"
          cta={{ text: 'Request a Quote', link: '/contact' }}
          secondaryCta={{ text: 'See Recent Installs', link: '/projects' }}
        />
        <SplitServiceCard
          title="Hospital IT Infrastructure Consulting"
          description="Straight advice on selecting HMS, EMR, and PACS for X-ray and MRI, plus patient workflow consulting — from the team that designed and delivered the full network, PBX, and HIMS infrastructure at Summit General Hospital."
          image="/images/services/hospital-it.webp"
          cta={{ text: 'Book a Consultation', link: '/schedule' }}
          secondaryCta={{ text: 'Read the Case Study', link: '/projects' }}
          reverse
        />
        <SplitServiceCard
          title="IT Services for Offices That Can't Afford Downtime"
          description="MikroTik routing and firewall setup, Wi-Fi coverage design, workstation support, and network documentation your next technician will thank you for."
          image="/images/services/it.webp"
          cta={{ text: 'Request a Quote', link: '/contact' }}
          secondaryCta={{ text: 'See Recent Installs', link: '/projects' }}
          reverse
        />
        <SplitServiceCard
          title="Custom Software, Built by Working Engineers"
          description="Web apps, internal tools, and APIs with Go, Node.js, and React — management systems, booking platforms, and dashboards, backed by the same team that wires and supports your network."
          image="/images/services/software.webp"
          cta={{ text: 'Request a Quote', link: '/contact' }}
          secondaryCta={{ text: 'Book a Consultation', link: '/schedule' }}
        />
        <BrandingCard />
        <HostingCard />
        <ReadyCTA />
      </div>
    </div>
  );
}
