import { useCallback, useEffect, useMemo, useState } from "react";

import { ApiError } from "@/api/http.client";
import PageHeader from "@/components/dashboard/PageHeader";
import ContactDetailsPanel from "@/components/contacts/ContactDetailsPanel";
import ContactEmptyState from "@/components/contacts/ContactEmptyState";
import ContactInquiryList from "@/components/contacts/ContactInquiryList";
import ContactPageToolbar from "@/components/contacts/ContactPageToolbar";
import ContactStatsCards from "@/components/contacts/ContactStatsCards";
import { inquiryService } from "@/services/inquiry.service";
import type { ContactSubmission, InquiryDateFilter } from "@/types/contact.types";
import {
  computeContactStats,
  filterSubmissions,
} from "@/utils/contact.utils";

const INQUIRY_POLL_INTERVAL_MS = 30_000;

type LoadOptions = {
  silent?: boolean;
};

export default function ContactSubmissionsPage() {
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<InquiryDateFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const loadInquiries = useCallback(async (options: LoadOptions = {}) => {
    const { silent = false } = options;

    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError(null);
    }

    try {
      const data = await inquiryService.listInquiries();
      setInquiries(data);
      setError(null);
      setSelectedId((current) => {
        if (current && data.some((item) => item.id === current)) {
          return current;
        }
        return data[0]?.id ?? null;
      });
    } catch (err) {
      if (!silent) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Failed to load inquiries";
        setError(message);
        setInquiries([]);
        setSelectedId(null);
      }
    } finally {
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadInquiries();
  }, [loadInquiries]);

  useEffect(() => {
    const poll = () => {
      if (document.visibilityState === "visible") {
        void loadInquiries({ silent: true });
      }
    };

    const intervalId = window.setInterval(poll, INQUIRY_POLL_INTERVAL_MS);
    const onFocus = () => void loadInquiries({ silent: true });

    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, [loadInquiries]);

  const filtered = useMemo(
    () => filterSubmissions(inquiries, search, dateFilter),
    [inquiries, search, dateFilter],
  );

  const stats = useMemo(() => computeContactStats(inquiries), [inquiries]);

  const selected =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  const statCards = [
    { label: "Total Inquiries", value: stats.total, icon: "inbox" as const },
    { label: "Today's Requests", value: stats.today, icon: "calendar" as const },
    { label: "Last 7 Days", value: stats.thisWeek, icon: "mail" as const },
    { label: "With Phone", value: stats.withPhone, icon: "check" as const },
  ];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileDrawerOpen(true);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-inquiries.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const pageHeader = (
    <PageHeader
      title="Contact Inquiries"
      description="Review and manage user inquiries."
    />
  );

  const toolbar = (
    <ContactPageToolbar
      search={search}
      onSearchChange={setSearch}
      dateFilter={dateFilter}
      onFilterChange={setDateFilter}
      onExport={handleExport}
      onRefresh={() => void loadInquiries()}
      refreshing={loading || refreshing}
    />
  );

  if (loading && inquiries.length === 0) {
    return (
      <div className="space-y-6">
        {pageHeader}
        {toolbar}
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
            <svg
              className="h-5 w-5 animate-spin text-tab-active"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading inquiries...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {pageHeader}
        {toolbar}
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => void loadInquiries()}
            className="mt-4 rounded-xl bg-tab-active px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tab-active-hover"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="space-y-6">
        {pageHeader}
        {toolbar}
        <ContactEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pageHeader}
      {toolbar}

      <ContactStatsCards stats={statCards} />

      <div className="grid min-h-[520px] gap-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_0_40px_rgb(237_31_36/0.06)] backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="max-h-[70vh] border-b border-white/[0.08] lg:max-h-[calc(100vh-16rem)] lg:border-b-0 lg:border-r">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#94a3b8]">
              No inquiries match your search or filter.
            </p>
          ) : (
            <ContactInquiryList
              submissions={filtered}
              selectedId={selected?.id ?? null}
              onSelect={handleSelect}
            />
          )}
        </div>

        <div className="hidden min-h-[400px] lg:block">
          {selected ? (
            <ContactDetailsPanel submission={selected} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-sm text-[#94a3b8]">
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>

      {mobileDrawerOpen && selected && (
        <>
          <button
            type="button"
            aria-label="Close details"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="contact-drawer-enter fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/[0.08] bg-[#050505] shadow-[-8px_0_40px_rgba(0,0,0,0.5)] lg:hidden">
            <ContactDetailsPanel
              submission={selected}
              onClose={() => setMobileDrawerOpen(false)}
              showClose
            />
          </div>
        </>
      )}
    </div>
  );
}
