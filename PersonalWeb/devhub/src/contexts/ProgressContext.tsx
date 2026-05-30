import { createContext, useContext, type ReactNode } from "react";
import { useProgress, type ProgressMap } from "../hooks/useProgress";

interface ProgressCtxType {
  progress: ProgressMap;
  loading: boolean;
  saveProgress: (trackKey: string, completed: boolean, score?: number) => Promise<void>;
}

const ProgressCtx = createContext<ProgressCtxType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const value = useProgress();
  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgressCtx(): ProgressCtxType {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgressCtx must be inside ProgressProvider");
  return ctx;
}
