import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
      {description && (
        <p className="max-w-2xl text-sm text-secondary-text">{description}</p>
      )}
    </div>
  );
}
