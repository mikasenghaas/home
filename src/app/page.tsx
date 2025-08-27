import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { OSS } from "@/components/section/oss";
import { Project } from "@/components/section/projects";
import { Research } from "@/components/section/research";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <OSS />
      <Research />
      <Project />
    </>
  );
}
