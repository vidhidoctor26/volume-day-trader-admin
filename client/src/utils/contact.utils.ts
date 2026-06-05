import type { ContactSubmission, InquiryDateFilter } from "@/types/contact.types";

export function getInquiryName(submission: ContactSubmission): string {
  return `${submission.firstName} ${submission.lastName}`.trim();
}

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
  dateFilter: InquiryDateFilter,
): ContactSubmission[] {
  const q = query.trim().toLowerCase();
  const now = new Date();
  const todayStr = now.toDateString();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  return submissions.filter((submission) => {
    const created = new Date(submission.createdAt);

    if (dateFilter === "today" && created.toDateString() !== todayStr) {
      return false;
    }

    if (dateFilter === "week" && created < weekStart) {
      return false;
    }

    if (!q) return true;

    const haystack =
      `${submission.firstName} ${submission.lastName} ${submission.email} ${submission.phone} ${submission.message} ${submission.ticketNumber}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function computeContactStats(submissions: ContactSubmission[]) {
  const today = new Date().toDateString();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  return {
    total: submissions.length,
    today: submissions.filter(
      (s) => new Date(s.createdAt).toDateString() === today,
    ).length,
    thisWeek: submissions.filter((s) => new Date(s.createdAt) >= weekStart)
      .length,
    withPhone: submissions.filter((s) => s.phone.trim().length > 0).length,
  };
}
