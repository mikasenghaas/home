import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { Project } from "@/components/section/projects";
import { Teaching } from "@/components/section/teaching";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Project />
      <Teaching />
    </>
  );
}
