type StatItem = {
  label: string;
  value: number;
  icon: "inbox" | "mail" | "check" | "calendar";
};

type ContactStatsCardsProps = {
  stats: StatItem[];
};

function StatIcon({ icon }: { icon: StatItem["icon"] }) {
  const className = "h-5 w-5 text-[#94a3b8]";
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "mail":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906c0 .984-.84 1.75-1.823 1.75H4.073c-.984 0-1.823-.766-1.823-1.75V9m16.5 0V6.75A2.25 2.25 0 0018 4.5H6A2.25 2.25 0 003.75 6.75V9m16.5 0v1.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 10.5V9" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M4.5 8.25h15M4.5 19.5h15a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      );
  }
}

export default function ContactStatsCards({ stats }: ContactStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <div className="absolute right-4 top-4 opacity-60 transition-opacity group-hover:opacity-100">
            <StatIcon icon={stat.icon} />
          </div>
          <p className="text-sm text-[#94a3b8]">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
