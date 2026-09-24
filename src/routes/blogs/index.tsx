import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import { blogCategories, blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blogs/")({ component: BlogsPage });

function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof blogCategories)[number]>("All");
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);
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
            {blogCategories.map((category) => (
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
              <img src={featuredPost.image} alt="" className="blog-card-image" />
              <span className="blog-card-image-label">Featured / {featuredPost.category}</span>
            </div>
            <div className="blog-featured-copy">
              <div className="blog-card-meta">
                <span>{featuredPost.date}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <span className="blog-read-link">
                Read article <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </div>
          </Link>
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
                <img src={post.image} alt="" className="blog-card-image" loading="lazy" />
                <span className="blog-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="blog-card-copy">
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
