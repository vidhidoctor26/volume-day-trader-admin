import type { BlogPost } from "@/types/blog.types";

export function extractTitleFromHtml(content: string): string | null {
  const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (!match?.[1]) return null;
  return match[1].replace(/<[^>]+>/g, "").trim() || null;
}

export function slugifyTitle(title: string): string {
  let base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!base) base = `post-${Math.random().toString(36).substring(2, 7)}`;
  return base;
}

export function formatBlogDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function computeBlogStats(posts: BlogPost[]) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    thisMonth: posts.filter((p) => new Date(p.createdAt) >= monthStart).length,
  };
}
