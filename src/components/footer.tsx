"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";

export function Footer() {
  const router = useRouter();

  return (
    <div className="mb-12 mt-16 w-full ">
      <hr />
      <div className="flex items-center justify-between">
        <p>
          Reach me{" "}
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    className="m-0 p-0 font-medium text-accent-foreground"
                    variant="link"
                  >
                    @mikasenghaas
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Reach out</TooltipContent>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() =>
                    window.open("https://github.com/mikasenghaas", "_blank")
                  }
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    window.open("https://linkedin.com/in/mikasenghaas")
                  }
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  <span>LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    window.open("https://instagram.com/mikasenghaas", "_blank")
                  }
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; Mika Senghaas {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
