import React from "react";
import { ToolCard } from "../../kit/tool-card";
import { ToolSpec } from "../../kit/tool-flow";

const GEN_TOOLS: ToolSpec[] = [
  { label: "Reading your brand kit", detail: "voice · palette · logo", start: 8, done: 52 },
  { label: "Scanning 615 top competitor ads", detail: "picked 6 best-fit layouts", start: 52, done: 102 },
  { label: "Generating your creatives", detail: "6 concepts · 4:5 Meta feed", start: 102, done: 152 },
];

export const ToolsCard: React.FC = () => <ToolCard tools={GEN_TOOLS} />;
