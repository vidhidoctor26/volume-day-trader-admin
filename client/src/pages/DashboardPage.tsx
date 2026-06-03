const STATS = [
  { label: "Active Traders", value: "2,450", change: "+12%" },
  { label: "Subscriptions", value: "1,128", change: "+8%" },
  { label: "Revenue (MTD)", value: "$84.2k", change: "+24%" },
  { label: "Support Tickets", value: "37", change: "-5%" },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-card-border bg-card-bg p-5 shadow-[var(--shadow-card-inset)]"
          >
            <p className="text-sm text-secondary-text">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-tab-active">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-[var(--shadow-card-inset)] lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Platform activity</h2>
          <p className="mt-2 text-sm text-secondary-text">
            Recent sign-ins, subscription changes, and indicator usage will appear
            here once connected to your API.
          </p>
          <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-btn-border bg-[#050024]/50 text-sm text-muted-text">
            Chart placeholder
          </div>
        </section>

        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-[var(--shadow-card-inset)]">
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <ul className="mt-4 space-y-2">
            {[
              "Review new users",
              "Export analytics",
              "Manage subscriptions",
              "Platform settings",
            ].map((action) => (
              <li key={action}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-btn-border px-4 py-3 text-left text-sm text-feature-text transition-colors hover:border-tab-active/40 hover:text-white"
                >
                  {action}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
