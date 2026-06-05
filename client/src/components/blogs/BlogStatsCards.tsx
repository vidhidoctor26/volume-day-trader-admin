type StatItem = {
  label: string;
  value: number;
  icon: "document" | "check" | "draft" | "calendar";
};

type BlogStatsCardsProps = {
  stats: StatItem[];
};

function StatIcon({ icon }: { icon: StatItem["icon"] }) {
  const className = "h-5 w-5 text-[#2563eb]";
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "check":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "draft":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M4.5 8.25h15M4.5 19.5h15a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      );
  }
}

export default function BlogStatsCards({ stats }: BlogStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(37,99,235,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563eb]/40 hover:shadow-[0_8px_32px_rgba(37,99,235,0.15)]"
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
