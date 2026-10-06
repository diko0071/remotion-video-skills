import React from "react";
import MARKS from "./vo-marks.json";
import { timeline } from "../stick-ads/timeline";
import { Checks, Lockup, LogoLine, StickAd, type StickSpec } from "../stick-ads/stick-ad";

const t = timeline(MARKS);
const i = t.atIndex;

const SPEC: StickSpec = {
  vo: "vo/stick-claude-agencies/_take.mp3",
  words: t.words,
  endcard: t.endcard,
  total: t.total,
  shots: [
    { pose: "panic-agency", from: 0 },
    { pose: "chat", from: i(7) },
    { pose: "thumbs-up", from: i(37), dx: -110, dy: 40 },
    { pose: "relaxed", from: i(58) },
    { pose: "crowd", from: t.crowd, scale: 1.04 },
  ],
  labels: [
    { text: "SEO agencies", from: 0, until: i(7), x: 130, y: 330, size: 48, arrow: { x1: 250, y1: 410, x2: 430, y2: 620, curve: -70 } },
    { text: "“Why did my traffic drop?”", from: i(23), until: i(37), x: 0, y: 220, size: 44, align: "center" },
    { text: "“What should I write this week?”", from: i(28), until: i(37), x: 0, y: 300, size: 44, align: "center" },
    { text: "“Fix my website.”", from: i(34), until: i(37), x: 0, y: 380, size: 44, align: "center" },
    { text: "Writes & publishes\narticles", from: i(38), until: i(58), x: 0, y: 250, size: 40, align: "center" },
    { text: "+\nBuilds backlinks", from: i(46), until: i(58), x: 0, y: 380, size: 40, align: "center" },
    { text: "+ Where you rank on\nGoogle and ChatGPT", from: i(49), until: i(58), x: 0, y: 1320, size: 40, align: "center" },
    { text: "$3,000 agency.\nOne chat.", from: i(62), until: t.crowd, x: 0, y: 300, size: 52, align: "center" },
    { text: "3,000+", from: t.crowd + 6, until: t.endcard, x: 0, y: 330, size: 56, align: "center" },
  ],
  overlays: [
    { from: i(14), until: i(23), node: <LogoLine top={260} logos={["ai/claude.png"]} text="Claude" /> },
    { from: i(16), until: i(23), node: <Lockup top={370} size={76} /> },
    { from: i(37), until: i(58), node: <Checks base={i(37)} items={[{ at: i(38), y: 760 }, { at: i(46), y: 900 }, { at: i(49), y: 1040 }]} /> },
  ],
};

export const StickClaudeAgencies: React.FC = () => <StickAd spec={SPEC} />;
export const STICK_CLAUDE_AGENCIES_TOTAL = t.total;
