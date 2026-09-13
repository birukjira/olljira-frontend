const partners = [
  { name: 'Summit General Hospital', logo: '/images/clients/summit-hospital.svg' },
  { name: 'Solkeb Hotel', logo: '/images/clients/solkeb-hotel.svg' },
  { name: 'Kegna Trading', logo: '/images/clients/kegna-trading.svg' },
];

export default function LogoMarquee({ compact = false }: { compact?: boolean }) {
  const row = [...partners, ...partners];
  const list = (
    <div className="relative w-full py-2 md:py-4">
      <div className="marquee-mask overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center py-4"
          style={{ animationDuration: '42s', gap: compact ? 18 : 96 }}
        >
          {row.map((p, i) => (
            <div key={`${p.name}-${i}`} className="flex shrink-0 items-center">
              <div className="flex items-center justify-center px-3 sm:px-4">
                <div className="flex h-8 items-center justify-center overflow-hidden sm:h-9">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    loading="lazy"
                    className="h-5 w-auto object-contain opacity-70 dark:invert sm:h-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/brand/icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-auto opacity-60 sm:h-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background to-transparent md:block" />
    </div>
  );

  if (compact) return list;

  return (
    <section className="bg-transparent pb-4 md:pb-6">
      <div className="group relative m-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
          <div className="md:max-w-44">
            <p className="text-sm font-medium text-muted-foreground md:text-end">
              Trusted by teams across Ethiopia
            </p>
          </div>
          <div className="w-full md:w-[calc(100%-11rem)]">{list}</div>
        </div>
      </div>
    </section>
  );
}
