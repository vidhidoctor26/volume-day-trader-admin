export default function ContactEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#2563eb]/20 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <svg
            className="h-12 w-12 text-[#2563eb]/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.25}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-semibold text-white">
        No contact submissions yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-[#94a3b8]">
        New inquiries from the website will appear here.
      </p>
    </div>
  );
}
