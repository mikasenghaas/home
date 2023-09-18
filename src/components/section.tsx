import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-12 md:mt-40", className)}>{children}</section>
  );
}
