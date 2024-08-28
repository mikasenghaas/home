"use client";

import * as React from "react";

import {
  File,
  Command,
  Home,
  Paperclip,
  Sun,
  Moon,
  Github,
  Linkedin,
  Instagram,
  Music,
  Twitter,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { PostFrontmatterContext } from "@/lib/context";
import { capitalize, renderShortDate } from "@/lib/utils";

export function Menu() {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const posts = React.useContext(PostFrontmatterContext);

  function opposite(theme: string | undefined) {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      default:
        return "system";
    }
  }

  function toggleTheme() {
    setTheme(opposite(resolvedTheme));
  }

  function navigate(url: string) {
    router.push(url);
    setOpen(false);
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={() => setOpen((open) => !open)}>
            <Command className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Open menu</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="flex items-center gap-x-1 text-sm">
            Open Menu
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-accent-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Back Home</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("cv.pdf")}>
              <File className="mr-2 h-4 w-4" />
              <span>Check out my CV</span>
            </CommandItem>
            <CommandItem onSelect={() => toggleTheme()}>
              <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span>Switch to {capitalize(opposite(resolvedTheme))} Mode</span>
              <CommandShortcut>⌘J</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            {" "}
            <CommandItem
              onSelect={() => window.open("https://github.com/mikasenghaas")}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                window.open("https://linkedin.com/in/mikasenghaas")
              }
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                window.open("https://x.com/mikasenghaas")
              }
            >
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </CommandItem>
            <CommandItem
              onSelect={() => window.open("https://instagram.com/mikasenghaas")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              <span>Instagram</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                window.open(
                  "https://open.spotify.com/user/1atznoygdksoddgocmbl4buli?si=17e9e23d34ab4aad",
                )
              }
            >
              <Music className="mr-2 h-4 w-4" />
              <span>Spotify</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {posts!["project"].map((postFrontmatter) => {
              return (
                <CommandItem
                  key={`project-${postFrontmatter.title}`}
                  onSelect={() => navigate(`/project/${postFrontmatter.slug}`)}
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  <span className="mr-2 flex-1 truncate">
                    {postFrontmatter.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {renderShortDate(postFrontmatter.published)}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="TLDR">
            {posts!["tldr"].map((postFrontmatter) => {
              return (
                <CommandItem
                  key={`tldr-${postFrontmatter.title}`}
                  onSelect={() => navigate(`/tldr/${postFrontmatter.slug}`)}
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  <span className="mr-2 flex-1 truncate">
                    {postFrontmatter.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {renderShortDate(postFrontmatter.published)}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
