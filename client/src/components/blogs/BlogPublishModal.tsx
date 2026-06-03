type BlogPublishModalProps = {
  open: boolean;
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  onSeoTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onUrlSlugChange: (v: string) => void;
  onClose: () => void;
  onPublish: () => void;
};

export default function BlogPublishModal({
  open,
  seoTitle,
  metaDescription,
  urlSlug,
  onSeoTitleChange,
  onMetaDescriptionChange,
  onUrlSlugChange,
  onClose,
  onPublish,
}: BlogPublishModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="blog-page-enter relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-[#0f1117] p-6 shadow-[0_0_60px_rgba(37,99,235,0.2)] sm:p-8">
        <h2 className="text-xl font-semibold text-white">Publish blog</h2>
        <p className="mt-1 text-sm text-[#94a3b8]">
          Optimize SEO settings before publishing.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94a3b8]">
              SEO Title
            </label>
            <input
              value={seoTitle}
              onChange={(e) => onSeoTitleChange(e.target.value)}
              className="blog-input w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#94a3b8]">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              rows={3}
              className="blog-input w-full resize-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#94a3b8]">
              URL Slug
            </label>
            <input
              value={urlSlug}
              onChange={(e) => onUrlSlugChange(e.target.value)}
              className="blog-input w-full"
            />
            <p className="mt-2 break-all text-xs text-[#60a5fa]">
              https://volumedaytrader.com/blog/{urlSlug || "your-slug"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="blog-btn-secondary px-6">
            Cancel
          </button>
          <button type="button" onClick={onPublish} className="blog-btn-primary px-6">
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
}
