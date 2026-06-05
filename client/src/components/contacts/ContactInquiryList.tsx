import type { ContactSubmission } from "@/types/contact.types";
import {
  formatSubmittedDate,
  getInquiryName,
  getInitials,
  getMessagePreview,
} from "@/utils/contact.utils";

import ContactTicketBadge from "./ContactTicketBadge";

type ContactInquiryListProps = {
  submissions: ContactSubmission[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function ContactInquiryList({
  submissions,
  selectedId,
  onSelect,
}: ContactInquiryListProps) {
  if (submissions.length === 0) {
    return null;
  }

  return (
    <ul className="divide-y divide-white/[0.06] overflow-y-auto">
      {submissions.map((item) => {
        const isSelected = item.id === selectedId;
        const name = getInquiryName(item);

        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`relative flex w-full gap-3 px-4 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-l-2 border-l-[#2563eb] bg-[#2563eb]/10 shadow-[inset_0_0_24px_rgba(37,99,235,0.08)]"
                  : "border-l-2 border-l-transparent hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isSelected
                    ? "bg-[#2563eb]/25 text-[#93c5fd] ring-1 ring-[#2563eb]/40"
                    : "bg-white/[0.06] text-[#94a3b8]"
                }`}
              >
                {getInitials(name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium text-white">{name}</p>
                  <span className="shrink-0 text-xs text-[#94a3b8]">
                    {formatSubmittedDate(item.createdAt)}
                  </span>
                </div>
                <p className="truncate text-sm text-[#94a3b8]">{item.email}</p>
                <p className="mt-1 line-clamp-1 text-xs text-[#94a3b8]/80">
                  {getMessagePreview(item.message)}
                </p>
                <div className="mt-2">
                  <ContactTicketBadge ticketNumber={item.ticketNumber} />
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
