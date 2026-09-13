import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { ThreadsIcon, InstagramIcon, XIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons';
import Logo from './Logo';

const navItems = [
  { page: 'about', label: 'About Us', path: '/about' },
  { page: 'services', label: 'Services', path: '/services' },
  { page: 'blogs', label: 'Blogs', path: '/blogs' },
  { page: 'careers', label: 'Careers', path: '/careers' },
  { page: 'projects', label: 'Work Samples', path: '/projects' },
  { page: 'contact', label: 'Contact Us', path: '/contact' },
];

const socials = [
  { id: 'threads', label: 'Threads', url: 'https://www.threads.com/@olljira', Icon: ThreadsIcon },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/olljira/', Icon: InstagramIcon },
  { id: 'x', label: 'X', url: 'https://x.com/olljira', Icon: XIcon },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/olljira', Icon: LinkedInIcon },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@olljira', Icon: YouTubeIcon },
];

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function MeetButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <Link
      to="/schedule"
      onClick={scrollTop}
      className={`inline-flex h-10 items-center gap-2 rounded-full bg-accent pl-1 pr-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent/90 ${className}`}
    >
      <span className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-white">
        <CalendarCheck className="size-4 text-accent" aria-hidden="true" />
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div id="landing-menu" role="dialog" className="fixed inset-0 z-50 bg-background xl:hidden">
      <div className="relative flex h-full flex-col bg-background">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 md:h-16">
          <Link to="/" className="flex min-w-0 items-center gap-2" onClick={onClose} aria-label="OllJira home">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex h-full flex-1 flex-col px-6 py-8">
          <nav className="gap-y-4">
            {navItems.map((item, i) => (
              <div
                key={item.label}
                className="animate-fade-in-left"
                style={{ animationDelay: `${i * 0.05}s`, animationDuration: '0.3s' }}
              >
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="group flex w-full items-center justify-between py-2 text-left"
                >
                  <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
          <div className="animate-fade-in-up pt-8" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/schedule"
              onClick={onClose}
              className="flex h-12 items-center justify-start gap-3 rounded-full bg-accent pl-1.5 pr-4 text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90"
            >
              <span className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <CalendarCheck className="size-5 text-accent" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">Book a Site Survey</span>
            </Link>
          </div>
          <div
            className="animate-fade-in-up mt-auto border-t border-border/60 pt-8"
            style={{ animationDelay: '0.4s' }}
          >
            <p className="mb-4 text-xs font-medium text-foreground">Reach Us</p>
            <div className="gap-y-3">
              {socials.map(({ id, label, url, Icon }) => (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex min-h-11 items-center gap-3 rounded-md text-xs text-zinc-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Icon className="size-4 text-zinc-400 group-hover:text-primary" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/90 backdrop-blur-md transition-shadow duration-200 supports-[backdrop-filter]:bg-background/75"
        style={{
          boxShadow: scrolled
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : 'none',
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-16 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2" onClick={scrollTop} aria-label="OllJira home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 xl:flex">
            {navItems
              .filter((i) => i.page !== 'projects')
              .map((item) => (
                <Link
                  key={item.page}
                  to={item.path}
                  onClick={scrollTop}
                  className={`whitespace-nowrap transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <div
              className="flex items-center gap-4 transition-all duration-200"
              style={{ flexDirection: scrolled ? 'row-reverse' : 'row' }}
            >
              <MeetButton label="Book a Survey" />
              <Link
                to="/projects"
                onClick={scrollTop}
                className="whitespace-nowrap text-sm font-medium text-zinc-600 transition-colors hover:text-primary"
              >
                Work Samples
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <MeetButton label="Book a Survey" className="hidden md:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls="landing-menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
