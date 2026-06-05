import type { InquiryDateFilter } from "@/types/contact.types";

type ContactPageToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  dateFilter: InquiryDateFilter;
  onFilterChange: (value: InquiryDateFilter) => void;
  onExport: () => void;
  onRefresh: () => void;
  refreshing?: boolean;
};

export default function ContactPageToolbar({
  search,
  onSearchChange,
  dateFilter,
  onFilterChange,
  onExport,
  onRefresh,
  refreshing = false,
}: ContactPageToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
      <div className="relative w-full sm:max-w-xs">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, ticket..."
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94a3b8]/70 outline-none transition-colors focus:border-white/20 focus:ring-2 focus:ring-white/10"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={dateFilter}
          onChange={(e) => onFilterChange(e.target.value as InquiryDateFilter)}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/20"
          aria-label="Filter inquiries by date"
        >
          <option value="all" className="bg-[#0d082b]">
            All time
          </option>
          <option value="today" className="bg-[#0d082b]">
            Today
          </option>
          <option value="week" className="bg-[#0d082b]">
            Last 7 days
          </option>
        </select>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/15 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            />
          </svg>
          Refresh
        </button>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/15 hover:bg-white/[0.05]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 11.25L12 15.75l4.5-4.5M12 3v12.75" />
          </svg>
          Export
        </button>
      </div>
    </div>
  );
}
