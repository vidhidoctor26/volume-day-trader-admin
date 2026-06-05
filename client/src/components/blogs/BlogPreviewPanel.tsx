import BlogPostMeta from "@/components/blogs/BlogPostMeta";
import { RichTextEditor } from "@/components/editor";

type BlogPreviewPanelProps = {
  hasPreview: boolean;
  title: string;
  slug?: string;
  createdDate: string;
  updatedDate?: string;
  coverUrl: string;
  contentHtml: string;
  onContentChange: (html: string) => void;
  contentKey?: string | number;
  isSaving?: boolean;
  saveLabel?: string;
  saveVariant?: "primary" | "publish";
  secondaryLabel?: string;
  secondaryVariant?: "secondary" | "draft" | "archive";
  onSecondaryAction?: () => void;
  secondaryDisabled?: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onSave: () => void;
};

function IconCopy() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25a9.06 9.06 0 00-1.5-.124m-4.5 7.5h3.375c.621 0 1.125-.504 1.125-1.125v-9.75a1.125 1.125 0 00-1.125-1.125h-9.75a1.125 1.125 0 011.125-1.125v9.75c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

export default function BlogPreviewPanel({
  hasPreview,
  title,
  slug,
  createdDate,
  updatedDate,
  coverUrl,
  contentHtml,
  onContentChange,
  contentKey,
  isSaving = false,
  saveLabel = "Save",
  saveVariant = "primary",
  secondaryLabel,
  secondaryVariant = "secondary",
  onSecondaryAction,
  secondaryDisabled = false,
  onCopy,
  onRegenerate,
  onSave,
}: BlogPreviewPanelProps) {
  const saveButtonClass =
    saveVariant === "publish" ? "blog-btn-publish" : "blog-btn-primary";
  const secondaryButtonClass =
    secondaryVariant === "archive"
      ? "blog-btn-archive"
      : secondaryVariant === "draft"
        ? "blog-btn-draft"
        : "blog-btn-secondary";
  return (
    <div className="blog-glass-card flex min-h-[480px] flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 sm:p-8">
        {hasPreview ? (
          <div className="space-y-4">
            <BlogPostMeta
              title={title}
              slug={slug}
              createdDate={createdDate}
              updatedDate={updatedDate}
              coverUrl={coverUrl}
            />
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Content
              </p>
              <RichTextEditor
                value={contentHtml}
                onChange={onContentChange}
                contentKey={contentKey}
                placeholder="Edit blog content…"
                minHeight="360px"
              />
            </div>
          </div>
        ) : (
          <div className="blog-preview-fade flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-tab-active/30 bg-tab-active/10 shadow-[0_0_40px_rgb(237_31_36/0.15)]">
              <svg className="h-10 w-10 text-tab-active" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Your blog editor will appear here
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[#94a3b8]">
              Generate a blog, then edit and save your content.
            </p>
          </div>
        )}
      </div>

      {hasPreview && (
        <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.08] bg-white/[0.02] p-4 sm:gap-3">
          <button
            type="button"
            onClick={onCopy}
            className="blog-icon-btn"
            title="Copy HTML"
            aria-label="Copy HTML"
          >
            <IconCopy />
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="blog-icon-btn"
            title="Regenerate"
            aria-label="Regenerate"
          >
            <IconRefresh />
          </button>
          <div className="flex-1" />
          {onSecondaryAction && secondaryLabel && (
            <button
              type="button"
              onClick={onSecondaryAction}
              disabled={isSaving || secondaryDisabled}
              className={`${secondaryButtonClass} disabled:opacity-50`}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className={`${saveButtonClass} disabled:opacity-50`}
          >
            {isSaving ? "Saving..." : saveLabel}
          </button>
        </div>
      )}
    </div>
  );
}
