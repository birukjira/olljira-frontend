import { useState } from 'react';
import { CircleMinus, CirclePlus, Linkedin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BookACall from '../components/BookACall';
import Seo from '../components/Seo';

/* ============================ Hero (About US) ============================ */

function AboutIntro() {
  return (
    <section className="px-6 pt-8 pb-6 md:px-12 md:pt-12 md:pb-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-xl flex-1">
            <h1 className="mb-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
              About Us
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              OllJira Technology Solution is a licensed network cabling, CCTV, and IT services
              company based in Addis Ababa. We hold an ECA indoor license, our lead engineers
              carry Hikvision HCSA and MikroTik MTCNA certifications, and every job we hand over
              is tested, labeled, and warrantied.
            </p>
          </div>
          <div className="flex items-center gap-6 md:gap-10 lg:gap-12">
            <div className="hidden items-center justify-center md:flex">
              <img src="/images/brand/icon.svg" alt="OllJira hub mark" className="h-24 w-24" />
            </div>
            <div className="flex items-start gap-8 md:gap-12">
              <div className="text-center">
                <div className="font-serif text-4xl font-normal leading-none text-primary md:text-5xl lg:text-6xl">
                  1,200+
                </div>
                <div className="mt-2 max-w-[80px] text-[10px] leading-tight text-muted-foreground md:text-xs">
                  Cable runs tested &amp; labeled
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl font-normal leading-none text-primary md:text-5xl lg:text-6xl">
                  350+
                </div>
                <div className="mt-2 max-w-[80px] text-[10px] leading-tight text-muted-foreground md:text-xs">
                  Cameras installed &amp; tuned
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ Tech marquee ============================ */

const techRow1 = [
  'hikvision', 'mikrotik', 'ubiquiti', 'tplink', 'dahua', 'zkteco',
  'hikvision', 'mikrotik', 'ubiquiti', 'tplink', 'dahua', 'zkteco',
];
const techRow2 = [
  'dlink', 'cisco', 'commscope', 'grandstream', 'panduit', 'ezviz',
  'dlink', 'cisco', 'commscope', 'grandstream', 'panduit', 'ezviz',
];

function TechIcon({ icon }: { icon: string }) {
  return (
    <div
      className="flex h-16 w-28 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-card px-5 py-3 shadow-sm sm:h-14 sm:w-32"
      title={icon}
      role="img"
      aria-label={icon}
    >
      <img src={`/images/vendors/${icon}.svg`} alt={icon} className="h-6 w-auto sm:h-7" />
    </div>
  );
}

function TechRow({ icons, duration, reverse = false }: { icons: string[]; duration: number; reverse?: boolean }) {
  const items = [...icons, ...icons];
  return (
    <div className="marquee-mask flex min-w-0 overflow-hidden">
      <div
        className="flex animate-marquee gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-6 lg:pr-6"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {items.map((icon, i) => (
          <TechIcon key={`${icon}-${i}`} icon={icon} />
        ))}
      </div>
    </div>
  );
}

function TechMarqueeSection() {
  return (
    <section className="overflow-hidden py-6 md:py-10">
      <div className="flex flex-col gap-4">
        <TechRow icons={techRow1} duration={40} />
        <TechRow icons={techRow2} duration={48} reverse />
      </div>
    </section>
  );
}

/* ============================ Our Story ============================ */

const storyCards = [
  {
    id: 1,
    problem: 'Cables pulled by untraceable contractors — unlabeled, untested, and impossible to maintain',
    solution: 'Every run tested, every port labeled, with as-built documentation at handover',
  },
  {
    id: 2,
    problem: 'Camera systems that miss the moments that matter — blind spots, full storage, dead remote viewing',
    solution: 'Camera-by-camera design, storage sized for 30+ days, and remote viewing that actually works',
  },
  {
    id: 3,
    problem: 'Quotes that hide the real cost until the job is half done',
    solution: 'Itemized quotes after a real site survey — materials, models, and labor, line by line',
  },
];

function StoryCard({
  card,
  isExpanded,
  onToggle,
}: {
  card: (typeof storyCards)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="cursor-pointer self-start" onClick={onToggle}>
      <div className="relative">
        <div
          className={`flex items-start justify-between gap-3 rounded-2xl border border-border/30 bg-card p-5 shadow-sm transition-all duration-300 ${
            isExpanded ? 'rounded-b-none border-b-primary' : ''
          }`}
        >
          <span className="font-serif text-3xl font-light leading-none text-muted-foreground/30 md:text-4xl">
            {card.id}
          </span>
          <p className="flex-1 pt-1 text-sm leading-relaxed text-foreground md:text-base">
            {card.problem}
          </p>
          <div
            className="mt-1 flex-shrink-0 transition-transform duration-200"
            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            {isExpanded ? (
              <CircleMinus className="h-5 w-5 text-primary" />
            ) : (
              <CirclePlus className="h-5 w-5 text-muted-foreground/50 transition-colors hover:text-primary" />
            )}
          </div>
        </div>
        {!isExpanded && (
          <div className="absolute -bottom-1 left-4 right-4 h-1.5 rounded-b-full bg-primary/60" />
        )}
      </div>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr', opacity: isExpanded ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl rounded-t-none bg-primary p-5 pt-4">
            <p className="mb-1 text-xs font-medium text-primary-foreground/70">Our Solution</p>
            <p className="text-sm leading-relaxed text-primary-foreground md:text-base">
              {card.solution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurStory() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-md md:mb-16">
          <h2 className="mb-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Our Story
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            After years of fixing other contractors&apos; work across offices, clinics, schools,
            and hotels in Addis Ababa, we kept finding the same three problems — and decided to
            build a company that simply doesn&apos;t create them.
          </p>
        </div>
        <div className="mb-12 grid grid-cols-1 items-start gap-4 md:mb-16 md:grid-cols-3 md:gap-6">
          {storyCards.map((card) => (
            <StoryCard
              key={card.id}
              card={card}
              isExpanded={expanded === card.id}
              onToggle={() => setExpanded(expanded === card.id ? null : card.id)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center overflow-hidden rounded-3xl border border-border/20 bg-muted/30 p-6 text-center">
            <div className="mb-4 flex h-32 w-full items-center justify-center md:h-40">
              <img
                src="/images/speed.svg"
                alt="Speed gauge illustration"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-sm font-medium leading-snug text-foreground md:text-base">
              Your business needs networks that
              <br />
              stay up and cameras that stay on
            </p>
          </div>
          <div className="flex flex-col items-center overflow-hidden rounded-3xl border border-border/20 bg-muted/30 p-6 text-center">
            <div className="mb-4 flex h-32 w-full items-center justify-center md:h-40">
              <img
                src="/images/growth-lines.svg"
                alt="Growth chart illustration"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-sm font-medium leading-snug text-foreground md:text-base">
              And documentation that outlives
              <br />
              the installation crew
            </p>
          </div>
          <div className="flex flex-col justify-around gap-4 py-6">
            <div className="flex justify-center md:justify-start">
              <div className="h-16 w-16 md:h-20 md:w-20">
                <img
                  src="/images/brand/icon.svg"
                  alt="OllJira hub mark"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <p className="text-center text-sm leading-relaxed text-muted-foreground md:text-left md:text-base">
              So we built a company around one promise: done once, done right, documented — one
              hub, and every connection accounted for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ Mission / Vision ============================ */

const missionVision = [
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'Our mission is to give every office, clinic, school, and hotel in Addis Ababa a network they never have to think about. We survey before we quote, install to spec, test every run, label every port, and hand over documentation with a one-year workmanship warranty — licensed, certified, and accountable for every connection we make.',
    icon: '/images/mission-icon.svg',
    iconAlt: 'Mission target icon',
    variant: 'mission' as const,
  },
  {
    id: 'vision',
    title: 'Vision',
    description:
      'Our vision is an Addis Ababa where no business loses a day to a dead network or a blind camera. We want to set the standard for how cabling and security work is done in Ethiopia: itemized quotes, certified technicians, and installations documented well enough that any technician can pick up where we left off.',
    icon: '/images/vision-icon.png',
    iconAlt: 'Vision binoculars icon',
    variant: 'vision' as const,
  },
];

const squiggles = {
  mission:
    'M-50,140 C50,140 100,40 200,70 C280,100 250,150 220,120 C200,100 250,40 400,70 C500,90 550,50 550,50',
  vision:
    'M-50,110 C100,110 150,40 220,40 C280,40 280,140 220,140 C180,140 200,70 350,70 C450,70 550,90 550,90',
};

function MissionVisionCard({ data }: { data: (typeof missionVision)[number] }) {
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-[2.5rem] bg-zinc-50 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative h-48 overflow-visible bg-gradient-to-r from-primary via-primary/95 to-primary/30">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80">
          <svg
            viewBox="0 0 500 200"
            className="absolute left-0 top-0 size-full fill-none stroke-white stroke-[2px]"
            preserveAspectRatio="none"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
          >
            <path d={squiggles[data.variant]} />
          </svg>
        </div>
        <div className="absolute -top-[-30px] right-10 z-20 flex size-20 items-center justify-center rounded-full border-4 border-card bg-card shadow-lg md:right-16 md:h-24 md:w-24">
          <img src={data.icon} alt={data.iconAlt} className="size-10 object-contain md:h-12 md:w-12" />
          <div className="absolute inset-1 rounded-full border border-primary/10" />
        </div>
      </div>
      <div className="relative z-10 flex grow translate-y-[-30px] flex-col rounded-t-[2rem] bg-zinc-50 p-8 pt-16 md:p-10 md:pt-16">
        <h3 className="mb-6 font-serif text-xl font-medium text-primary md:text-2xl">{data.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {data.description}
        </p>
      </div>
    </div>
  );
}

function MissionVision() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          {missionVision.map((d) => (
            <MissionVisionCard key={d.id} data={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Our Team ============================ */

const teamMembers = [
  {
    id: 'biruk',
    name: 'Biruk Jira Gobesho',
    role: 'Founder and Lead Engineer',
    image: '/images/team/biruk.webp',
    crop: 'object-[50%_15%]',
    imageScale: 1,
    socialLinks: {
      x: 'https://x.com/olljira',
      linkedin: 'https://www.linkedin.com/company/olljira',
      telegram: 'https://t.me/olljira',
    },
    bio: 'Biruk founded OllJira after years of building networks and software across Ethiopia — from a nine-floor hospital network in Addis Ababa to CCTV on the country\u2019s largest tractor assembly line. CCNA and Hikvision certified, he also builds production software in Go, Node.js, and React. His rule is simple: if it is not tested, labeled, and documented, the job is not done.',
  },
  {
    id: 'hanna',
    name: 'Hanna Bekele',
    role: 'Operations and Support Lead',
    image: '/images/team/hanna.webp',
    crop: 'object-[50%_15%]',
    imageScale: 1,
    socialLinks: {
      x: 'https://x.com/olljira',
      linkedin: 'https://www.linkedin.com/company/olljira',
      telegram: 'https://t.me/olljira',
    },
    bio: 'Hanna runs scheduling, documentation, and warranty support at OllJira. She is the reason quotes arrive within 48 hours of a survey, handover folders are complete, and warranty callouts get answered the same day — the operational half of "done once, done right, documented".',
  },
];

function XBrandIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5 2.25L1.5 10.5L8.25 13.5L10.5 21.75L12 20.25L9.75 14.25L22.5 2.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MemberSocials({ member }: { member: (typeof teamMembers)[number] }) {
  const cls =
    'flex size-11 touch-manipulation items-center justify-center rounded-lg bg-primary/10 text-primary transition-[background-color,color,transform] duration-200 ease-out hover:bg-primary hover:text-primary-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5';
  return (
    <div className="mt-8 flex items-center gap-3">
      <a href={member.socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s X profile`} className={cls}>
        <XBrandIcon />
      </a>
      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn profile`} className={cls}>
        <Linkedin className="size-5" aria-hidden="true" />
      </a>
      <a href={member.socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s Telegram profile`} className={cls}>
        <TelegramIcon />
      </a>
    </div>
  );
}

function MemberImage({ member, grayscale = false }: { member: (typeof teamMembers)[number]; grayscale?: boolean }) {
  return (
    <div className="relative size-full overflow-hidden bg-[#eaf3ef]">
      <img
        src={member.image}
        alt={`${member.name}, ${member.role}`}
        width={1366}
        height={910}
        loading="lazy"
        decoding="async"
        className={`size-full origin-center object-cover ${member.crop} transition-all duration-500`}
        style={{
          filter: grayscale ? 'grayscale(100%) contrast(110%)' : 'grayscale(0%) contrast(100%)',
          transform: `scale(${grayscale ? member.imageScale : member.imageScale + 0.04})`,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
    </div>
  );
}

function TeamDesktop() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div
      className="hidden h-[520px] w-full overflow-hidden bg-background md:flex"
      onMouseLeave={() => setActive(null)}
    >
      <div
        className="relative h-full min-w-0 cursor-pointer overflow-hidden transition-all duration-500"
        style={{ flex: active === null || active === 0 ? 1 : 0.72, transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
        onMouseEnter={() => setActive(0)}
        onClick={() => setActive(0)}
      >
        <MemberImage member={teamMembers[0]} grayscale={active === 1} />
        <div
          className="pointer-events-none absolute inset-0 bg-background/10 transition-opacity duration-500"
          style={{ opacity: active === 1 ? 1 : 0 }}
        />
      </div>
      <div
        className="flex h-full min-w-0 flex-col justify-center overflow-hidden bg-background transition-all duration-500"
        style={{ flex: active === null ? 0 : 1.24, transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="w-[360px] flex-shrink-0 px-8 lg:w-[420px] lg:px-11 xl:w-[480px]">
          {active !== null && (
            <div
              key={teamMembers[active].id}
              className="animate-team-detail"
            >
              <h3 className="mb-1 text-balance font-serif text-3xl leading-tight text-primary md:text-4xl">
                {teamMembers[active].name}
              </h3>
              <p className="mb-7 text-lg leading-none text-foreground/70 md:text-xl">
                {teamMembers[active].role}
              </p>
              <p className="max-w-[430px] text-pretty text-[15px] leading-7 text-foreground/70">
                {teamMembers[active].bio}
              </p>
              <MemberSocials member={teamMembers[active]} />
            </div>
          )}
        </div>
      </div>
      <div
        className="relative h-full min-w-0 cursor-pointer overflow-hidden transition-all duration-500"
        style={{ flex: active === null || active === 1 ? 1 : 0.72, transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
        onMouseEnter={() => setActive(1)}
        onClick={() => setActive(1)}
      >
        <MemberImage member={teamMembers[1]} grayscale={active === 0} />
        <div
          className="pointer-events-none absolute inset-0 bg-background/10 transition-opacity duration-500"
          style={{ opacity: active === 0 ? 1 : 0 }}
        />
      </div>
    </div>
  );
}

function TeamMobile() {
  return (
    <div className="flex flex-col gap-0 bg-background md:hidden">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex flex-col">
          <div className="relative h-[430px] overflow-hidden">
            <MemberImage member={member} grayscale={false} />
          </div>
          <div className="border-b border-border/70 bg-background px-6 py-10 last:border-0">
            <h3 className="mb-1 text-balance font-serif text-3xl leading-tight text-primary">
              {member.name}
            </h3>
            <p className="mb-7 text-lg leading-none text-foreground/70">{member.role}</p>
            <p className="text-pretty text-[15px] leading-7 text-foreground/70">{member.bio}</p>
            <MemberSocials member={member} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OurTeam() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl md:px-12 lg:px-20">
        <div className="mb-10 px-6 md:mb-12 md:px-0">
          <h2 className="mb-3 text-balance font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Our Team
          </h2>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            A small, certified team that surveys, installs, tests, and documents every job
            ourselves — no subcontracted guesswork.
          </p>
        </div>
        <TeamDesktop />
        <TeamMobile />
      </div>
    </section>
  );
}

/* ============================ Page ============================ */

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="OllJira Technology Solution is a licensed network cabling, CCTV, and IT services company in Addis Ababa, founded by Biruk Jira Gobesho. Certified crews, tested and documented work."
      />
      <PageHeader
        image="/images/brand/header-network.svg"
        imageAlt="OllJira network hub artwork"
        imageClassName="translate-y-[-80px] scale-90 md:translate-y-[-140px] md:scale-110"
      />
      <div className="min-h-screen w-full bg-background pb-20 md:pb-28">
        <AboutIntro />
        <TechMarqueeSection />
        <OurStory />
        <MissionVision />
        <OurTeam />
        <BookACall />
      </div>
    </>
  );
}
