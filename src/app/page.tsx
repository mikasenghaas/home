import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { Project } from "@/components/section/projects";
import { Teaching } from "@/components/section/teaching";
import { Research } from "@/components/section/research";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Research />
      <Project />
      <Teaching />
    </>
  );
}
