import { useMemo } from 'react';

const LETTERS = [
  'ሀ','ሁ','ሂ','ሃ','ሄ','ህ','ሆ','ለ','ሉ','ሊ','ላ','ሌ','ል','ሎ','ሐ','ሑ','ሒ','ሓ','ሔ','ሕ','ሖ',
  'መ','ሙ','ሚ','ማ','ሜ','ም','ሞ','ሠ','ሡ','ሢ','ሣ','ሤ','ሥ','ሦ','ረ','ሩ','ሪ','ራ','ሬ','ር','ሮ',
  'ሰ','ሱ','ሲ','ሳ','ሴ','ስ','ሶ','ወ','ዉ','ዊ','ዋ','ዌ','ው','ዎ','ፀ','ፁ','ፂ','ፃ','ፄ','ፅ','ፆ',
  'አ','ኡ','ኢ','ኣ','ኤ','እ','ኦ','ከ','ኩ','ኪ','ካ','ኬ','ክ','ኮ','ዐ','ዑ','ዒ','ዓ','ዔ','ዕ','ዖ',
  'ተ','ቱ','ቲ','ታ','ቴ','ት','ቶ','ነ','ኑ','ኒ','ና','ኔ','ን','ኖ',
];

type Letter = {
  char: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function AmharicLetters({
  letterCount = 40,
  minSize = 16,
  maxSize = 24,
  minDuration = 2,
  maxDuration = 12,
  color = 'rgb(98 139 53 / 0.2)',
  className = '',
}: {
  letterCount?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  color?: string;
  className?: string;
}) {
  const letters = useMemo<Letter[]>(
    () =>
      Array.from({ length: letterCount }, (_, i) => ({
        char: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        left: 3 + Math.random() * 94,
        top: Math.random() * 90,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: minDuration + Math.random() * (maxDuration - minDuration),
        delay: -(i * 0.35),
      })),
    [letterCount, minSize, maxSize, minDuration, maxDuration]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          className="amharic-letter"
          style={{
            left: `${l.left}%`,
            top: `${l.top}%`,
            fontSize: l.size,
            color,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        >
          {l.char}
        </span>
      ))}
    </div>
  );
}
