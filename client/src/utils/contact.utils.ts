import type { ContactSubmission } from "@/types/contact.types";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatSubmittedDate(iso: string): string {
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
  });
}

export function formatSubmittedDateTime(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}\n${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function getMessagePreview(message: string, maxLength = 52): string {
  const line = message.split("\n").find((l) => l.trim().length > 0) ?? message;
  if (line.length <= maxLength) return line;
  return `${line.slice(0, maxLength).trim()}...`;
}

export function filterSubmissions(
  submissions: ContactSubmission[],
  query: string,
  statusFilter: "all" | "unread" | "responded",
): ContactSubmission[] {
  const q = query.trim().toLowerCase();

  return submissions.filter((s) => {
    if (statusFilter === "unread" && s.status !== "unread") return false;
    if (statusFilter === "responded" && s.status !== "responded") return false;
    if (s.status === "archived" && statusFilter !== "all") return false;

    if (!q) return s.status !== "archived" || statusFilter === "all";

    const haystack = `${s.name} ${s.email} ${s.phone} ${s.message}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function computeContactStats(submissions: ContactSubmission[]) {
  const active = submissions.filter((s) => s.status !== "archived");
  const today = new Date().toDateString();

  return {
    total: active.length,
    unread: active.filter((s) => s.status === "unread").length,
    responded: active.filter((s) => s.status === "responded").length,
    today: active.filter(
      (s) => new Date(s.submittedAt).toDateString() === today,
    ).length,
  };
}
