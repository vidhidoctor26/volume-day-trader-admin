export const DEFAULT_COVER_IMAGE =
  "https://images.unsplash.com/photo-1611974789855-9c8a298572e9?w=1200&h=675&fit=crop";

export function buildMockBlogTitle(topic: string): string {
  const trimmed = topic.trim();
  if (trimmed.length > 10) {
    return trimmed.split("\n")[0]?.slice(0, 120) ?? "Wyckoff Trading Insights";
  }
  return "Top 5 Wyckoff Trading Strategies for 2026";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}
