import React from "react";
import MARKS from "./vo-marks.json";
import { timeline } from "../stick-ads/timeline";
import { CheckRow, Lockup, StickAd, type StickSpec } from "../stick-ads/stick-ad";

const t = timeline(MARKS);
const i = t.atIndex;
const ROW_X = 250;

const SPEC: StickSpec = {
  vo: "vo/stick-overnight/_take.mp3",
  words: t.words,
  endcard: t.endcard,
  total: t.total,
  shots: [
    { pose: "phone-bored", from: 0 },
    { pose: "standing", from: i(8) },
    { pose: "typing", from: i(14) },
    { pose: "bed-sleeping", from: i(21) },
    { pose: "wakeup", from: i(41) },
    { pose: "coffee-happy", from: i(48) },
    { pose: "relaxed", from: i(53) },
    { pose: "crowd", from: t.crowd, scale: 1.04 },
  ],
  labels: [
    { text: "SEO agency: 1 month", from: 0, until: i(8), x: 0, y: 300, size: 52, align: "center" },
    { text: "Overnight.", from: i(11), until: i(14), x: 0, y: 420, size: 52, align: "center" },
    { text: "Paste your URL.", from: i(16), until: i(21), x: 0, y: 300, size: 52, align: "center" },
    { text: "Already done.", from: i(45), until: i(48), x: 0, y: 300, size: 52, align: "center" },
    { text: "Again tomorrow.", from: i(48), until: i(53), x: 0, y: 300, size: 52, align: "center" },
    { text: "No agency.\nNo freelancers.", from: i(53), until: t.crowd, x: 0, y: 300, size: 52, align: "center" },
    { text: "3,000+", from: t.crowd + 6, until: t.endcard, x: 0, y: 330, size: 56, align: "center" },
  ],
  overlays: [
    { from: i(8), until: i(14), node: <Lockup top={290} /> },
    {
      from: i(21),
      until: i(41),
      node: (
        <>
          <CheckRow at={i(25) - i(21)} x={ROW_X} y={230} text="Finds keywords" />
          <CheckRow at={i(30) - i(21)} x={ROW_X} y={320} text="Writes articles" />
          <CheckRow at={i(33) - i(21)} x={ROW_X} y={410} text="Publishes them" />
          <CheckRow at={i(39) - i(21)} x={ROW_X} y={500} text="Builds backlinks" />
        </>
      ),
    },
  ],
};

export const StickOvernight: React.FC = () => <StickAd spec={SPEC} />;
export const STICK_OVERNIGHT_TOTAL = t.total;
