import React from "react";
import MARKS from "./vo-marks.json";
import { timeline } from "../stick-ads/timeline";
import { Badge, Checks, Lockup, StickAd, type StickSpec } from "../stick-ads/stick-ad";

const t = timeline(MARKS);
const i = t.atIndex;

const SPEC: StickSpec = {
  vo: "vo/stick-midnight-blog/_take.mp3",
  words: t.words,
  endcard: t.endcard,
  total: t.total,
  shots: [
    { pose: "desk-night", from: 0 },
    { pose: "facedown", from: i(13) },
    { pose: "overwhelmed", from: i(20), scale: 0.72, dy: 60 },
    { pose: "standing", from: i(31) },
    { pose: "typing", from: i(39) },
    { pose: "thumbs-up", from: i(45), dx: -110, dy: 40 },
    { pose: "relaxed", from: i(64) },
    { pose: "phone", from: i(69) },
    { pose: "crowd", from: t.crowd, scale: 1.04 },
  ],
  labels: [
    { text: "12:47 AM", from: 0, until: i(13), x: 0, y: 300, size: 64, align: "center" },
    { text: "1 post a week.", from: i(13), until: i(20), x: 0, y: 300, size: 52, align: "center" },
    { text: "Fresh content", from: i(22), until: i(31), x: 90, y: 700, size: 40, arrow: { x1: 200, y1: 770, x2: 380, y2: 900 } },
    { text: "Backlinks", from: i(27), until: i(31), x: 0, y: 470, size: 40, align: "center", arrow: { x1: 540, y1: 545, x2: 540, y2: 720 } },
    { text: "AI Visibility", from: i(29), until: i(31), x: 990, y: 700, size: 40, align: "right", arrow: { x1: 880, y1: 770, x2: 700, y2: 900 } },
    { text: "Daily SEO articles", from: i(46), until: i(64), x: 0, y: 250, size: 40, align: "center" },
    { text: "+\nBacklinks while you sleep", from: i(53), until: i(64), x: 0, y: 330, size: 40, align: "center" },
    { text: "+ Found on ChatGPT", from: i(59), until: i(64), x: 0, y: 1320, size: 40, align: "center" },
    { text: "Your evenings back.", from: i(64), until: i(69), x: 0, y: 300, size: 52, align: "center" },
    { text: "3,000+", from: t.crowd + 6, until: t.endcard, x: 0, y: 330, size: 56, align: "center" },
  ],
  overlays: [
    {
      from: i(31),
      until: i(39),
      node: (
        <>
          <Lockup top={300} />
          <Badge x={640} y={760} lines={["AUTO", "PILOT"]} />
        </>
      ),
    },
    { from: i(45), until: i(64), node: <Checks base={i(45)} items={[{ at: i(46), y: 760 }, { at: i(53), y: 900 }, { at: i(59), y: 1040 }]} /> },
  ],
};

export const StickMidnightBlog: React.FC = () => <StickAd spec={SPEC} />;
export const STICK_MIDNIGHT_BLOG_TOTAL = t.total;
