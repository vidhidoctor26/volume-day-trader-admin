type ContactTicketBadgeProps = {
  ticketNumber: string;
};

export default function ContactTicketBadge({
  ticketNumber,
}: ContactTicketBadgeProps) {
  return (
    <span className="inline-flex shrink-0 rounded-full bg-[#2563eb]/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#60a5fa]">
      {ticketNumber}
    </span>
  );
}
