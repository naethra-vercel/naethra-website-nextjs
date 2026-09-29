import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";

import BlogsEditorialList from "@/components/BlogsEditorialList";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
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
        <header className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--blue-soft)]">
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

              <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                {post.category}
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#111]">
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
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_14.5rem] lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              {post.image ? (
                <figure className="mb-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--blue-soft)] shadow-[0_24px_50px_rgb(20_32_51_/_0.1)] md:mb-12">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover"
                  />
                </figure>
              ) : null}

              <div
                className="blog-detail-html w-full max-w-none text-[1.05rem] text-[var(--muted)] leading-[1.8]
                  [&_.elementor]:contents
                  [&_.elementor-section]:mb-6 [&_.elementor-section]:block
                  [&_.elementor-container]:block [&_.elementor-container]:w-full
                  [&_.elementor-row]:block [&_.elementor-row]:w-full
                  [&_.elementor-column]:block [&_.elementor-column]:w-full [&_.elementor-column]:max-w-none
                  [&_.elementor-widget-wrap]:block [&_.elementor-widget-wrap]:w-full
                  [&_.elementor-widget]:mb-4
                  [&_.elementor-heading-title]:m-0 [&_.elementor-heading-title]:font-display [&_.elementor-heading-title]:text-[clamp(1.35rem,2.4vw,1.85rem)] [&_.elementor-heading-title]:font-bold [&_.elementor-heading-title]:tracking-[-0.035em] [&_.elementor-heading-title]:text-ink
                  [&_.title-h2]:m-0 [&_.title-h2]:font-display [&_.title-h2]:text-[clamp(1.35rem,2.4vw,1.85rem)] [&_.title-h2]:font-bold [&_.title-h2]:tracking-[-0.035em] [&_.title-h2]:text-ink
                  [&_.title-h4]:m-0 [&_.title-h4]:font-display [&_.title-h4]:text-[1.15rem] [&_.title-h4]:font-bold [&_.title-h4]:text-ink
                  [&_:is(.thegem-extended-blog-grid,.portfolio,.portfolio-preloader-wrapper,.portfolio-set,.portfolio-item,.portfolio-navigator,.portfolio-sharing-pane,.socials-sharing,.gem-button-container)]:hidden
                  [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[0.15em]
                  [&_blockquote]:my-6 [&_blockquote]:border-l-[3px] [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:font-display [&_blockquote]:text-[1.15rem] [&_blockquote]:tracking-[-0.02em] [&_blockquote]:text-ink
                  [&_code]:font-mono [&_code]:text-[0.9em]
                  [&_figure]:my-6
                  [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:font-display [&_h1]:tracking-[-0.035em] [&_h1]:text-ink [&_h1]:leading-tight
                  [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-[clamp(1.35rem,2.4vw,1.85rem)] [&_h2]:tracking-[-0.035em] [&_h2]:text-ink [&_h2]:leading-tight
                  [&_h3]:mt-7 [&_h3]:mb-2.5 [&_h3]:font-display [&_h3]:text-[1.2rem] [&_h3]:tracking-[-0.035em] [&_h3]:text-ink [&_h3]:leading-tight
                  [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-display [&_h4]:tracking-[-0.035em] [&_h4]:text-ink
                  [&_img]:my-6 [&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl
                  [&_li]:mb-2
                  [&_ol]:mb-5 [&_ol]:pl-5
                  [&_p]:mb-5 [&_p]:max-w-[42rem]
                  [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[var(--line)] [&_pre]:bg-[#eef2f8] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[0.9em]
                  [&_ul]:mb-5 [&_ul]:max-w-[42rem] [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-[0_16px_40px_rgb(20_32_51_/_0.06)] sm:flex-row sm:items-center sm:justify-between">
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
              <div className="sticky top-28 space-y-5 rounded-2xl border border-[var(--line)] bg-white/80 p-5 shadow-[0_14px_34px_rgb(20_32_51_/_0.06)]">
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

      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
