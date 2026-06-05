import type { ChangeEvent } from "react";

import BlogCoverImage from "@/components/blogs/BlogCoverImage";

type BlogCoverImageSectionProps = {
  coverUrl: string | null;
  isGenerating?: boolean;
  isUploading?: boolean;
  uploadError?: string | null;
  onUpload: (file: File) => void;
  onGenerateAi: () => void;
  onChange: () => void;
};

export default function BlogCoverImageSection({
  coverUrl,
  isGenerating = false,
  isUploading = false,
  uploadError = null,
  onUpload,
  onGenerateAi,
  onChange,
}: BlogCoverImageSectionProps) {
  const busy = isGenerating || isUploading;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-[#94a3b8]">
        Cover image
      </label>

      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        {coverUrl ? (
          <>
            <BlogCoverImage
              src={coverUrl}
              alt="Blog cover preview"
              className="h-full w-full object-cover"
              fallbackClassName="h-full w-full"
            />
            {busy && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
                {isUploading ? "Uploading…" : "Generating…"}
              </div>
            )}
            {!busy && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={onChange} className="blog-btn-secondary">
                  Change Image
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-[#94a3b8]">
              {busy ? (isUploading ? "Uploading…" : "Generating…") : "No cover image selected"}
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <p className="mt-2 text-sm text-red-300" role="alert">
          {uploadError}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label
          className={`blog-btn-secondary flex-1 text-center ${busy ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={handleFileChange}
          />
        </label>
        <button
          type="button"
          onClick={onGenerateAi}
          disabled={busy}
          className="blog-btn-outline flex-1 disabled:opacity-50"
        >
          {isGenerating ? "Generating…" : "Generate AI Image"}
        </button>
      </div>
    </div>
  );
}
