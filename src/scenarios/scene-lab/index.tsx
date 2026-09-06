import { PromoScenario } from "../../engine/promo/scenario";

const INK = "#171310";
const CREAM = "#F2F0EB";

export const sceneLab: PromoScenario = {
  id: "scene-lab",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  caption: "Marketing was built for teams.",
  scenes: [
    {
      kind: "statement",
      background: INK,
      left: "marketing\nwas built for",
      image: "product-1.jpg",
      right: "teams",
    },
    {
      kind: "statement",
      background: CREAM,
      ink: INK,
      left: "now one agent",
      image: "product-2.jpg",
      right: "runs it",
    },
    {
      kind: "statement",
      background: INK,
      left: "it writes,\nit publishes,",
      image: "hero-candles.jpg",
      right: "it ranks",
    },
    {
      kind: "statement",
      background: CREAM,
      ink: INK,
      left: "and it asks\nbefore it",
      image: "product-3.jpg",
      right: "spends",
    },
    {
      kind: "lockup",
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};
