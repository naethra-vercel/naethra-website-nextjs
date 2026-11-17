import type { Metadata } from "next";

import HomePage from "@/components/pages/HomePage";
import { getPrimaryMenu } from "@/lib/navigation";
import { getHomeContent, getPortfolio, getPosts } from "@/lib/wordpress";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Naethra Technologies | Full Stack Outsourcing",
  description:
    "Naethra Technologies is a FileMaker, mobile, Flutter, and web development company in India delivering full-stack outsourcing.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Naethra Technologies | Full Stack Outsourcing",
    description:
      "Naethra Technologies — FileMaker development company India, plus mobile, Flutter, and web application engineering.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/logo.png",
        width: 2169,
        height: 725,
        alt: "Naethra Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default async function Page() {
  const [blogPosts, home, menu, portfolioProjects] = await Promise.all([
    getPosts(1, 4).catch(() => []),
    getHomeContent(),
    getPrimaryMenu(),
    getPortfolio(5).catch(() => []),
  ]);

  return (
    <HomePage
      blogPosts={blogPosts}
      home={home}
      menu={menu}
      recentProjects={portfolioProjects.slice(0, 5)}
    />
  );
}
