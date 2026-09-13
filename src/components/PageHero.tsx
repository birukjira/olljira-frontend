import DottedBackground from './DottedBackground';
import AmharicLetters from './AmharicLetters';

export default function PageHero({
  title,
  image,
  imageAlt = 'hero image',
  imageClassName = '',
}: {
  title: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      <DottedBackground className="min-h-[240px] md:min-h-[380px]">
        <div className="relative z-10 mx-auto max-w-5xl translate-y-[80px] px-4 pt-10 md:translate-y-[152px] md:px-6 md:pt-12">
          <h1 className="animate-fade-in-left font-serif text-3xl tracking-tight text-primary md:max-w-[400px] md:text-5xl lg:max-w-none">
            {title}
          </h1>
        </div>
      </DottedBackground>
      <AmharicLetters letterCount={40} className="z-10 -translate-y-5" />
      {image && (
        <div className="pointer-events-none absolute inset-0">
          <div className="relative mx-auto h-full max-w-5xl -translate-y-[122px] md:-translate-y-[152px]">
            <img
              src={image}
              alt={imageAlt}
              aria-hidden="true"
              className={`absolute bottom-[-72px] left-1/2 w-[200px] translate-x-[-28%] select-none text-primary/80 md:bottom-[-96px] md:left-auto md:right-6 md:w-[280px] md:translate-x-0 lg:left-1/2 lg:right-auto lg:w-[360px] lg:translate-x-[38%] ${imageClassName}`}
              style={{ filter: 'opacity(0.85)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
