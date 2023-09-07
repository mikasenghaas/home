import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b py-8">
      <Logo />
      <ThemeToggle />
    </div>
  );
}
