import { Link } from "react-router-dom";
import DataTable, { type TableColumn } from "react-data-table-component";

import BlogTableThumb from "@/components/blogs/BlogTableThumb";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";
import type { BlogPost } from "@/types/blog.types";
import { formatBlogDate } from "@/utils/blog.utils";

const ROW_MIN_HEIGHT = "72px";

const tableCustomStyles = {
  table: { style: { backgroundColor: "transparent" } },
  tableWrapper: {
    style: { display: "block", overflow: "visible" },
  },
  headRow: {
    style: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      minHeight: "44px",
    },
  },
  headCells: {
    style: {
      color: "#8b9cb3",
      fontSize: "10px",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      letterSpacing: "0.08em",
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      minHeight: ROW_MIN_HEIGHT,
      transition: "background-color 0.15s ease",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(37, 99, 235, 0.08)",
      borderBottomColor: "rgba(255, 255, 255, 0.06)",
    },
  },
  cells: {
    style: {
      color: "#e2e8f0",
      fontSize: "14px",
      paddingTop: "12px",
      paddingBottom: "12px",
      minHeight: ROW_MIN_HEIGHT,
    },
  },
  noData: { style: { backgroundColor: "transparent", color: "#94a3b8" } },
};

type BlogPostsTableProps = {
  posts: BlogPost[];
  loading?: boolean;
  onDelete: (id: string) => void;
};

function IconView() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
    </svg>
  );
}

function IconDelete() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function BlogRowActions({
  post,
  onDelete,
}: {
  post: BlogPost;
  onDelete: (id: string) => void;
}) {
  const { confirm } = useAlertDialog();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete blog?",
      description: `"${post.title}" will be permanently removed, including its cover image.`,
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      variant: "destructive",
    });
    if (confirmed) onDelete(post.id);
  };

  return (
    <div
      className="blog-table-actions"
      role="group"
      aria-label={`Actions for ${post.title}`}
    >
      <Link
        to={`/dashboard/blogs/view/${post.id}`}
        title="View blog"
        aria-label={`View ${post.title}`}
        className="blog-table-action-btn no-underline"
      >
        <IconView />
      </Link>
      <Link
        to={`/dashboard/blogs/edit/${post.id}`}
        title="Edit blog"
        aria-label={`Edit ${post.title}`}
        className="blog-table-action-btn no-underline"
      >
        <IconEdit />
      </Link>
      <button
        type="button"
        title="Delete blog"
        aria-label={`Delete ${post.title}`}
        onClick={() => void handleDelete()}
        className="blog-table-action-btn blog-table-action-btn--danger"
      >
        <IconDelete />
      </button>
    </div>
  );
}

export default function BlogPostsTable({
  posts,
  loading = false,
  onDelete,
}: BlogPostsTableProps) {
  const columns: TableColumn<BlogPost>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 7,
      minWidth: "280px",
      cell: (row) => (
        <div className="blog-table-title-cell">
          <BlogTableThumb src={row.coverUrl} title={row.title} />
          <div className="blog-table-title-text">
            <p className="blog-table-title">{row.title}</p>
            <p className="blog-table-slug">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      name: "Updated",
      selector: (row) => row.updatedAt,
      grow: 1.5,
      minWidth: "88px",
      cell: (row) => (
        <span className="blog-table-updated">{formatBlogDate(row.updatedAt)}</span>
      ),
    },
    {
      name: "Actions",
      grow: 1.5,
      minWidth: "200px",
    
      cell: (row) => <BlogRowActions post={row} onDelete={onDelete} />,
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="blog-datatable-scroll">
      <div className="blog-datatable">
        <DataTable
          columns={columns}
          data={posts}
          customStyles={tableCustomStyles}
          progressPending={loading}
          pagination={false}
          highlightOnHover
          responsive={false}
          noDataComponent={
            <p className="py-12 text-center text-sm text-[#94a3b8]">
              No blogs match your search.
            </p>
          }
        />
      </div>
    </div>
  );
}
