import { Aperture } from "lucide-react";
import Link from "next/link";

import { Frosted } from "@/components/frosted";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";

export function Featured() {
  return (
    <Section className="mt-6">
      <Frosted className="flex h-[500px] flex-col space-y-4 sm:h-[300px] sm:flex-row sm:space-x-4 sm:space-y-0 2xl:h-[500px] 2xl:space-x-6">
        <Aperture className="h-8 w-8 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold text-accent-foreground 2xl:text-base">
              Featured
            </p>
            <Link href="/project/bsc">
              <h2 className="m-0 text-2xl sm:text-4xl 2xl:text-5xl">
                Navigating Indoors With Computer Vision
              </h2>
            </Link>
            <p className="mt-2 line-clamp-6 text-lg leading-tight sm:w-3/4 2xl:mt-6 2xl:text-2xl">
              In my bachelor thesis I investigated whether state-of-the-art deep
              learning architectures for image and video classification (CNNs,
              CRNNs, Transformers) can accuractely predict <i>where</i> a human
              is located in an indoor environment given only information from
              the camera feed. Read more about the data, models, experiments and
              proof-of-concept mobile application in this post.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-end gap-1">
            <Badge className="text-xs 2xl:text-base">Thesis</Badge>
            <Badge className="text-xs 2xl:text-base">Computer Vision</Badge>
            <Badge className="text-xs 2xl:text-base">Deep Learning</Badge>
          </div>
        </div>
      </Frosted>
    </Section>
  );
}
