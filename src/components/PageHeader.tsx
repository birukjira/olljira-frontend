import { useMemo } from 'react';
import DottedBackground from './DottedBackground';

/* Deterministic seeded dot grid — exact port of the original site's component */
function fnv1a(str: string): number {
  let a = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    a ^= str.charCodeAt(i);
    a = Math.imul(a, 16777619);
  }
  return a >>> 0;
}

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 1831565813;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function DotGrid({
  rows = 14,
  columns = 22,
  dotRadius = 2,
  gap = 20,
  minOpacity = 0.12,
  maxOpacity = 0.4,
  color = 'hsl(var(--primary))',
  seed = 'suba-dot-grid',
  stagger = true,
  className = '',
}: {
  rows?: number;
  columns?: number;
  dotRadius?: number;
  gap?: number;
  minOpacity?: number;
  maxOpacity?: number;
  color?: string;
  seed?: string;
  stagger?: boolean;
  className?: string;
}) {
  const { dots, width, height } = useMemo(() => {
    const rand = mulberry(fnv1a(seed));
    const v = stagger ? gap * 0.5 : 0;
    const c = Math.max(0, dotRadius);
    const w = c * 2 + gap * (columns - 1) + v;
    const h = c * 2 + gap * (rows - 1);
    const list: { id: string; cx: number; cy: number; opacity: number }[] = [];
    for (let l = 0; l < rows; l++) {
      const offset = stagger && l % 2 === 1 ? v : 0;
      for (let m = 0; m < columns; m++) {
        list.push({
          id: `${l}-${m}`,
          cx: c + m * gap + offset,
          cy: c + l * gap,
          opacity: minOpacity + (maxOpacity - minOpacity) * rand(),
        });
      }
    }
    return { dots: list, width: w, height: h };
  }, [rows, columns, gap, dotRadius, minOpacity, maxOpacity, seed, stagger]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '100vw',
        height: '100%',
        transform: 'translateX(-50%)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        className="size-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {dots.map((d) => (
          <circle key={d.id} cx={d.cx} cy={d.cy} r={dotRadius} fill={color} fillOpacity={d.opacity} />
        ))}
      </svg>
    </div>
  );
}

export default function PageHeader({
  title,
  image,
  imageAlt = 'hero image',
  imageClassName = '',
}: {
  title?: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
}) {
  return (
    <div className="relative w-full overflow-x-clip">
      <DottedBackground className="min-h-[140px] sm:min-h-[180px] md:min-h-[260px]">
        <div className="z-10 translate-y-[52px] px-4 pt-8 sm:translate-y-[64px] md:translate-y-[110px] md:px-6 md:pt-12">
          {title ? (
            <h1 className="animate-fade-in-left font-serif text-3xl tracking-tight text-primary md:text-5xl">
              {title}
            </h1>
          ) : null}
        </div>
      </DottedBackground>
      <DotGrid rows={14} columns={24} gap={3} dotRadius={0.6} className="z-0 translate-y-[-10px]" />
      {image && (
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className={`relative mx-auto h-full max-w-5xl -translate-y-14 sm:-translate-y-[72px] md:-translate-y-24 ${imageClassName}`}>
            <img
              src={image}
              alt={imageAlt}
              aria-hidden="true"
              className="absolute bottom-[-54px] left-1/2 w-[160px] -translate-x-[28%] select-none text-primary/80 sm:bottom-[-72px] sm:w-[220px] md:bottom-[-96px] md:w-[280px] md:translate-x-[20%] lg:w-[340px]"
              style={{ filter: 'opacity(0.85)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
