"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is phone-sized (portrait-ish / narrow).
 * The whole site is laid out in vw/vh for a 16:9 desktop frame, so each
 * screen branches on this to render a vertical mobile reflow instead.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
