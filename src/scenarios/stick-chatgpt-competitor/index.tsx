import React from "react";
import MARKS from "./vo-marks.json";
import { timeline } from "../stick-ads/timeline";
import { Badge, Checks, Lockup, LogoLine, StickAd, type StickSpec } from "../stick-ads/stick-ad";

const t = timeline(MARKS);
const i = t.atIndex;

const SPEC: StickSpec = {
  vo: "vo/stick-chatgpt-competitor/_take.mp3",
  words: t.words,
  endcard: t.endcard,
  total: t.total,
  shots: [
    { pose: "chat", from: 0 },
    { pose: "competitor-trophy", from: i(9) },
    { pose: "desk-sad", from: i(15) },
    { pose: "standing", from: i(28) },
    { pose: "typing", from: i(34) },
    { pose: "thumbs-up", from: i(40), dx: -110, dy: 40 },
    { pose: "relaxed", from: i(64) },
    { pose: "phone", from: i(69) },
    { pose: "crowd", from: t.crowd, scale: 1.04 },
  ],
  labels: [
    { text: "Your competitor", from: i(11), until: i(15), x: 990, y: 330, size: 48, align: "right", arrow: { x1: 860, y1: 400, x2: 700, y2: 560 } },
    { text: "You", from: i(13), until: i(15), x: 110, y: 560, size: 48, arrow: { x1: 170, y1: 630, x2: 250, y2: 760 } },
    { text: "AI can't find you.", from: i(15), until: i(28), x: 0, y: 300, size: 52, align: "center" },
    { text: "Articles AI can quote", from: i(41), until: i(64), x: 0, y: 250, size: 40, align: "center" },
    { text: "+\nBacklinks that prove you're legit", from: i(48), until: i(64), x: 0, y: 330, size: 40, align: "center" },
    { text: "+ ChatGPT, Claude\nand Perplexity\nstart mentioning you", from: i(55), until: i(64), x: 0, y: 1320, size: 40, align: "center" },
    { text: "No agency.\nNo manual work.", from: i(64), until: i(69), x: 0, y: 300, size: 52, align: "center" },
    { text: "3,000+", from: t.crowd + 6, until: t.endcard, x: 0, y: 330, size: 56, align: "center" },
  ],
  overlays: [
    { from: 0, until: i(9), node: <LogoLine top={300} logos={["ai/chatgpt.png"]} text="ChatGPT" /> },
    {
      from: i(28),
      until: i(34),
      node: (
        <>
          <Lockup top={300} />
          <Badge x={640} y={760} lines={["AUTO", "PILOT"]} />
        </>
      ),
    },
    { from: i(40), until: i(64), node: <Checks base={i(40)} items={[{ at: i(41), y: 760 }, { at: i(48), y: 900 }, { at: i(55), y: 1040 }]} /> },
  ],
};

export const StickChatgptCompetitor: React.FC = () => <StickAd spec={SPEC} />;
export const STICK_CHATGPT_COMPETITOR_TOTAL = t.total;
