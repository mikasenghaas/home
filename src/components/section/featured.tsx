import Link from "next/link";

import { Frosted } from "@/components/frosted";
import { Section } from "@/components/section";
import Image from "next/image";

export function Featured() {
  return (
    <Section className="mt-12">
      <Frosted className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="text-sm text-accent-foreground">Featured</p>
          <Link href="/project/addiscoder">
            <h2 className="text-2xl sm:text-3xl mt-2">I spent my summer in Addis Ababa, Ethiopia 🇪🇹</h2>
          </Link>
          <p className="mt-2 text-lg leading-snug 2xl:mt-6 2xl:text-2xl">
              I was part of the amazing team that ran <span
              className="text-foreground">AddisCoder 2024</span>. Read more about my
              journey of a month in Ethiopia, where we taught the country&apos;s
              most talented high schoolers write their first lines of code in Week 1
              and solve complex dynamic programming problems in Week 4.
            </p>
        </div>
        <div className="flex-1 relative aspect-video">
          <Image
            src="/img/addiscoder1.jpeg"
            alt="AddisCoder"
            className="object-cover rounded-lg"
            fill
          />
        </div>
      </Frosted>
    </Section>
  );
}