import * as React from "react";

type WindowSize = {
  height: number;
  width: number;
};

export function useWindowSize() {
  const [size, setSize] = React.useState<WindowSize>({
    height: 0,
    width: 0,
  });

  React.useEffect(() => {
    function updateWindowSize() {
      const body = document.body,
        html = document.documentElement;

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );

      const width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth,
      );

      setSize({ height, width });
    }
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return size;
}
