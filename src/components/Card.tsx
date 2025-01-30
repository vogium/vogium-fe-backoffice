import { cn } from "../lib/utils";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("bg-white shadow-md rounded-lg", className)}>
      {children}
    </div>
  );
}
