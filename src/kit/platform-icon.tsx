import React from "react";
import { Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Outfit";
import { WHITE_FILTER } from "./directional-blur";

const { fontFamily: SANS } = loadFont();

const FILES: Record<string, string> = {
  openai: "ai/chatgpt.png",
  perplexity: "ai/perplexity.webp",
  claude: "ai/claude.png",
  gemini: "ai/gemini.png",
};

export const PLATFORM_ORDER = ["openai", "perplexity", "claude", "gemini", "google"] as const;

export const PlatformIcon: React.FC<{ id: string; size: number }> = ({ id, size }) => {
  if (id === "google") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, fontFamily: SANS, fontWeight: 800, fontSize: size * 1.12, lineHeight: 1, color: "#FFFFFF", letterSpacing: "-0.04em" }}>
        G
      </span>
    );
  }
  return <Img src={staticFile(FILES[id])} style={{ width: size, height: size, display: "block", objectFit: "contain", filter: WHITE_FILTER }} />;
};
