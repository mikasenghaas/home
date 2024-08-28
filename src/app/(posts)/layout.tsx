import Link from "next/link";

import { TableOfContents } from "@/components/toc";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <>
      <TableOfContents />
      <div id="post" className="px-4 lg:px-[4rem]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">Home</Link>
          </TooltipTrigger>
          <TooltipContent>Go Back</TooltipContent>
        </Tooltip>
        {children}
      </div>
    </>
  );
}
