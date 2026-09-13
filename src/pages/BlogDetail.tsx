import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

interface BlogPostVM {
  id: number;
  slug: string;
  title: string;
  publishDate: string | Date;
  readTimeMinutes: number;
  imageUrl: string;
  excerpt: string;
  firstTag: string;
  contentHtml: string;
  authorName: string;
  authorAvatar: string;
}

const AUTHOR = { name: 'Biruk Jira Gobesho', avatar: '/images/team/biruk.webp' };

/* Instant first paint while the CMS answers */
const fallbackPosts: BlogPostVM[] = [
  {
    id: 7,
    slug: 'ip-phones-vs-regular-lines-small-offices',
    title: 'IP Phones vs. Regular Lines for Small Offices',
    publishDate: '2026-08-15 15:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/ip-phone-office.webp',
    excerpt: '',
    firstTag: 'IP Telephony',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 6,
    slug: 'access-control-for-offices-maglocks-keypads',
    title: 'Access Control for Offices: Maglocks, Keypads, and What to Ask Your Installer',
    publishDate: '2026-08-15 13:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/access-control-office.webp',
    excerpt: '',
    firstTag: 'Access Control',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 5,
    slug: 'why-your-office-needs-a-layer-3-network',
    title: 'Why Your Office Needs a Layer 3 Network',
    publishDate: '2026-08-15 11:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/layer3-network.webp',
    excerpt: '',
    firstTag: 'Networking',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 4,
    slug: 'hospital-hms-emr-pacs-buying-checklist',
    title: 'What a Hospital Should Check Before Buying an HMS',
    publishDate: '2026-08-15 09:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/hms-checklist.webp',
    excerpt: '',
    firstTag: 'Hospital IT',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 3,
    slug: 'cctv-installation-checklist-addis-ababa',
    title: 'CCTV Installation Checklist for Addis Ababa Businesses',
    publishDate: '2026-07-20 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/cctv-checklist.webp',
    excerpt: '',
    firstTag: 'CCTV',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 2,
    slug: 'cat6-vs-cat6a-which-cable-for-your-office',
    title: 'Cat6 vs Cat6A: Which Cable Does Your Office Actually Need?',
    publishDate: '2026-07-02 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/cat6-vs-cat6a.webp',
    excerpt: '',
    firstTag: 'Network Cabling',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
  {
    id: 1,
    slug: 'why-every-cable-run-must-be-tested-and-labeled',
    title: 'Why Every Cable Run Must Be Tested and Labeled',
    publishDate: '2026-06-11 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/testing-labeling.webp',
    excerpt: '',
    firstTag: 'Best Practices',
    contentHtml: '',
    authorName: AUTHOR.name,
    authorAvatar: AUTHOR.avatar,
  },
];

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/* Scroll-linked reading progress rail (dashes + traveling dot) */
function ProgressRail({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [count, setCount] = useState(12);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight;
      setCount(Math.max(12, Math.min(30, Math.ceil(h / 50))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [targetRef]);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = -rect.top + vh * 0.2;
      const range = rect.height - vh * 0.5;
      let p = (t / range) * 100;
      p = Math.max(0, Math.min(100, p));
      setActive(Math.min(Math.floor((p / 100) * count), count - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetRef, count]);

  return (
    <div className="pointer-events-none absolute -left-12 top-0 hidden h-full flex-col items-center md:flex lg:-left-16">
      <div className="sticky top-[20vh] flex flex-col items-center">
        <div className="relative flex flex-col items-center gap-0">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="w-8 rounded-full bg-primary/40 transition-opacity duration-300 last:mb-0"
              style={{ height: 2, marginBottom: 16, opacity: i < active ? 0.3 : 1 }}
            />
          ))}
          <div
            className="absolute z-10 size-4 rounded-full bg-primary shadow-sm transition-transform duration-200 ease-linear"
            style={{
              top: -4,
              left: '50%',
              marginLeft: -8,
              marginTop: -16,
              transform: `translateY(${active * 18 + 16}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AuthorCard({ name, avatarUrl }: { name: string; avatarUrl: string }) {
  return (
    <div className="mt-16 flex flex-col items-center border-t border-zinc-100 pt-8 text-center">
      <div className="mb-3 size-16 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-zinc-100">
        <img src={avatarUrl} alt={name} className="size-full object-cover" />
      </div>
      <h2 className="mb-1 font-serif text-base font-semibold text-foreground">{name}</h2>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: postRow, isLoading } = trpc.content.postBySlug.useQuery(
    { slug: slug ?? '' },
    { staleTime: 60_000, retry: 1, enabled: Boolean(slug) }
  );
  const { data: allRows } = trpc.content.posts.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const post: BlogPostVM | null = useMemo(() => {
    if (postRow) {
      return {
        id: postRow.id,
        slug: postRow.slug,
        title: postRow.title,
        publishDate: postRow.publishedAt,
        readTimeMinutes: postRow.readTimeMinutes,
        imageUrl: postRow.imageUrl ?? '',
        excerpt: postRow.excerpt ?? '',
        firstTag: postRow.firstTag ?? '',
        contentHtml: postRow.contentHtml ?? '',
        authorName: AUTHOR.name,
        authorAvatar: AUTHOR.avatar,
      };
    }
    if (isLoading) {
      const fb = fallbackPosts.find((p) => p.slug === slug) ?? fallbackPosts[0];
      return fb;
    }
    return null;
  }, [postRow, isLoading, slug]);

  const more: BlogPostVM[] = useMemo(() => {
    if (allRows) {
      return allRows
        .filter((p) => p.slug !== slug)
        .slice(0, 3)
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          publishDate: p.publishedAt,
          readTimeMinutes: p.readTimeMinutes,
          imageUrl: p.imageUrl ?? '',
          excerpt: p.excerpt ?? '',
          firstTag: p.firstTag ?? '',
          contentHtml: '',
          authorName: AUTHOR.name,
          authorAvatar: AUTHOR.avatar,
        }));
    }
    return fallbackPosts.filter((p) => p.slug !== slug).slice(0, 3);
  }, [allRows, slug]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Post not found</h1>
        <p className="text-muted-foreground">
          This blog post may have been moved or unpublished.
        </p>
        <Link to="/blogs" className="text-primary underline hover:text-primary/80">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full pb-20 pt-9">
      <Seo
        title={post.title}
        description={post.excerpt || `${post.title} — field notes from the OllJira Technology Solution team.`}
        image={post.imageUrl || undefined}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden">
        <img
          src="/images/misc/pricing-texture.webp"
          alt=""
          className="size-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
      <h1 className="relative z-10 mb-10 px-6 text-center font-serif text-3xl font-semibold leading-tight text-foreground md:text-[40px]">
        {post.title}
      </h1>
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-8">
        <ProgressRail targetRef={contentRef} />
        <div ref={contentRef}>
          <div className="mb-8 flex items-center gap-4">
            <Link
              to="/blogs"
              className="group flex items-center gap-2 p-0 text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-transparent"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Blogs
            </Link>
            <div className="h-px flex-1 bg-[#dfe6ec]" />
          </div>

          {post.imageUrl && (
            <div className="mb-10 aspect-video w-full overflow-hidden rounded-3xl">
              <img
                src={post.imageUrl}
                alt="Blog featured image"
                className="size-full object-cover"
              />
            </div>
          )}
          <div className="mb-10 flex items-center justify-between text-xs text-muted-foreground md:text-sm">
            <div className="flex items-center gap-2 font-medium md:gap-3">
              <span>{formatDate(post.publishDate)}</span>
              <span className="mx-1">•</span>
              <span>{post.readTimeMinutes} min read</span>
            </div>
            {post.firstTag && (
              <div className="rounded-full border border-[#dde4ea] bg-white px-3 py-1.5 text-[10px] font-medium text-zinc-600 md:text-xs">
                {post.firstTag}
              </div>
            )}
          </div>

          {post.contentHtml ? (
            <div
              className="mb-16 text-[15px] leading-7 text-[#444] [&_a]:text-primary [&_a]:underline [&_img]:my-4 [&_img]:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <div className="mb-16 h-32 animate-pulse rounded-2xl bg-muted/50" />
          )}

          <AuthorCard name={post.authorName} avatarUrl={post.authorAvatar} />
        </div>

        {more.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="mb-8 flex items-center gap-4">
              <h2 className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
                More Like This
              </h2>
              <div className="h-px flex-1 bg-[#dfe6ec]" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.id}
                  to={`/blogs/${p.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group flex h-full flex-col rounded-2xl border border-[#dfe6ec] transition-colors hover:border-primary/60"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img src={p.imageUrl} alt={p.title} className="size-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 text-[10px] text-muted-foreground">
                      {formatDate(p.publishDate)}
                    </div>
                    <h3 className="mb-2 font-serif text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-snug text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
