import { useState, useEffect } from "react";

const LS_KEY = "cif_reduce_motion";

function applyReduceMotion(reduced: boolean) {
  if (reduced) {
    document.documentElement.setAttribute("data-reduce-motion", "true");
  } else {
    document.documentElement.removeAttribute("data-reduce-motion");
  }
}

export function useReduceMotion(): [boolean, (v: boolean) => void] {
  const [reduced, setReduced] = useState<boolean>(() => {
    try { return localStorage.getItem(LS_KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, reduced ? "1" : "0"); } catch {}
    applyReduceMotion(reduced);
  }, [reduced]);

  return [reduced, setReduced];
}

export function getReduceMotion(): boolean {
  try { return localStorage.getItem(LS_KEY) === "1"; } catch { return false; }
}

/** Call once on app start to restore persisted reduce-motion preference */
export function initReduceMotion() {
  try {
    const stored = localStorage.getItem(LS_KEY) === "1";
    applyReduceMotion(stored);
  } catch {}
}
