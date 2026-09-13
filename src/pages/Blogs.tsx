import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import AmharicLetters from '../components/AmharicLetters';
import BookACall from '../components/BookACall';
import { trpc } from '../providers/trpc';
import Seo from '../components/Seo';

export type PostCardData = {
  id: number;
  slug: string;
  title: string;
  publishDate: string | Date;
  readTimeMinutes: number;
  imageUrl: string;
  firstTag: string;
};

/* Used as instant first paint; replaced by live CMS content when the API answers */
const fallbackPosts: PostCardData[] = [
  {
    id: 7,
    slug: 'ip-phones-vs-regular-lines-small-offices',
    title: 'IP Phones vs. Regular Lines for Small Offices',
    publishDate: '2026-08-15 15:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/ip-phone-office.webp',
    firstTag: 'IP Telephony',
  },
  {
    id: 6,
    slug: 'access-control-for-offices-maglocks-keypads',
    title: 'Access Control for Offices: Maglocks, Keypads, and What to Ask Your Installer',
    publishDate: '2026-08-15 13:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/access-control-office.webp',
    firstTag: 'Access Control',
  },
  {
    id: 5,
    slug: 'why-your-office-needs-a-layer-3-network',
    title: 'Why Your Office Needs a Layer 3 Network',
    publishDate: '2026-08-15 11:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/layer3-network.webp',
    firstTag: 'Networking',
  },
  {
    id: 4,
    slug: 'hospital-hms-emr-pacs-buying-checklist',
    title: 'What a Hospital Should Check Before Buying an HMS',
    publishDate: '2026-08-15 09:00:00+00',
    readTimeMinutes: 6,
    imageUrl: '/images/blogs/hms-checklist.webp',
    firstTag: 'Hospital IT',
  },
  {
    id: 3,
    slug: 'cctv-installation-checklist-addis-ababa',
    title: 'CCTV Installation Checklist for Addis Ababa Businesses',
    publishDate: '2026-07-20 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/cctv-checklist.webp',
    firstTag: 'CCTV',
  },
  {
    id: 2,
    slug: 'cat6-vs-cat6a-which-cable-for-your-office',
    title: 'Cat6 vs Cat6A: Which Cable Does Your Office Actually Need?',
    publishDate: '2026-07-02 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/cat6-vs-cat6a.webp',
    firstTag: 'Network Cabling',
  },
  {
    id: 1,
    slug: 'why-every-cable-run-must-be-tested-and-labeled',
    title: 'Why Every Cable Run Must Be Tested and Labeled',
    publishDate: '2026-06-11 09:00:00+00',
    readTimeMinutes: 5,
    imageUrl: '/images/blogs/testing-labeling.webp',
    firstTag: 'Best Practices',
  },
];

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const formatReadTime = (m: number) => `${m} min read`;

function PostCard({ post, index }: { post: PostCardData; index: number }) {
  const navigate = useNavigate();
  return (
    <div
      className="animate-fade-in-up min-h-full"
      style={{ animationDelay: `${Math.min(index, 5) * 0.04}s`, animationDuration: '0.22s' }}
    >
      <article
        className="group flex min-h-full cursor-pointer gap-4 rounded-2xl md:flex-col"
        onClick={() => navigate(`/blogs/${post.slug}`)}
      >
        <div className="aspect-video w-28 flex-shrink-0 overflow-hidden rounded-xl md:w-full">
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            className="ease-ui-out size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2 font-serif text-base font-medium leading-snug text-foreground transition-colors duration-150 group-hover:text-primary md:text-lg">
            {post.title}
          </h3>
          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <span>{formatDate(post.publishDate)}</span>
            <span className="mx-1.5">•</span>
            <span>{formatReadTime(post.readTimeMinutes)}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

function FeaturedCard({ post }: { post: PostCardData }) {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '0.24s' }}>
      <article
        className="group block cursor-pointer rounded-2xl md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-12"
        onClick={() => navigate(`/blogs/${post.slug}`)}
      >
        <div className="mb-5 aspect-video w-full overflow-hidden rounded-2xl md:mb-0">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="ease-ui-out size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div>
          <div className="mb-4 inline-block rounded-md bg-muted px-3 py-1.5">
            <span className="text-xs font-medium text-muted-foreground">Blog</span>
          </div>
          <h3 className="mb-3 font-serif text-2xl font-semibold leading-tight text-foreground transition-colors duration-150 group-hover:text-primary md:text-3xl">
            {post.title}
          </h3>
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            <span>{formatDate(post.publishDate)}</span>
            <span className="mx-2">•</span>
            <span>{formatReadTime(post.readTimeMinutes)}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Blogs() {
  const [query, setQuery] = useState('');
  const { data } = trpc.content.posts.useQuery(undefined, {
    staleTime: 60_000,
    retry: 1,
  });

  const posts: PostCardData[] = useMemo(() => {
    if (!data) return fallbackPosts;
    return data.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      publishDate: p.publishedAt,
      readTimeMinutes: p.readTimeMinutes,
      imageUrl: p.imageUrl ?? '',
      firstTag: p.firstTag ?? '',
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.firstTag ?? '').toLowerCase().includes(q)
    );
  }, [query, posts]);

  const latest = filtered[0];

  return (
    <main>
      <Seo
        title="Blog"
        description="Field notes on network cabling, CCTV, access control, IP telephony, and business IT in Ethiopia — from the team that installs them."
      />
      {/* Hero: floating Amharic letters strip */}
      <div className="relative h-[180px] w-full overflow-hidden sm:h-[200px]">
        <AmharicLetters
          letterCount={70}
          minSize={16}
          maxSize={24}
          minDuration={6}
          maxDuration={16}
          color="rgb(11 46 79/0.18)"
          className="z-10 translate-y-[-20px]"
        />
      </div>

      <div className="-mt-5 min-h-screen w-full pb-20">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <header className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Blogs
              </h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Field notes on cabling, CCTV, and business IT — from the team that installs them.
              </p>
            </div>
            <form
              className="flex w-full gap-3 md:w-96"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <label htmlFor="blog-search" className="sr-only">
                  Search blog topics
                </label>
                <input
                  id="blog-search"
                  name="search"
                  type="search"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a topic"
                  className="h-12 w-full rounded-xl border border-input bg-muted px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                />
              </div>
              <button
                type="submit"
                aria-label="Search"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Search className="size-4" aria-hidden="true" />
              </button>
            </form>
          </header>

          {latest && (
            <section className="mb-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground">
                Our Latest Blog
              </h2>
              <FeaturedCard post={latest} />
            </section>
          )}

          <section className="flex flex-col gap-8">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Recent Blogs
            </h2>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </section>

          <BookACall />
        </div>
      </div>
    </main>
  );
}
