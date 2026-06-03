export type NavIconName =
  | "grid"
  | "inbox"
  | "content"
  | "document"
  | "plus"
  | "users"
  | "subscription"
  | "chart"
  | "settings";

export type NavLinkConfig = {
  label: string;
  path: string;
  icon: NavIconName;
  subtitle?: string;
};

export type NavGroupConfig = {
  label: string;
  icon: NavIconName;
  sectionLabel?: string;
  sectionBadge?: string;
  children: NavLinkConfig[];
};

export type DashboardNavEntry =
  | ({ type: "link" } & NavLinkConfig)
  | ({ type: "group" } & NavGroupConfig);

export const DASHBOARD_NAV: DashboardNavEntry[] = [
  {
    type: "link",
    label: "Dashboard",
    path: "/dashboard",
    icon: "grid",
    subtitle: "Overview of your admin platform",
  },
  {
    type: "link",
    label: "Contact Submissions",
    path: "/dashboard/contacts",
    icon: "inbox",
    subtitle:
      "Manage and review incoming contact requests from website visitors.",
  },
  {
    type: "group",
    label: "Content In",
    icon: "content",
    sectionLabel: "Blogs",
    sectionBadge: "12 Drafts",
    children: [
      {
        label: "All Blogs",
        path: "/dashboard/blogs",
        icon: "document",
        subtitle: "View and manage all published and draft blog posts.",
      },
      {
        label: "Create Blog",
        path: "/dashboard/blogs/create",
        icon: "plus",
        subtitle: "Generate and publish SEO-optimized blog content.",
      },
    ],
  },
];

export function getPageMetaFromNav(pathname: string) {
  for (const entry of DASHBOARD_NAV) {
    if (entry.type === "link") {
      if (
        pathname === entry.path ||
        (entry.path !== "/dashboard" && pathname.startsWith(entry.path))
      ) {
        return { title: entry.label, subtitle: entry.subtitle };
      }
    } else {
      const children = [...entry.children].sort(
        (a, b) => b.path.length - a.path.length,
      );
      for (const child of children) {
        if (pathname === child.path || pathname.startsWith(`${child.path}/`)) {
          return { title: child.label, subtitle: child.subtitle };
        }
      }
    }
  }

  return {
    title: "Dashboard",
    subtitle: "Overview of your admin platform",
  };
}
