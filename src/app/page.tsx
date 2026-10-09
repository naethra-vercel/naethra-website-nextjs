import type { Metadata } from "next";

import HomePage from "@/components/pages/HomePage";
import { getPrimaryMenu } from "@/lib/navigation";
import { getHomeContent, getPosts } from "@/lib/wordpress";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Naethra Technologies | Comprehensive Full Stack Development Outsourcing",
  description:
    "Naethra Technologies delivers full-stack web, mobile, cross-platform, UX/UI, FileMaker, and enterprise application development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Naethra Technologies | Comprehensive Full Stack Development Outsourcing",
    description:
      "Mastering web, mobile native, and cross-platform applications for ambitious businesses.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Page() {
  const [blogPosts, home, menu] = await Promise.all([
    getPosts(1, 4).catch(() => []),
    getHomeContent(),
    getPrimaryMenu(),
  ]);

  return <HomePage blogPosts={blogPosts} home={home} menu={menu} />;
}
