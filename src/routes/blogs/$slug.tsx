import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const post = Route.useLoaderData();
  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);

  return (
    <main className="blog-detail-page">
      <NaethraContentHeader />
      <article>
        <header className="blog-detail-hero">
          <div className="site-container blog-detail-hero-inner">
            <Link to="/blogs" className="blog-back-link">
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <p className="blogs-kicker">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="blog-detail-meta">
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>
        <div className="site-container blog-detail-layout">
          <img src={post.image} alt="" className="blog-detail-image" />
          <div className="blog-detail-body">
            <p className="blog-detail-intro">{post.intro}</p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <div className="blog-detail-cta">
              <span>Have a product question?</span>
              <a href="/contact-us">
                Talk to the Naethra team <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="blog-related site-container" aria-labelledby="related-articles-title">
        <div className="blogs-index-head">
          <div>
            <p className="blogs-kicker">Keep exploring</p>
            <h2 id="related-articles-title">More from the journal.</h2>
          </div>
          <Link to="/blogs" className="blog-read-link">
            View all <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="blogs-grid">
          {relatedPosts.map((relatedPost) => (
            <Link
              to="/blogs/$slug"
              params={{ slug: relatedPost.slug }}
              className="blog-card"
              key={relatedPost.slug}
            >
              <div className="blog-card-image-wrap">
                <img src={relatedPost.image} alt="" className="blog-card-image" loading="lazy" />
                <span className="blog-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="blog-card-copy">
                <div className="blog-card-meta">
                  <span>{relatedPost.category}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
                <h3>{relatedPost.title}</h3>
                <p>{relatedPost.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
