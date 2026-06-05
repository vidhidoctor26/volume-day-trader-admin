type ContactTicketBadgeProps = {
  ticketNumber: string;
};

export default function ContactTicketBadge({
  ticketNumber,
}: ContactTicketBadgeProps) {
  return (
    <span className="inline-flex shrink-0 rounded-full bg-tab-active/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-tab-active">
      {ticketNumber}
    </span>
  );
}
