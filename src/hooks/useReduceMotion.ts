/**
 * useReduceMotion — persists the reduce-motion preference via StorageService.
 *
 * Changes from original:
 *  - Uses storage.getReduceMotion() / storage.setReduceMotion() instead of
 *    raw localStorage calls.
 *  - initReduceMotion() similarly uses the service.
 */

import { useState, useEffect } from "react";
import { storage } from "../services/storage";

function applyReduceMotion(reduced: boolean): void {
  if (reduced) {
    document.documentElement.setAttribute("data-reduce-motion", "true");
  } else {
    document.documentElement.removeAttribute("data-reduce-motion");
  }
}

export function useReduceMotion(): [boolean, (v: boolean) => void] {
  const [reduced, setReduced] = useState<boolean>(() => storage.getReduceMotion());

  useEffect(() => {
    storage.setReduceMotion(reduced);
    applyReduceMotion(reduced);
  }, [reduced]);

  return [reduced, setReduced];
}

export function getReduceMotion(): boolean {
  return storage.getReduceMotion();
}

/** Call once on app start to restore persisted reduce-motion preference. */
export function initReduceMotion(): void {
  applyReduceMotion(storage.getReduceMotion());
}
