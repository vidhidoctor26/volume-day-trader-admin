import { useCallback, useEffect, useState } from "react";
import { useDashboardHeaderActions } from "@/components/dashboard/DashboardHeaderActionsContext";
import BlogConfigPanel from "../components/blogs/BlogConfigPanel";
import BlogPageActions from "../components/blogs/BlogPageActions";
import BlogPreviewPanel from "../components/blogs/BlogPreviewPanel";
import BlogPublishModal from "../components/blogs/BlogPublishModal";
import {
  buildMockBlogTitle,
  DEFAULT_COVER_IMAGE,
  slugify,
} from "../data/mockBlogPreview";

const EXAMPLE_PROMPTS = [
  "Top 5 Wyckoff Trading Strategies for 2026",
  "How Institutional Traders Use Volume Analysis",
  "Understanding Market Structure Using PTA Indicators",
];

function formatCreatedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadTime(wordCount: string): string {
  const words = parseInt(wordCount, 10) || 1000;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function CreateBlogPage() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Trading");
  const [readingLevel, setReadingLevel] = useState("Intermediate");
  const [wordCount, setWordCount] = useState("1000");
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPreview, setHasPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [publishOpen, setPublishOpen] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [urlSlug, setUrlSlug] = useState("");

  const runGenerate = useCallback(() => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    window.setTimeout(() => {
      const title = buildMockBlogTitle(topic);
      setPreviewTitle(title);
      setHasPreview(true);
      setSeoTitle(title);
      setMetaDescription(
        `Learn ${category.toLowerCase()} insights tailored for ${readingLevel.toLowerCase()} traders. ${wordCount} words of actionable content.`,
      );
      setUrlSlug(slugify(title));
      if (!coverUrl) setCoverUrl(DEFAULT_COVER_IMAGE);
      setIsGenerating(false);
    }, 1500);
  }, [topic, category, readingLevel, wordCount, coverUrl]);

  const { setActions } = useDashboardHeaderActions();

  const openPublish = useCallback(() => {
    if (hasPreview && previewTitle) {
      setSeoTitle((prev) => prev || previewTitle);
      setUrlSlug((prev) => prev || slugify(previewTitle));
    }
    setPublishOpen(true);
  }, [hasPreview, previewTitle]);

  useEffect(() => {
    setActions(
      <BlogPageActions onSaveDraft={() => {}} onPublish={openPublish} />,
    );
    return () => setActions(null);
  }, [setActions, openPublish]);

  const displayCover = coverUrl ?? DEFAULT_COVER_IMAGE;

  return (
    <div className="blog-page-enter space-y-6">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        <aside className="space-y-4">
          <BlogConfigPanel
            topic={topic}
            onTopicChange={setTopic}
            category={category}
            onCategoryChange={setCategory}
            readingLevel={readingLevel}
            onReadingLevelChange={setReadingLevel}
            wordCount={wordCount}
            onWordCountChange={setWordCount}
            settingsOpen={settingsOpen}
            onToggleSettings={() => setSettingsOpen((o) => !o)}
            coverUrl={coverUrl}
            isGenerating={isGenerating}
            onGenerate={runGenerate}
            onUploadCover={() => setCoverUrl(DEFAULT_COVER_IMAGE)}
            onGenerateCover={() => setCoverUrl(DEFAULT_COVER_IMAGE)}
            onChangeCover={() => setCoverUrl(DEFAULT_COVER_IMAGE)}
          />

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748b]">
              Example prompts
            </p>
            <ul className="space-y-2">
              {EXAMPLE_PROMPTS.map((example) => (
                <li key={example}>
                  <button
                    type="button"
                    onClick={() => setTopic(example)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#94a3b8] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {example}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <BlogPreviewPanel
          hasPreview={hasPreview}
          title={previewTitle}
          category={category}
          readTime={estimateReadTime(wordCount)}
          createdDate={formatCreatedDate()}
          coverUrl={displayCover}
          onCopy={() => {}}
          onRegenerate={runGenerate}
          onSaveDraft={() => {}}
          onPublish={openPublish}
        />
      </div>

      <BlogPublishModal
        open={publishOpen}
        seoTitle={seoTitle}
        metaDescription={metaDescription}
        urlSlug={urlSlug}
        onSeoTitleChange={setSeoTitle}
        onMetaDescriptionChange={setMetaDescription}
        onUrlSlugChange={setUrlSlug}
        onClose={() => setPublishOpen(false)}
        onPublish={() => setPublishOpen(false)}
      />
    </div>
  );
}
