import BlogCoverImageSection from "./BlogCoverImageSection";

const WORD_COUNTS = ["500", "1000", "1500", "2000", "3000"] as const;

type BlogConfigPanelProps = {
  title: string;
  onTitleChange: (v: string) => void;
  slug: string;
  onSlugChange: (v: string) => void;
  regeneratePrompt: string;
  onRegeneratePromptChange: (v: string) => void;
  wordCount: string;
  onWordCountChange: (v: string) => void;
  aiSettingsOpen: boolean;
  onToggleAiSettings: () => void;
  coverUrl: string | null;
  isGenerating: boolean;
  isGeneratingCover?: boolean;
  isUploadingCover?: boolean;
  coverUploadError?: string | null;
  onRegenerateContent: () => void;
  onUploadCover: (file: File) => void;
  onGenerateCover: () => void;
  onChangeCover: () => void;
};

export default function BlogConfigPanel({
  title,
  onTitleChange,
  slug,
  onSlugChange,
  regeneratePrompt,
  onRegeneratePromptChange,
  wordCount,
  onWordCountChange,
  aiSettingsOpen,
  onToggleAiSettings,
  coverUrl,
  isGenerating,
  isGeneratingCover = false,
  isUploadingCover = false,
  coverUploadError = null,
  onRegenerateContent,
  onUploadCover,
  onGenerateCover,
  onChangeCover,
}: BlogConfigPanelProps) {
  return (
    <div className="blog-glass-card sticky top-4 space-y-6 p-5 sm:p-6 lg:top-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="blog-title"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]"
          >
            Title
          </label>
          <input
            id="blog-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="blog-input w-full"
            placeholder="Blog title"
          />
        </div>
        <div>
          <label
            htmlFor="blog-slug"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]"
          >
            URL slug
          </label>
          <input
            id="blog-slug"
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            className="blog-input w-full font-mono text-sm"
            placeholder="my-blog-post"
          />
        </div>
      </div>

      <BlogCoverImageSection
        coverUrl={coverUrl}
        isGenerating={isGeneratingCover}
        isUploading={isUploadingCover}
        uploadError={coverUploadError}
        onUpload={onUploadCover}
        onGenerateAi={onGenerateCover}
        onChange={onChangeCover}
      />

      <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
        <button
          type="button"
          onClick={onToggleAiSettings}
          className="flex w-full items-center justify-between bg-white/[0.02] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
        >
          <span>Regenerate content (AI)</span>
          <svg
            className={`h-4 w-4 text-[#94a3b8] transition-transform ${aiSettingsOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {aiSettingsOpen && (
          <div className="space-y-4 border-t border-white/[0.08] p-4">
            <div>
              <label
                htmlFor="blog-regen-prompt"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]"
              >
                Prompt
              </label>
              <textarea
                id="blog-regen-prompt"
                value={regeneratePrompt}
                onChange={(e) => onRegeneratePromptChange(e.target.value)}
                rows={4}
                placeholder="Describe what to generate…"
                className="blog-input min-h-[100px] w-full resize-y"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Target word count
              </label>
              <div className="flex flex-wrap gap-2">
                {WORD_COUNTS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onWordCountChange(count)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      wordCount === count
                        ? "bg-tab-active text-white shadow-[0_0_12px_rgb(237_31_36/0.4)]"
                        : "border border-white/[0.08] bg-white/[0.02] text-[#94a3b8] hover:border-tab-active/40 hover:text-white"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onRegenerateContent}
              disabled={isGenerating || !regeneratePrompt.trim()}
              className="blog-btn-generate w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "Generating…" : "Regenerate content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
