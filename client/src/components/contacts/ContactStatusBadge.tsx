import type { ContactStatus } from "@/types/contact.types";

type ContactStatusBadgeProps = {
  status: ContactStatus;
};

export default function ContactStatusBadge({ status }: ContactStatusBadgeProps) {
  if (status === "archived") {
    return (
      <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#94a3b8]">
        Archived
      </span>
    );
  }

  const isUnread = status === "unread";

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isUnread
          ? "bg-[#2563eb]/20 text-[#60a5fa]"
          : "bg-emerald-500/15 text-emerald-400"
      }`}
    >
      {isUnread ? "Unread" : "Responded"}
    </span>
  );
}
