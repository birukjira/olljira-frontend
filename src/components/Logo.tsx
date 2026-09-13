export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={dark ? '/images/brand/icon-reversed.svg' : '/images/brand/icon.svg'}
        alt="OllJira logo"
        className="h-9 w-9 object-contain"
      />
      <span className="leading-tight">
        <span
          className={`block font-serif text-lg font-bold tracking-[0.04em] ${
            dark ? 'text-white' : 'text-primary'
          }`}
        >
          <span className="text-accent">O</span>llJira
        </span>
        <span
          className={`block text-[9px] font-medium uppercase tracking-[0.22em] ${
            dark ? 'text-white/70' : 'text-muted-foreground'
          }`}
        >
          Technology Solution
        </span>
      </span>
    </span>
  );
}
