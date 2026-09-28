import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import { getPosts } from "@/lib/wordpress";

export const Route = createFileRoute("/blogs/")({
  loader: async () => getPosts(1, 20),
  component: BlogsPage,
});

function BlogsPage() {
  const blogPosts = Route.useLoaderData();
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.categories).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b),
    ),
  ];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.categories.includes(activeCategory));
  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <main className="blogs-page">
      <NaethraContentHeader />
      <section className="blogs-hero">
        <div className="site-container blogs-hero-inner">
          <p className="blogs-kicker">Naethra / Journal</p>
          <h1>Ideas for building what comes next.</h1>
          <p className="blogs-hero-copy">
            Practical notes on product strategy, application development, integrations, and the
            decisions that make digital work more useful.
          </p>
        </div>
      </section>

      <section className="blogs-index site-container" aria-labelledby="blog-list-title">
        <div className="blogs-index-head">
          <div>
            <p className="blogs-kicker">The latest thinking</p>
            <h2 id="blog-list-title">Read the thinking.</h2>
          </div>
          <div className="blogs-filters" aria-label="Filter articles">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? "is-active" : ""}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {featuredPost && (
          <Link
            to="/blogs/$slug"
            params={{ slug: featuredPost.slug }}
            className="blog-featured-card"
          >
            <div className="blog-card-image-wrap">
              {featuredPost.image ? (
                <img src={featuredPost.image} alt="" className="blog-card-image" />
              ) : (
                <div className="blog-card-image blog-card-image-fallback" aria-hidden="true" />
              )}
              <span className="blog-card-image-label">Featured / {featuredPost.category}</span>
            </div>
            <div className="blog-featured-copy">
              <div className="blog-card-meta">
                <span>{featuredPost.date}</span>
                <span>{featuredPost.author}</span>
              </div>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <span className="blog-read-link">
                Read article <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        {!featuredPost && (
          <p className="blogs-empty">No articles found for this filter.</p>
        )}

        <div className="blogs-grid">
          {remainingPosts.map((post) => (
            <Link
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="blog-card"
              key={post.slug}
            >
              <div className="blog-card-image-wrap">
                {post.image ? (
                  <img src={post.image} alt="" className="blog-card-image" loading="lazy" />
                ) : (
                  <div className="blog-card-image blog-card-image-fallback" aria-hidden="true" />
                )}
                <span className="blog-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="blog-card-copy">
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <span>{post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <time dateTime={post.dateIso}>{post.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
