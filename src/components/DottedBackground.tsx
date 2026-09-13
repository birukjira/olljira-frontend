import type { ReactNode } from 'react';

export default function DottedBackground({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  /* The original renders radial-gradient with hsl(var(--primary) / .25),
     but --primary is a hex value on the live site, so the browser drops the
     background entirely — computed background-image is "none". We replicate
     the rendered result: no dots. */
  return <div className={`relative ${className}`}>{children}</div>;
}
