import { createContext, useContext } from "react";
import type { AppCtxType } from "../types";

export const AppCtx = createContext<AppCtxType | null>(null);
export const useApp = () => useContext(AppCtx)!;
export const RunCtx = createContext<boolean>(true);
