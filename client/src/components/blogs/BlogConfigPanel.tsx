import BlogCoverImageSection from "./BlogCoverImageSection";

const CATEGORIES = [
  "Trading",
  "Market Analysis",
  "Volume Analysis",
  "PTA Indicators",
  "Education",
  "News",
] as const;

const READING_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const WORD_COUNTS = ["500", "1000", "1500", "2000", "3000"] as const;

type BlogConfigPanelProps = {
  topic: string;
  onTopicChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  readingLevel: string;
  onReadingLevelChange: (v: string) => void;
  wordCount: string;
  onWordCountChange: (v: string) => void;
  settingsOpen: boolean;
  onToggleSettings: () => void;
  coverUrl: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
  onUploadCover: () => void;
  onGenerateCover: () => void;
  onChangeCover: () => void;
};

export default function BlogConfigPanel({
  topic,
  onTopicChange,
  category,
  onCategoryChange,
  readingLevel,
  onReadingLevelChange,
  wordCount,
  onWordCountChange,
  settingsOpen,
  onToggleSettings,
  coverUrl,
  isGenerating,
  onGenerate,
  onUploadCover,
  onGenerateCover,
  onChangeCover,
}: BlogConfigPanelProps) {
  const charCount = topic.length;

  return (
    <div className="blog-glass-card sticky top-4 space-y-6 p-5 sm:p-6 lg:top-6">
      <div>
        <label
          htmlFor="blog-topic"
          className="mb-3 block text-sm font-medium text-[#94a3b8]"
        >
          Blog Topic / Prompt
        </label>
        <textarea
          id="blog-topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          rows={6}
          placeholder="Write a detailed prompt describing the blog you want to generate..."
          className="blog-input min-h-[140px] w-full resize-y"
        />
        <p className="mt-2 text-right text-xs text-[#94a3b8]">
          {charCount} characters
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
        <button
          type="button"
          onClick={onToggleSettings}
          className="flex w-full items-center justify-between bg-white/[0.02] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
        >
          <span>Blog Settings</span>
          <svg
            className={`h-4 w-4 text-[#94a3b8] transition-transform ${settingsOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {settingsOpen && (
          <div className="space-y-4 border-t border-white/[0.08] p-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="blog-input w-full"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0f1117]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Reading Level
              </label>
              <select
                value={readingLevel}
                onChange={(e) => onReadingLevelChange(e.target.value)}
                className="blog-input w-full"
              >
                {READING_LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-[#0f1117]">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Word Count
              </label>
              <div className="flex flex-wrap gap-2">
                {WORD_COUNTS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onWordCountChange(count)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      wordCount === count
                        ? "bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                        : "border border-white/[0.08] bg-white/[0.02] text-[#94a3b8] hover:border-[#2563eb]/40 hover:text-white"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BlogCoverImageSection
        coverUrl={coverUrl}
        onUpload={onUploadCover}
        onGenerateAi={onGenerateCover}
        onChange={onChangeCover}
      />

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !topic.trim()}
        className="blog-btn-generate w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? "Generating..." : "Generate Blog"}
      </button>
    </div>
  );
}
