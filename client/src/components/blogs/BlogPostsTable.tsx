import { Link } from "react-router-dom";
import DataTable, { type TableColumn } from "react-data-table-component";

import BlogStatusBadge from "@/components/blogs/BlogStatusBadge";
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
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      borderBottomColor: "rgba(255, 255, 255, 0.06)",
      outline: "none",
      boxShadow: "none",
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
  onPublish: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
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

function IconPublish() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

function IconArchive() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function IconRestore() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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
  onPublish,
  onArchive,
  onRestore,
}: {
  post: BlogPost;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
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

  const baseBtn = "blog-table-action-btn";
  const standardBtn = `${baseBtn} blog-table-action-btn--standard`;

  return (
    <div
      className="blog-table-actions"
      role="group"
      aria-label={`Actions for ${post.title}`}
    >
      {post.status === "draft" && (
        <>
          <Link
            to={`/dashboard/blogs/edit/${post.id}`}
            title="Edit blog"
            aria-label={`Edit ${post.title}`}
            className={`${standardBtn} no-underline`}
          >
            <IconEdit />
          </Link>
          <button
            type="button"
            title="Publish blog"
            aria-label={`Publish ${post.title}`}
            onClick={() => onPublish(post.id)}
            className={`${baseBtn} blog-table-action-btn--publish`}
          >
            <IconPublish />
          </button>
          <button
            type="button"
            title="Delete blog"
            aria-label={`Delete ${post.title}`}
            onClick={() => void handleDelete()}
            className={`${baseBtn} blog-table-action-btn--danger`}
          >
            <IconDelete />
          </button>
        </>
      )}

      {post.status === "published" && (
        <>
          <Link
            to={`/dashboard/blogs/view/${post.id}`}
            title="View blog"
            aria-label={`View ${post.title}`}
            className={`${standardBtn} no-underline`}
          >
            <IconView />
          </Link>
          <Link
            to={`/dashboard/blogs/edit/${post.id}`}
            title="Edit blog"
            aria-label={`Edit ${post.title}`}
            className={`${standardBtn} no-underline`}
          >
            <IconEdit />
          </Link>
          <button
            type="button"
            title="Archive blog"
            aria-label={`Archive ${post.title}`}
            onClick={() => onArchive(post.id)}
            className={`${baseBtn} blog-table-action-btn--archive`}
          >
            <IconArchive />
          </button>
        </>
      )}

      {post.status === "archived" && (
        <>
          <Link
            to={`/dashboard/blogs/view/${post.id}`}
            title="View blog"
            aria-label={`View ${post.title}`}
            className={`${standardBtn} no-underline`}
          >
            <IconView />
          </Link>
          <button
            type="button"
            title="Restore blog"
            aria-label={`Restore ${post.title}`}
            onClick={() => onRestore(post.id)}
            className={`${baseBtn} blog-table-action-btn--restore`}
          >
            <IconRestore />
          </button>
          <button
            type="button"
            title="Delete blog"
            aria-label={`Delete ${post.title}`}
            onClick={() => void handleDelete()}
            className={`${baseBtn} blog-table-action-btn--danger`}
          >
            <IconDelete />
          </button>
        </>
      )}
    </div>
  );
}

export default function BlogPostsTable({
  posts,
  loading = false,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}: BlogPostsTableProps) {
  const columns: TableColumn<BlogPost>[] = [
    {
      name: "Cover",
      grow: 0,
      width: "72px",
      minWidth: "72px",
      cell: (row) => (
        <BlogTableThumb src={row.coverUrl} title={row.title} />
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 4,
      minWidth: "170px",
      cell: (row) => (
        <div className="blog-table-title-text">
          <p className="blog-table-title">{row.title}</p>
          <p className="blog-table-slug">{row.slug}</p>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      grow: 1.2,
      minWidth: "110px",
      center: true,
      cell: (row) => <BlogStatusBadge status={row.status} />,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      grow: 1.2,
      minWidth: "100px",
      cell: (row) => (
        <span className="blog-table-date">{formatBlogDate(row.createdAt)}</span>
      ),
    },
    {
      name: "Updated At",
      selector: (row) => row.updatedAt,
      grow: 1.2,
      minWidth: "100px",
      cell: (row) => (
        <span className="blog-table-date">{formatBlogDate(row.updatedAt)}</span>
      ),
    },
    {
      name: "Actions",
      grow: 1.8,
      minWidth: "148px",
 
      cell: (row) => (
        <BlogRowActions
          post={row}
          onDelete={onDelete}
          onPublish={onPublish}
          onArchive={onArchive}
          onRestore={onRestore}
        />
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="blog-datatable-scroll">
      <div className="blog-datatable blog-datatable--lifecycle">
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
              No blogs match your search or filter.
            </p>
          }
        />
      </div>
    </div>
  );
}
