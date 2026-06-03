import type { ContactSubmission } from "@/types/contact.types";
import { formatSubmittedDateTime } from "@/utils/contact.utils";

import ContactStatusBadge from "./ContactStatusBadge";

type ContactDetailsPanelProps = {
  submission: ContactSubmission;
  onMarkResponded: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onClose?: () => void;
  showClose?: boolean;
};

export default function ContactDetailsPanel({
  submission,
  onMarkResponded,
  onArchive,
  onDelete,
  onClose,
  showClose = false,
}: ContactDetailsPanelProps) {
  const [datePart, timePart] = formatSubmittedDateTime(
    submission.submittedAt,
  ).split("\n");

  return (
    <div className="contact-details-enter flex h-full flex-col">
      {showClose && onClose && (
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 lg:hidden">
          <h3 className="font-semibold text-white">Inquiry details</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/5 hover:text-white"
            aria-label="Close details"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <ContactStatusBadge status={submission.status} />
        </div>

        <section className="mt-6">
          <h4 className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
            Contact information
          </h4>
          <div className="mt-3 space-y-1">
            <p className="text-xl font-semibold text-white">{submission.name}</p>
            <a
              href={`mailto:${submission.email}`}
              className="block text-sm text-[#60a5fa] hover:underline"
            >
              {submission.email}
            </a>
            <a
              href={`tel:${submission.phone.replace(/\s/g, "")}`}
              className="block text-sm text-[#94a3b8] hover:text-white"
            >
              {submission.phone}
            </a>
          </div>
        </section>

        <section className="mt-6">
          <h4 className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
            Submitted on
          </h4>
          <p className="mt-2 text-sm text-white">{datePart}</p>
          <p className="text-sm text-[#94a3b8]">{timePart}</p>
        </section>

        <section className="mt-6">
          <h4 className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
            Message
          </h4>
          <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#e2e8f0]">
              {submission.message}
            </p>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/[0.08] p-4 sm:flex-row sm:flex-wrap">
        {submission.status !== "responded" && submission.status !== "archived" && (
          <button
            type="button"
            onClick={onMarkResponded}
            className="crm-btn-primary flex-1 rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3b82f6] hover:shadow-[0_4px_24px_rgba(37,99,235,0.4)] sm:flex-none sm:px-6"
          >
            Mark as Responded
          </button>
        )}
        {submission.status !== "archived" && (
          <button
            type="button"
            onClick={onArchive}
            className="crm-btn-secondary flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-[#2563eb]/30 sm:flex-none"
          >
            Archive
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:-translate-y-0.5 hover:bg-red-500/20 sm:flex-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
