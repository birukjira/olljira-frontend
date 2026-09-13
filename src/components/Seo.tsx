import { useEffect } from 'react';

const SITE_NAME = 'OllJira Technology Solution';
const DEFAULT_TITLE = 'OllJira Technology Solution — Cabling · CCTV · IT Services';
const DEFAULT_DESC =
  'Licensed network cabling, CCTV installation and IT services in Addis Ababa. Licensed · Certified · Documented.';
const DEFAULT_IMAGE = '/images/brand/og-cover.webp';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

type Props = {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
};

/**
 * Per-page SEO: document title, meta description, Open Graph, Twitter card,
 * and canonical link. Values reset to site defaults when the page unmounts.
 */
export default function Seo({ title, description, image, noindex }: Props) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESC;
  const img = image ?? DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;
    const origin = window.location.origin;
    const url = origin + window.location.pathname;
    const imgUrl = img.startsWith('http') ? img : origin + img;

    upsertMeta('name', 'description', desc);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imgUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', imgUrl);
    upsertCanonical(url);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [fullTitle, desc, img, noindex]);

  return null;
}
