import { useMemo, useState } from "react";

import ContactDetailsPanel from "@/components/contacts/ContactDetailsPanel";
import ContactEmptyState from "@/components/contacts/ContactEmptyState";
import ContactInquiryList from "@/components/contacts/ContactInquiryList";
import ContactPageToolbar from "@/components/contacts/ContactPageToolbar";
import ContactStatsCards from "@/components/contacts/ContactStatsCards";
import { MOCK_CONTACT_SUBMISSIONS } from "@/data/mockContactSubmissions";
import type { ContactSubmission } from "@/types/contact.types";
import {
  computeContactStats,
  filterSubmissions,
} from "@/utils/contact.utils";

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(
    MOCK_CONTACT_SUBMISSIONS,
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "unread" | "responded"
  >("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    MOCK_CONTACT_SUBMISSIONS[0]?.id ?? null,
  );
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const filtered = useMemo(
    () => filterSubmissions(submissions, search, statusFilter),
    [submissions, search, statusFilter],
  );

  const stats = useMemo(() => computeContactStats(submissions), [submissions]);

  const selected = filtered.find((s) => s.id === selectedId) ?? filtered[0] ?? null;

  const statCards = [
    { label: "Total Inquiries", value: stats.total, icon: "inbox" as const },
    { label: "Unread", value: stats.unread, icon: "mail" as const },
    { label: "Responded", value: stats.responded, icon: "check" as const },
    { label: "Today's Requests", value: stats.today, icon: "calendar" as const },
  ];

  const updateSubmission = (id: string, patch: Partial<ContactSubmission>) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  };

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
    a.download = "contact-submissions.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMarkResponded = () => {
    if (!selected) return;
    updateSubmission(selected.id, { status: "responded" });
  };

  const handleArchive = () => {
    if (!selected) return;
    updateSubmission(selected.id, { status: "archived" });
    const next = filtered.find((s) => s.id !== selected.id);
    setSelectedId(next?.id ?? null);
    setMobileDrawerOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    const remaining = submissions.filter((s) => s.id !== selected.id);
    setSubmissions(remaining);
    const nextFiltered = filterSubmissions(remaining, search, statusFilter);
    setSelectedId(nextFiltered[0]?.id ?? null);
    setMobileDrawerOpen(false);
  };

  if (submissions.filter((s) => s.status !== "archived").length === 0 && !search) {
    return (
      <div className="space-y-6">
        <ContactPageToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onExport={handleExport}
        />
        <ContactEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContactPageToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        onExport={handleExport}
      />

      <ContactStatsCards stats={statCards} />

      <div className="grid min-h-[520px] gap-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_0_40px_rgba(37,99,235,0.06)] backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="max-h-[70vh] border-b border-white/[0.08] lg:max-h-[calc(100vh-16rem)] lg:border-b-0 lg:border-r">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#94a3b8]">
              No submissions match your search or filter.
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
            <ContactDetailsPanel
              submission={selected}
              onMarkResponded={handleMarkResponded}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
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
              onMarkResponded={handleMarkResponded}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onClose={() => setMobileDrawerOpen(false)}
              showClose
            />
          </div>
        </>
      )}
    </div>
  );
}
