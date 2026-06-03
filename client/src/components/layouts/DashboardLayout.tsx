import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { DashboardHeaderActionsProvider } from "@/components/dashboard/DashboardHeaderActionsContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getPageMetaFromNav } from "@/constants/dashboard.nav";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { title, subtitle } = getPageMetaFromNav(pathname);

  return (
    <div className="flex min-h-svh min-h-dvh bg-page-bg">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeaderActionsProvider>
          <DashboardHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </DashboardHeaderActionsProvider>
      </div>
    </div>
  );
}
