import type { ReactNode } from "react";

type FeedbackVariant = "success" | "warning";

type AuthFeedbackCardProps = {
  variant: FeedbackVariant;
  title: string;
  description: string;
  email?: string;
  hint?: string;
  children?: ReactNode;
};

const variantStyles: Record<
  FeedbackVariant,
  { iconBg: string; iconColor: string; ring: string }
> = {
  success: {
    iconBg: "bg-tab-active/15",
    iconColor: "text-tab-active",
    ring: "ring-tab-active/20",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    ring: "ring-amber-500/20",
  },
};

function FeedbackIcon({ variant }: { variant: FeedbackVariant }) {
  const { iconColor } = variantStyles[variant];

  if (variant === "warning") {
    return (
      <svg
        className={`h-6 w-6 ${iconColor}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`h-6 w-6 ${iconColor}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m16.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

export default function AuthFeedbackCard({
  variant,
  title,
  description,
  email,
  hint,
  children,
}: AuthFeedbackCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ring-1 ${styles.iconBg} ${styles.ring}`}
      >
        <FeedbackIcon variant={variant} />
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-white sm:mt-6 sm:text-xl">
        {title}
      </h3>

      <p className="mt-3 max-w-sm px-1 text-sm leading-6 text-secondary-text sm:px-0">
        {description}
      </p>

      {email && (
        <p
          className="mt-5 w-full max-w-sm truncate rounded-xl border border-btn-border bg-pill-bg px-4 py-3 text-sm font-medium text-white sm:text-base"
          title={email}
        >
          {email}
        </p>
      )}

      {hint && (
        <p className="mt-4 max-w-sm px-2 text-xs leading-5 text-muted-text sm:px-0">
          {hint}
        </p>
      )}

      {children && (
        <div className="mt-6 w-full space-y-3 sm:mt-8 sm:space-y-4">{children}</div>
      )}
    </div>
  );
}
