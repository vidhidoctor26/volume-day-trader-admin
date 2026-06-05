import type { BlogStatus } from "@/types/blog.types";
import { BLOG_STATUS_LABELS } from "@/utils/blogStatus.utils";
import { cn } from "@/lib/utils";

export type BlogStatusFilterValue = "all" | BlogStatus;

type BlogStatusFilterProps = {
  value: BlogStatusFilterValue;
  onChange: (value: BlogStatusFilterValue) => void;
  counts: {
    all: number;
    draft: number;
    published: number;
    archived: number;
  };
};

const FILTERS: { value: BlogStatusFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: BLOG_STATUS_LABELS.draft },
  { value: "published", label: BLOG_STATUS_LABELS.published },
  { value: "archived", label: BLOG_STATUS_LABELS.archived },
];

export default function BlogStatusFilter({
  value,
  onChange,
  counts,
}: BlogStatusFilterProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Filter blogs by status"
    >
      {FILTERS.map((filter) => {
        const isActive = value === filter.value;
        const count = counts[filter.value];

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.value)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
              isActive
                ? "border-tab-active/40 bg-tab-active text-white shadow-[0_0_12px_rgb(237_31_36/0.25)]"
                : "border-white/[0.08] bg-white/[0.03] text-[#94a3b8] hover:border-white/[0.14] hover:text-white",
            )}
          >
            {filter.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-white/[0.06] text-[#94a3b8]",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
