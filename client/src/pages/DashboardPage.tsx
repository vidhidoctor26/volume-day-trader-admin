import PageHeader from "@/components/dashboard/PageHeader";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { inquiryService } from "@/services/inquiry.service";
import type { ContactSubmission } from "@/types/contact.types";
import { computeContactStats, formatSubmittedDate } from "@/utils/contact.utils";
import {
  useGetBlogsQuery,
  useGetBlogStatsQuery,
} from "@/redux/blog/blogApi";

type MetricCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-card-border bg-card-bg p-5 shadow-[var(--shadow-card-inset)]">
      <p className="text-sm text-secondary-text">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs font-medium text-tab-active">{hint}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const { data: blogStats } = useGetBlogStatsQuery();

  const { data: recentBlogs, isFetching: loadingBlogs } = useGetBlogsQuery({
    page: 1,
    limit: 5,
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoadingInquiries(true);
    setInquiryError(null);
    inquiryService
      .listInquiries()
      .then((res) => {
        if (!alive) return;
        setInquiries(res);
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setInquiryError(e instanceof Error ? e.message : "Failed to load inquiries");
      })
      .finally(() => {
        if (!alive) return;
        setLoadingInquiries(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const contactStats = useMemo(() => computeContactStats(inquiries), [inquiries]);

  const recentInquiries = useMemo(() => {
    return [...inquiries]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [inquiries]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your admin platform"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Blogs"
          value={blogStats?.total ?? "—"}
          hint="Across all statuses"
        />
        <MetricCard label="Draft Blogs" value={blogStats?.draft ?? "—"} />
        <MetricCard label="Published Blogs" value={blogStats?.published ?? "—"} />
        <MetricCard label="Archived Blogs" value={blogStats?.archived ?? "—"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-[var(--shadow-card-inset)] lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent blogs</h2>
              <p className="mt-1 text-sm text-secondary-text">
                Latest updates from your content pipeline.
              </p>
            </div>
            <Link
              to="/dashboard/blogs"
              className="rounded-full border border-btn-border px-4 py-2 text-sm font-medium text-secondary-text no-underline transition-colors hover:border-tab-active/50 hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
            {loadingBlogs ? (
              <div className="flex h-40 items-center justify-center bg-white/[0.02] text-sm text-[#94a3b8]">
                Loading blogs…
              </div>
            ) : recentBlogs?.blogs?.length ? (
              <ul className="divide-y divide-white/[0.06]">
                {recentBlogs.blogs.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-4 bg-white/[0.02] px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {b.title}
                      </p>
                      <p className="truncate text-xs text-secondary-text">
                        /{b.slug}
                      </p>
                    </div>
                    <Link
                      to={`/dashboard/blogs/view/${b.id}`}
                      className="shrink-0 rounded-full border border-btn-border px-3 py-1.5 text-xs font-medium text-secondary-text no-underline transition-colors hover:border-tab-active/50 hover:text-white"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-40 items-center justify-center bg-white/[0.02] text-sm text-[#94a3b8]">
                No blogs yet.
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-[var(--shadow-card-inset)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Contact inquiries</h2>
                <p className="mt-1 text-sm text-secondary-text">
                  New requests and follow-ups.
                </p>
              </div>
              <Link
                to="/dashboard/contacts"
                className="rounded-full border border-btn-border px-4 py-2 text-sm font-medium text-secondary-text no-underline transition-colors hover:border-tab-active/50 hover:text-white"
              >
                Open
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MetricCard label="Total" value={contactStats.total} />
              <MetricCard label="Today" value={contactStats.today} />
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08]">
              {loadingInquiries ? (
                <div className="flex h-40 items-center justify-center bg-white/[0.02] text-sm text-[#94a3b8]">
                  Loading inquiries…
                </div>
              ) : inquiryError ? (
                <div className="bg-red-500/5 p-4 text-sm text-red-300">
                  {inquiryError}
                </div>
              ) : recentInquiries.length ? (
                <ul className="divide-y divide-white/[0.06]">
                  {recentInquiries.map((i) => (
                    <li key={i.id} className="bg-white/[0.02] px-4 py-3">
                      <p className="truncate text-sm font-semibold text-white">
                        {i.firstName} {i.lastName}
                      </p>
                      <div className="mt-0.5 flex items-center justify-between gap-3">
                        <p className="truncate text-xs text-secondary-text">
                          {i.email}
                        </p>
                        <span className="shrink-0 text-xs text-[#94a3b8]">
                          {formatSubmittedDate(i.createdAt)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-40 items-center justify-center bg-white/[0.02] text-sm text-[#94a3b8]">
                  No inquiries yet.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-[var(--shadow-card-inset)]">
            <div>
              <h2 className="text-lg font-semibold text-white">Quick actions</h2>
              <p className="mt-1 text-sm text-secondary-text">
                Jump to common admin tasks.
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              <li>
                <Link
                  to="/dashboard/blogs/create"
                  className="block w-full rounded-xl border btn-outline px-4 py-3 text-left text-sm font-medium text-feature-text no-underline transition-colors hover:border-tab-active/40 hover:text-white"
                >
                  Create a blog
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/blogs"
                  className="block w-full rounded-xl border btn-outline px-4 py-3 text-left text-sm font-medium text-feature-text no-underline transition-colors hover:border-tab-active/40 hover:text-white"
                >
                  Manage blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/contacts"
                  className="block w-full rounded-xl border btn-outline px-4 py-3 text-left text-sm font-medium text-feature-text no-underline transition-colors hover:border-tab-active/40 hover:text-white"
                >
                  Review inquiries
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
