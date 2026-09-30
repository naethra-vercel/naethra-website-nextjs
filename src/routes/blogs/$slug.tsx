import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";

import BlogsEditorialList from "@/components/BlogsEditorialList";
import BlogArticleContent from "@/components/BlogArticleContent";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import { estimateReadTime } from "@/lib/blog-utils";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();

    const relatedPosts = (await getPosts(1, 8))
      .filter((candidate) => candidate.slug !== post.slug)
      .slice(0, 5);

    return { post, relatedPosts };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { post, relatedPosts } = Route.useLoaderData();
  const readTime = estimateReadTime(post);

  return (
    <main className="min-h-screen bg-background text-ink">
      <NaethraContentHeader />

      <article>
        <header className="relative overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(135deg,#e8edf6_0%,#f3f5fa_55%,#ffffff_100%)]">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="site-container relative py-14 md:py-20 lg:py-24">
            <div className="max-w-4xl">
              <Link
                to="/blogs"
                className="mb-8 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-primary transition-opacity hover:opacity-80"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                All articles
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <p className="m-0 rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                  {post.category}
                </p>
              </div>

              <h1 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.06em] text-ink">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] font-semibold text-[var(--muted)]">
                <time dateTime={post.dateIso}>{post.date}</time>
                <span className="hidden text-primary/40 sm:inline" aria-hidden="true">
                  /
                </span>
                <span>{post.author}</span>
                <span className="inline-flex items-center gap-1.5 text-[#888]">
                  <Clock3 size={13} aria-hidden="true" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="site-container py-10 md:py-14 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              {post.image ? (
                <figure className="group mb-10 overflow-hidden rounded-[5px] border border-[rgb(0_91_150_/_0.22)] bg-[var(--blue-soft)] shadow-[0_16px_40px_rgb(20_32_51_/_0.08)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_22px_48px_rgb(0_91_150_/_0.18)] md:mb-12">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
              ) : null}

              <BlogArticleContent html={post.contentHtml} />

              <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-[0_16px_40px_rgb(20_32_51_/_0.06)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-primary">
                    Next step
                  </p>
                  <p className="mt-2 m-0 text-sm text-[var(--muted)]">
                    Have a product question? Let’s talk it through.
                  </p>
                </div>
                <Link
                  to="/contact-us"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--blue-deep)]"
                >
                  Talk to the team
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgb(20_32_51_/_0.06)]">
                <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                  Article
                </p>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">Category</dt>
                    <dd className="m-0 text-right font-semibold text-ink">{post.category}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">Author</dt>
                    <dd className="m-0 text-right font-semibold text-ink">{post.author}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">Published</dt>
                    <dd className="m-0 text-right font-semibold text-ink">
                      <time dateTime={post.dateIso}>{post.date}</time>
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">Read time</dt>
                    <dd className="m-0 text-right font-semibold text-ink">{readTime}</dd>
                  </div>
                </dl>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-[0.74rem] font-extrabold uppercase tracking-[0.08em] text-primary transition-opacity hover:opacity-80"
                >
                  Browse journal
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section
          className="border-t border-[var(--line)] bg-[var(--blue-soft)]/35"
          aria-labelledby="related-articles-title"
        >
          <div className="site-container py-14 md:py-20">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                  Keep exploring
                </p>
                <h2
                  id="related-articles-title"
                  className="mt-3 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.06em] text-ink"
                >
                  More from the journal.
                </h2>
              </div>
              <Link
                to="/blogs"
                className="inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-[0.74rem] font-extrabold uppercase text-primary transition-[gap] hover:gap-3"
              >
                View all
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <BlogsEditorialList posts={relatedPosts} />
          </div>
        </section>
      ) : null}

    </main>
  );
}
