const WORD_COUNTS = ["500", "1000", "1500", "2000", "3000"] as const;

const EXAMPLE_PROMPTS = [
  "Top 5 Wyckoff Trading Strategies for 2026",
  "How Institutional Traders Use Volume Analysis",
  "Understanding Market Structure Using PTA Indicators",
];

export type BlogGenerationFormProps = {
  topic: string;
  onTopicChange: (v: string) => void;
  wordCount: string;
  onWordCountChange: (v: string) => void;
  settingsOpen: boolean;
  onToggleSettings: () => void;
  isGenerating: boolean;
  onGenerate: () => void;
};

export default function BlogGenerationForm({
  topic,
  onTopicChange,
  wordCount,
  onWordCountChange,
  settingsOpen,
  onToggleSettings,
  isGenerating,
  onGenerate,
}: BlogGenerationFormProps) {
  return (
    <div className="space-y-6">
      <div className="blog-glass-card p-6">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#64748b]">
          Blog topic / prompt
        </label>
        <textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          rows={4}
          placeholder="Describe the blog you want to generate..."
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#64748b] focus:border-cyan-400/40 focus:outline-none"
        />
        <button
          type="button"
          disabled={!topic.trim() || isGenerating}
          onClick={onGenerate}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isGenerating ? "Generating…" : "Generate & create blog"}
        </button>
      </div>

      <div className="blog-glass-card p-6">
        <button
          type="button"
          onClick={onToggleSettings}
          className="flex w-full items-center justify-between text-sm font-medium text-white"
        >
          AI settings
          <span className="text-[#64748b]">{settingsOpen ? "−" : "+"}</span>
        </button>
        {settingsOpen && (
          <div className="mt-4">
            <label className="mb-1 block text-xs text-[#64748b]">
              Target word count (optional)
            </label>
            <select
              value={wordCount}
              onChange={(e) => onWordCountChange(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white"
            >
              {WORD_COUNTS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748b]">
          Example prompts
        </p>
        <ul className="space-y-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <li key={example}>
              <button
                type="button"
                onClick={() => onTopicChange(example)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#94a3b8] transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {example}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
