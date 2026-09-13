import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { ThreadsIcon, InstagramIcon, XIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons';

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

const FLIP_INTERVAL = 5000;

export default function Footer() {
  const [hovered, setHovered] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggle = useCallback(() => setShowContact((v) => !v), []);

  useEffect(() => {
    if (
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      hovered
    )
      return;
    const id = setInterval(toggle, FLIP_INTERVAL);
    return () => clearInterval(id);
  }, [hovered, toggle]);

  const onMouseEnter = () => {
    setHovered(true);
    toggle();
  };
  const onMouseLeave = () => setHovered(false);

  return (
    <footer className="relative mt-auto overflow-hidden bg-background px-4 pb-56 pt-12 sm:px-6 sm:pt-16 md:pb-72 xl:pb-[22rem]">
      <div className="relative z-10 flex flex-col items-center gap-y-8 text-center">
        {/* Top nav */}
        <div className="w-full border-b border-gray-100 pb-6">
          <nav className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-3 text-sm font-medium text-gray-600 sm:gap-x-6">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={item.path}
                className="rounded-full px-3 py-1.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Giant flipping brand / CTA */}
        <div
          className="relative flex h-24 cursor-pointer items-center justify-center overflow-hidden py-2 sm:h-28 lg:h-36"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="relative h-full w-full">
            {showContact ? (
              <div
                key="contact"
                className="flex h-full items-center justify-center gap-3 sm:gap-4"
                style={{ animation: 'footer-flip-in 0.4s ease-in-out both' }}
              >
                <Link
                  to="/contact"
                  className="text-4xl font-semibold tracking-tight text-primary transition-colors hover:text-primary/90 sm:text-5xl md:text-6xl xl:text-8xl"
                >
                  Contact Now
                </Link>
                <ArrowUpRight
                  className="hidden size-10 text-primary sm:block md:h-14 md:w-14"
                  strokeWidth={4}
                />
              </div>
            ) : (
              <div
                key="brand"
                className="text-5xl font-semibold uppercase tracking-tight text-primary sm:text-6xl md:text-7xl xl:text-8xl"
                style={{ animation: 'footer-flip-in 0.4s ease-in-out both' }}
              >
                OllJira
                <span className="flex h-6 items-center justify-center text-sm font-semibold tracking-tight sm:text-base md:text-lg">
                  Technology Solution
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Socials + copyright */}
        <div className="w-full border-t border-[#dfe6d9] pt-7">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[#4d5557] sm:gap-x-6">
              {socials.map(({ id, label, url, Icon }) => (
                <a
                  key={id}
                  href={url}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex size-11 items-center justify-center text-[#4d5557] transition-all duration-200 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
            <p className="px-4 text-center text-sm tracking-[-0.01em] text-[#5f6668] sm:text-[15px]">
              © {new Date().getFullYear()} OllJira Technology Solution, All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Decorative footer artwork */}
      <picture aria-hidden="true" className="pointer-events-none absolute inset-0">
        <source media="(min-width: 768px)" srcSet="/images/footer.webp" type="image/webp" />
        <img
          src="/images/footer_mobile.webp"
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-x-0 bottom-0 w-full max-w-none select-none xl:translate-y-[7.5rem]"
        />
      </picture>
    </footer>
  );
}
