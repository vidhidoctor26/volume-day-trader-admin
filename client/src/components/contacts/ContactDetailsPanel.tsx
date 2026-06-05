import type { ContactSubmission } from "@/types/contact.types";
import {
  formatSubmittedDateTime,
  getInquiryName,
} from "@/utils/contact.utils";

import ContactTicketBadge from "./ContactTicketBadge";

type ContactDetailsPanelProps = {
  submission: ContactSubmission;
  onClose?: () => void;
  showClose?: boolean;
};

export default function ContactDetailsPanel({
  submission,
  onClose,
  showClose = false,
}: ContactDetailsPanelProps) {
  const [datePart, timePart] = formatSubmittedDateTime(
    submission.createdAt,
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
          <ContactTicketBadge ticketNumber={submission.ticketNumber} />
        </div>

        <section className="mt-6">
          <h4 className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
            Contact information
          </h4>
          <div className="mt-3 space-y-1">
            <p className="text-xl font-semibold text-white">
              {getInquiryName(submission)}
            </p>
            <a
              href={`mailto:${submission.email}`}
              className="block text-sm text-[#94a3b8] transition-colors hover:text-white hover:underline"
            >
              {submission.email}
            </a>
            {submission.phone ? (
              <a
                href={`tel:${submission.phone.replace(/\s/g, "")}`}
                className="block text-sm text-[#94a3b8] hover:text-white"
              >
                {submission.phone}
              </a>
            ) : (
              <p className="text-sm text-[#64748b]">No phone provided</p>
            )}
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

      <div className="border-t border-white/[0.08] p-4">
        <a
          href={`mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.ticketNumber)}`}
          className="inline-flex w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:w-auto"
        >
          Reply via Email
        </a>
      </div>
    </div>
  );
}
