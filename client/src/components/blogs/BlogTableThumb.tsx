import { useState } from "react";

const THUMB_WRAP_CLASS =
  "blog-table-thumb-wrap shrink-0 overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.03]";

type BlogTableThumbProps = {
  src: string | null | undefined;
  title: string;
};

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
      <svg
        className="h-4 w-4 shrink-0 text-[#475569]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
      <span className="text-[9px] font-medium uppercase tracking-wide text-[#475569]">
        No image
      </span>
    </div>
  );
}

export default function BlogTableThumb({ src, title }: BlogTableThumbProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={THUMB_WRAP_CLASS} title={`No cover image for ${title}`}>
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div className={THUMB_WRAP_CLASS}>
      <img
        src={src}
        alt=""
        className="blog-table-thumb-img"
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
