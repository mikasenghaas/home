import * as React from "react";

export default function useScroll() {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    setScrollPosition(position);
    setScrollPercentage((100 * position) / height);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, scrollPercentage };
}
