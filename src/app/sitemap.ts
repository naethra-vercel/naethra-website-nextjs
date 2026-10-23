import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/wordpress";

const SITE = "https://naethra.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blogs",
  "/cms",
  "/contact-us",
  "/download",
  "/flutter-app-development-company",
  "/mobile-app",
  "/portfolio",
  "/services",
  "/services/aws-cloud-support",
  "/services/claris-filemaker-application",
  "/services/custom-web-publishing",
  "/services/dot-net-application",
  "/services/java-j2ee-applications",
  "/services/php-mysql-applications",
  "/web-app",
  "/30-mins-meeting",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer-and-notification",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(1, 50).catch(() => []);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: path ? `${SITE}${path}/` : `${SITE}/`,
    lastModified: new Date(),
    changeFrequency: path.includes("filemaker") || path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("filemaker") ? 0.9 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blogs/${post.slug}/`,
    lastModified: post.dateIso ? new Date(post.dateIso) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}