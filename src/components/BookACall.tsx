import { Link } from 'react-router';
import { CalendarCheck } from 'lucide-react';

function ShineText({
  text,
  disabled = false,
  speed = 5,
  className = '',
}: {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}) {
  return (
    <div
      className={`inline-block bg-clip-text text-transparent ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(140, 140, 140, 0.3) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(140, 140, 140, 0.3) 70%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </div>
  );
}

export default function BookACall() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 px-8 py-16 text-center text-white md:py-24">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
            <div className="absolute inset-0 opacity-10">
              <div className="size-full bg-plus-pattern" />
            </div>
          </div>
          <div className="relative z-10">
            <ShineText
              text="Start Your Project With OLLJIRA Today!"
              speed={4}
              className="mb-4 bg-clip-text text-xl font-semibold text-transparent md:text-3xl"
            />
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/90">
              Cabling, CCTV, and IT done once, done right, documented. Book a site survey
              and get an itemized quote within 48 hours.
            </p>
            <Link
              to="/schedule"
              className="mb-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition-colors duration-300 hover:bg-primary-foreground/95 hover:shadow-lg">
                <CalendarCheck className="size-5" aria-hidden="true" />
                Book a Site Survey
              </span>
            </Link>
            <p className="my-2 text-sm text-white/70">Or</p>
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer text-sm text-white underline underline-offset-2 transition-colors hover:text-white/80"
            >
              Book a services quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
