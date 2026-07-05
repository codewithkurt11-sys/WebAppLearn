/**
 * useWindowWidth — returns the current window inner width.
 *
 * Performance improvement:
 *  - The resize event is debounced (100 ms) so components that use this
 *    hook (there are many) don't all re-render on every pixel change while
 *    the user drags the window edge.
 */

import { useState, useEffect } from "react";

export function useWindowWidth(): number {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(window.innerWidth), 100);
    };

    window.addEventListener("resize", handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return width;
}
