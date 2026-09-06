import React from "react";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily } = loadFont();

export type PromoTheme = {
  background: string;
  ink: string;
  accent: string;
  fontFamily: string;
  caption?: string;
};

export const DEFAULT_THEME: PromoTheme = {
  background: "#F2F0EB",
  ink: "#171310",
  accent: "#C19767",
  fontFamily,
};

export const PromoThemeCtx = React.createContext<PromoTheme>(DEFAULT_THEME);

export const usePromoTheme = () => React.useContext(PromoThemeCtx);
