"use client";

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import moment from "moment";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Footer() {
  return (
    <div className="mb-12 mt-16 w-full 2xl:mt-24">
      <hr />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground sm:text-base 2xl:text-xl">
          Reach me{" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="m-0 p-0 font-medium text-accent-foreground"
                variant="link"
              >
                @mikasenghaas
              </Button>
            </DropdownMenuTrigger>
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
                onSelect={() => window.open("https://x.com/mikasenghaas")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
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
                    "https://www.strava.com/athletes/mikasenghaas",
                    "_blank",
                  )
                }
              >
                <Image
                  src="/svg/strava.svg"
                  alt="Strava logo"
                  height={16}
                  width={16}
                  className="mr-2 dark:invert"
                />
                <span>Strava</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        <p className="text-xs text-muted-foreground sm:text-sm 2xl:text-base">
          &copy; Mika Senghaas {moment().format("YYYY")}
        </p>
      </div>
    </div>
  );
}
