import { useEffect, useMemo, useState } from "react";

import BlogEmptyState from "@/components/blogs/BlogEmptyState";
import BlogPageToolbar from "@/components/blogs/BlogPageToolbar";
import BlogPostsTable from "@/components/blogs/BlogPostsTable";
import BlogStatsCards from "@/components/blogs/BlogStatsCards";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/blog/blogApi";
import { clearStale, markStale } from "@/redux/blog/blogSlice";
import { selectBlogListStale } from "@/redux/blog/blogSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { computeBlogStats } from "@/utils/blog.utils";

const SEARCH_DEBOUNCE_MS = 400;
const PAGE_SIZE = 10;

export default function AllBlogsPage() {
  const dispatch = useAppDispatch();
  const stale = useAppSelector(selectBlogListStale);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [listPage, setListPage] = useState(1);

  const [deleteBlog] = useDeleteBlogMutation();

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedSearch(search);
      setListPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [search]);

  const listParams = useMemo(
    () => ({
      page: listPage,
      limit: PAGE_SIZE,
      search: debouncedSearch || undefined,
      sortBy: "updatedAt" as const,
      sortOrder: "desc" as const,
    }),
    [listPage, debouncedSearch],
  );

  const { data, isLoading, isFetching, error, refetch } =
    useGetBlogsQuery(listParams);

  useEffect(() => {
    if (stale) {
      void refetch();
      dispatch(clearStale());
    }
  }, [stale, refetch, dispatch]);

  const posts = data?.blogs ?? [];
  const total = data?.total ?? 0;
  const page = data?.page ?? 1;
  const hasMore = data?.hasMore ?? false;

  const stats = useMemo(() => computeBlogStats(posts), [posts]);

  const errorMessage =
    error && "data" in error ? String(error.data) : null;

  const statCards = [
    { label: "Total Posts", value: total, icon: "document" as const },
    { label: "This Month", value: stats.thisMonth, icon: "calendar" as const },
  ];

  const handleListMutation = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
      dispatch(markStale());
      void refetch();
    } catch {
      /* RTK surfaces errors on hook if needed */
    }
  };

  const toolbar = (
    <BlogPageToolbar
      search={search}
      onSearchChange={setSearch}
      onRefresh={() => void refetch()}
      refreshing={isFetching}
    />
  );

  if (isLoading && posts.length === 0) {
    return (
      <div className="blog-page-enter space-y-6">
        {toolbar}
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02] text-sm text-[#94a3b8]">
          Loading blogs...
        </div>
      </div>
    );
  }

  if (errorMessage && posts.length === 0) {
    return (
      <div className="blog-page-enter space-y-6">
        {toolbar}
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-sm text-red-300">{errorMessage}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (total === 0 && !debouncedSearch) {
    return (
      <div className="blog-page-enter space-y-6">
        {toolbar}
        <BlogEmptyState />
      </div>
    );
  }

  return (
    <div className="blog-page-enter space-y-6">
      {toolbar}
      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}
      <BlogStatsCards stats={statCards} />
      <div className="blog-glass-card overflow-hidden !transform-none">
        <BlogPostsTable
          posts={posts}
          loading={isFetching}
          onDelete={(id) =>
            void handleListMutation(() => deleteBlog(id).unwrap())
          }
        />
      </div>
      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between text-sm text-[#94a3b8]">
          <span>
            Page {page} · {posts.length} of {total}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={listPage <= 1}
              onClick={() => setListPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-white/[0.08] px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!hasMore}
              onClick={() => setListPage((p) => p + 1)}
              className="rounded-lg border border-white/[0.08] px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
