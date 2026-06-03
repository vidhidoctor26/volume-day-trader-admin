type BlogPageActionsProps = {
  onSaveDraft: () => void;
  onPublish: () => void;
};

export default function BlogPageActions({
  onSaveDraft,
  onPublish,
}: BlogPageActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <button type="button" onClick={onSaveDraft} className="blog-btn-secondary">
        Save Draft
      </button>
      <button type="button" onClick={onPublish} className="blog-btn-primary">
        Publish
      </button>
    </div>
  );
}
