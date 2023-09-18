import { Aperture } from "lucide-react";

import { Frosted } from "@/components/frosted";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";

export function Featured() {
  return (
    <Section className="mt-6">
      <Frosted className="flex h-[500px] flex-col space-y-4 sm:h-[300px] sm:flex-row sm:space-x-4 sm:space-y-0">
        <Aperture className="h-8 w-8 sm:h-12 sm:w-12" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold text-accent-foreground">
              Featured
            </p>
            <a href="https://github.com/mikasenghaas/bsc">
              <h2 className="m-0 text-2xl sm:text-4xl">
                Navigating Indoors With Computer Vision
              </h2>
            </a>
            <p className="mt-2 line-clamp-6 leading-tight sm:w-3/4">
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
            <Badge>Thesis</Badge>
            <Badge>Computer Vision</Badge>
            <Badge>Deep Learning</Badge>
          </div>
        </div>
      </Frosted>
    </Section>
  );
}
