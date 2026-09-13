const row1 = ['hikvision', 'mikrotik', 'ubiquiti', 'tplink', 'dahua', 'zkteco'];
const row2 = ['dlink', 'cisco', 'commscope', 'grandstream', 'panduit', 'ezviz'];

const rows = [
  { icons: row1, duration: 40, reverse: false },
  { icons: row2, duration: 48, reverse: true },
];

export default function TechMarquee() {
  return (
    <div className="flex min-w-0 flex-col justify-center gap-3 overflow-hidden sm:gap-4">
      {rows.map((row, r) => (
        <div key={r} className="marquee-mask overflow-hidden">
          <div
            className="animate-marquee flex w-max items-center gap-12 pr-12"
            style={{
              animationDuration: `${row.duration}s`,
              animationDirection: row.reverse ? 'reverse' : undefined,
            }}
          >
            {[...row.icons, ...row.icons].map((icon, i) => (
              <img
                key={`${icon}-${i}`}
                src={`/images/vendors/${icon}.svg`}
                alt={icon}
                title={icon}
                loading="lazy"
                className="h-6 w-auto object-contain opacity-60 transition-opacity hover:opacity-100 sm:h-7"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
