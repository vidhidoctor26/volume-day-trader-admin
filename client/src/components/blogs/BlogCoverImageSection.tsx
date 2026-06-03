type BlogCoverImageSectionProps = {
  coverUrl: string | null;
  onUpload: () => void;
  onGenerateAi: () => void;
  onChange: () => void;
};

export default function BlogCoverImageSection({
  coverUrl,
  onUpload,
  onGenerateAi,
  onChange,
}: BlogCoverImageSectionProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-[#94a3b8]">
        Cover image
      </label>

      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        {coverUrl ? (
          <>
            <img
              src={coverUrl}
              alt="Blog cover preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={onChange}
                className="blog-btn-secondary"
              >
                Change Image
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#2563eb]/10">
              <svg className="h-7 w-7 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
            <p className="text-sm text-[#94a3b8]">No cover image selected</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={onUpload} className="blog-btn-secondary flex-1">
          Upload Image
        </button>
        <button type="button" onClick={onGenerateAi} className="blog-btn-outline flex-1">
          Generate AI Image
        </button>
      </div>
    </div>
  );
}
