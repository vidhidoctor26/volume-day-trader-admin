import { Link } from "react-router-dom";

export default function BlogEmptyState() {
  return (
    <div className="blog-page-enter blog-glass-card flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2563eb]/30 bg-[#2563eb]/10">
        <svg
          className="h-8 w-8 text-[#3b82f6]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18.75a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V7.125c0-.621.504-1.125 1.125-1.125H9.75v-4.875A2.25 2.25 0 0112 3.75z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-white">No blog posts yet</h2>
      <p className="mt-2 max-w-md text-sm text-[#94a3b8]">
        Start sharing content for your traders. Create your first blog post to
        see it listed here.
      </p>
      <Link
        to="/dashboard/blogs/create"
        className="blog-btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold no-underline"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create Blog
      </Link>
    </div>
  );
}
