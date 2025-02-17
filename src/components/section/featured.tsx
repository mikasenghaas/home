import Link from "next/link";

import { Frosted } from "@/components/frosted";
import { Section } from "@/components/section";
import Image from "next/image";

export function Featured() {
  return (
    <Section className="mt-12">
      <Frosted className="flex flex-col sm:flex-row gap-8 p-4 sm:p-8 min-h-[350px]">
        <div className="flex-1">
          <p className="text-sm text-accent-foreground">Featured</p>
          <h2 className="text-2xl sm:text-3xl mt-2">I am in San Francisco, CA 🇺🇸</h2>
          <p className="mt-2 text-lg leading-snug 2xl:mt-6 2xl:text-2xl">
              I have joined the amazing team at{" "}
              <a href="https://www.primeintellect.ai/" target="_blank" rel="noopener noreferrer">Prime Intellect</a> as a research scientist intern to make decentralized AI a reality. If you are in SF and would like to connect, let&apos;s grab a coffee, go for a run, or hack away. 
          </p>
        </div>
          <div className="flex-1 relative aspect-video">
            <Link href="https://x.com/PrimeIntellect/status/1879916015813009484" target="_blank" rel="noopener noreferrer">
              <Image
                src="/img/prime.jpeg"
                alt="Prime Intellect"
                className="object-cover rounded-lg"
                fill
              />
            </Link>
          </div>
      </Frosted>
    </Section>
  );
}