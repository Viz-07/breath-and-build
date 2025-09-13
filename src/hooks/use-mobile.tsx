import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState(true);

  React.useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    update();

    window.addEventListener("resize", update);
    window.matchMedia("(orientation: portrait)").addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      window.matchMedia("(orientation: portrait)").removeEventListener("change", update);
    };
  }, []);

  return { isMobile, isPortrait };
}
