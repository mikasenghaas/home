"use client";

import { Github, Instagram, Linkedin, Music } from "lucide-react";
import moment from "moment";

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
  return (
    <div className="mb-12 mt-16 w-full 2xl:mt-24">
      <hr />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm sm:text-base 2xl:text-xl">
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
              <TooltipContent>Give me a ping</TooltipContent>
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
                <DropdownMenuItem
                  onSelect={() =>
                    window.open(
                      "https://open.spotify.com/user/1atznoygdksoddgocmbl4buli?si=17e9e23d34ab4aad",
                      "_blank",
                    )
                  }
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Spotify</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>
        </span>
        <p className="text-xs text-muted-foreground sm:text-sm 2xl:text-base">
          &copy; Mika Senghaas {moment().format("YYYY")}
        </p>
      </div>
    </div>
  );
}
