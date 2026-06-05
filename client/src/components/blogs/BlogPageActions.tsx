type BlogPageActionsProps = {
  onSave: () => void;
  saving?: boolean;
};

export default function BlogPageActions({
  onSave,
  saving = false,
}: BlogPageActionsProps) {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={saving}
      className="blog-btn-primary disabled:opacity-50"
    >
      {saving ? "Saving..." : "Save"}
    </button>
  );
}
