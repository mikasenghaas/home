import { Aperture } from "lucide-react";

import { Frosted } from "@/components/frosted";

import { Badge } from "../ui/badge";

export function Featured() {
  return (
    <Frosted className="flex min-h-[500px] flex-col space-y-4 md:min-h-[300px] md:flex-row md:space-x-8 md:space-y-0">
      <Aperture className="h-8 w-8 md:h-12 md:w-12" />
      <div className="flex flex-col">
        <p className="mb-2 text-xs font-semibold text-accent-foreground">
          Featured
        </p>
        <a href="/teaching/mst">
          <h3 className="m-0 text-2xl md:text-4xl 2xl:text-5xl">
            Navigating Indoors With Computer Vision
          </h3>
        </a>
        <p className="mt-2 leading-tight">
          Deep Learning Approaches for Room-Level Indoor Localisation
        </p>
        <div className="mt-8 flex flex-1 flex-wrap items-end gap-x-2 gap-y-1">
          <Badge>Thesis</Badge>
          <Badge>Computer Vision</Badge>
          <Badge>Deep Learning</Badge>
        </div>
      </div>
    </Frosted>
  );
}
