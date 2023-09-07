import Image from "next/image";

import { Logo } from "@/components/logo";
import ProfilePicture from "@/components/profile-picture";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <>
      <ProfilePicture />
      <p className="text-4xl ">
        Hi 👋🏻 I&apos;m Mika. I am a student and teaching assistant at the IT
        University of Copenhagen interested in cutting-edge AI.
      </p>
      <p className="text-accent">Test</p>
    </>
  );
}

function Buttons() {
  return (
    <div className="my-8 flex items-center space-x-2 p-8">
      <Button size="lg">Primary</Button>
      <Button variant="secondary" size="lg">
        Secondary
      </Button>
      <Button variant="outline" size="lg">
        Outline
      </Button>
      <Button variant="link" size="lg">
        Link
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Buttons />
    </>
  );
}
