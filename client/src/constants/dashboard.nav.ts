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
    label: "Contact Inquiries",
    path: "/dashboard/contacts",
    icon: "inbox",
    subtitle:
      "Manage and review incoming contact requests from website visitors.",
  },
  {
    type: "group",
    label: "Content Management",
    icon: "content",
    sectionLabel: "Blogs",
    children: [
      {
        label: "All Blogs",
        path: "/dashboard/blogs",
        icon: "document",
        subtitle: "View and manage all blog posts.",
      },
      {
        label: "Create Blog",
        path: "/dashboard/blogs/create",
        icon: "plus",
        subtitle: "Generate AI content and create a blog via the API.",
      },
    ],
  },
];

