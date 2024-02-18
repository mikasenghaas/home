import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { Project } from "@/components/section/projects";
import { Teaching } from "@/components/section/teaching";
import { Work } from "@/components/section/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Work />
      <Project />
      <Teaching />
    </>
  );
}
