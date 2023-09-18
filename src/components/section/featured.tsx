import { Aperture } from "lucide-react";

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
            <a href="https://github.com/mikasenghaas/bsc">
              <h2 className="m-0 text-2xl sm:text-4xl 2xl:text-5xl">
                Navigating Indoors With Computer Vision
              </h2>
            </a>
            <p className="mt-2 line-clamp-6 text-lg leading-tight sm:w-3/4 2xl:mt-6 2xl:text-2xl">
              In an increasingly urbanised and digitalised world, indoor
              localisation is becoming a necessity for a wide variety of
              applications, ranging from personal navigation to augmented
              reality. However, despite extensive research efforts, indoor
              localisation remains a challenging task and no single solution is
              widely adopted. Motivated by the success of deep learning in
              numerous computer vision tasks, this study explores the
              feasibility of deep learning for accurate room-level localisation
              in indoor spaces. Various neural network architectures are trained
              and evaluated on a novel video dataset tailored for indoor
              localisation. The findings reveal that deep learning approaches
              can provide reasonable localisation results, even when trained on
              a small dataset. The approach is currently limited by its
              inability to distinguish between visually similar and adjacent
              areas, as well as biases within the training data. Despite these
              shortcomings, the results are encouraging and inspire optimism
              about the method’s practical viability.
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
