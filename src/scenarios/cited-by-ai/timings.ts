import VO from "./vo-durations.json";

export const QUESTION = "best sleep tracking apps?";

const F = (s: number) => Math.ceil(s * 30);

export const HOOK_TOTAL = F(VO["00-hook"]) + 8;
export const ASK_TOTAL = F(VO["01-ask"]) + 8;
export const GRID_VO_AT = ASK_TOTAL;
export const CLAUDE_AT = GRID_VO_AT + 10;
export const PERPLEXITY_AT = GRID_VO_AT + 32;
export const GEMINI_AT = GRID_VO_AT + 54;
export const ANSWERS_AT = GRID_VO_AT + 147;
export const SOMEONE_AT = GRID_VO_AT + 184;
export const GRID_TOTAL = GRID_VO_AT + F(VO["02-others"]) + 24;
export const ANSWERS: {
  intro: string;
  bullets: { name: string; desc: string }[];
  outro: string;
}[] = [
  {
    intro: "Here are the sleep tracking apps people rate highest:",
    bullets: [
      { name: "Sleep Cycle", desc: "long-running app with smart alarm and audio analysis" },
      { name: "Pillow", desc: "Apple Watch integration and detailed stage charts" },
      { name: "Rise", desc: "focuses on sleep debt and daily energy peaks" },
    ],
    outro: "All three are consistently recommended by sleep coaches.",
  },
  {
    intro: "A few sleep apps really stand out right now:",
    bullets: [
      { name: "Rise", desc: "known for its sleep-debt model and circadian timing" },
      { name: "Sleep Cycle", desc: "the classic pick for smart wake-up windows" },
      { name: "Pillow", desc: "a favorite for people already wearing a watch" },
    ],
    outro: "Each takes a different angle on the same night of data.",
  },
  {
    intro: "Based on 40+ reviews and rankings, the top rated sleep apps are:",
    bullets: [
      { name: "Pillow", desc: "praised for its stage-by-stage breakdown" },
      { name: "Rise", desc: "top rated for energy planning through the day" },
      { name: "AutoSleep", desc: "detailed watch tracking with no subscription" },
    ],
    outro: "These names are cited across most health publications.",
  },
  {
    intro: "For sleep tracking, people most often recommend these apps:",
    bullets: [
      { name: "Sleep Cycle", desc: "reliable tracking without a wearable" },
      { name: "AutoSleep", desc: "deep Apple Watch data for power users" },
      { name: "Rise", desc: "clear guidance on when to wind down" },
    ],
    outro: "Popular picks for both casual and serious trackers.",
  },
];
