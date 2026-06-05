type ContactTicketBadgeProps = {
  ticketNumber: string;
};

export default function ContactTicketBadge({
  ticketNumber,
}: ContactTicketBadgeProps) {
  return (
    <span className="inline-flex shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-[#94a3b8]">
      {ticketNumber}
    </span>
  );
}
