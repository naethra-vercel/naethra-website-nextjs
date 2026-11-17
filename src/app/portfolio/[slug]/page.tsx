import "@/styles/pages.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import BlogArticleContent from "@/components/BlogArticleContent";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import { getPortfolio, getPortfolioBySlug } from "@/lib/wordpress";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getPortfolio(50).catch(() => []);
  return projects
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "Case study not found" };

  return {
    title: project.title,
    description: project.summary || undefined,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) notFound();

  const related = (await getPortfolio(12))
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 4);

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
                href="/portfolio"
                className="mb-8 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-primary transition-opacity hover:opacity-80"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                All projects
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <p className="m-0 rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                  {project.category}
                </p>
              </div>

              <h1 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.06em] text-ink">
                {project.title}
              </h1>

              {project.summary ? (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  {project.summary}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="site-container py-10 md:py-14 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              {project.image ? (
                <figure className="group mb-10 overflow-hidden rounded-[5px] border border-[rgb(0_91_150_/_0.22)] bg-[var(--blue-soft)] shadow-[0_16px_40px_rgb(20_32_51_/_0.08)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_22px_48px_rgb(0_91_150_/_0.18)] md:mb-12">
                  <img
                    src={project.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
              ) : null}

              {project.contentHtml ? (
                <BlogArticleContent html={project.contentHtml} />
              ) : (
                <p className="text-[var(--muted)]">Case study details coming soon.</p>
              )}

              <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-[0_16px_40px_rgb(20_32_51_/_0.06)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-primary">
                    Next step
                  </p>
                  <p className="mt-2 m-0 text-sm text-[var(--muted)]">
                    Have a similar project in mind? Let’s talk it through.
                  </p>
                </div>
                <Link
                  href="/contact-us"
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
                  Case study
                </p>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">Category</dt>
                    <dd className="m-0 text-right font-semibold text-ink">{project.category}</dd>
                  </div>
                </dl>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-[0.74rem] font-extrabold uppercase tracking-[0.08em] text-primary transition-opacity hover:opacity-80"
                >
                  Browse portfolio
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section
          className="border-t border-[var(--line)] bg-[var(--blue-soft)]/35"
          aria-labelledby="related-projects-title"
        >
          <div className="site-container py-14 md:py-20">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                  Keep exploring
                </p>
                <h2
                  id="related-projects-title"
                  className="mt-3 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.06em] text-ink"
                >
                  More projects.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-[0.74rem] font-extrabold uppercase text-primary transition-[gap] hover:gap-3"
              >
                View all
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="group block overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_18px_40px_rgb(0_91_150_/_0.12)]"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="block aspect-[4/3] bg-[var(--blue-soft)]" aria-hidden="true" />
                    )}
                    <div className="p-4">
                      <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-primary">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-[-0.03em] text-ink">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
