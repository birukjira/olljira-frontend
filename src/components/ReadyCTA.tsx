import { useEffect, useState } from 'react';
import { Mail, MapPin, MessageSquare, Phone, X, Zap } from 'lucide-react';

const ORG = {
  phoneDisplay: '+251 91 234 5678',
  email: 'info@olljira.com',
  location: 'Bole, Addis Ababa, Ethiopia',
};

export default function ReadyCTA() {
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
