import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
        <h2 className="font-serif-display relative text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to get started?
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Let&apos;s discuss how we can help transform your digital presence and
          accelerate your business growth.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/schedule"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Work Samples
          </Link>
        </div>
      </div>
    </section>
  );
}
