import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { Project } from "@/components/section/projects";
import { Teaching } from "@/components/section/teaching";
import { Research } from "@/components/section/research";
import { TLDR } from "@/components/section/tldr";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Research />
      <Project />
      <TLDR />
    </>
  );
}
