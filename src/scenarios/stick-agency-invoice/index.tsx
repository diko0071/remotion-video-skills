import React from "react";
import MARKS from "./vo-marks.json";
import { timeline } from "../stick-ads/timeline";
import { Badge, Checks, Lockup, StickAd, type StickSpec } from "../stick-ads/stick-ad";

const t = timeline(MARKS);
const i = t.atIndex;

const SPEC: StickSpec = {
  vo: "vo/stick-agency-invoice/_take.mp3",
  words: t.words,
  endcard: t.endcard,
  total: t.total,
  shots: [
    { pose: "invoice", from: 0 },
    { pose: "spreadsheet", from: i(17) },
    { pose: "desk-confused", from: i(19) },
    { pose: "phone-bored", from: i(23) },
    { pose: "standing", from: i(33) },
    { pose: "typing", from: i(41) },
    { pose: "thumbs-up", from: i(47), dx: -110, dy: 40 },
    { pose: "relaxed", from: i(68) },
    { pose: "phone", from: i(75) },
    { pose: "crowd", from: t.crowd, scale: 1.04 },
  ],
  labels: [
    { text: "SEO agency\n$3,000/mo", from: 0, until: i(17), x: 0, y: 250, size: 52, align: "center" },
    { text: "A spreadsheet.", from: i(17), until: i(19), x: 0, y: 300, size: 52, align: "center" },
    { text: "4 blog posts.", from: i(19), until: i(23), x: 0, y: 300, size: 52, align: "center" },
    { text: "“Rankings take time.”", from: i(30), until: i(33), x: 0, y: 300, size: 52, align: "center" },
    { text: "SEO articles\nevery day", from: i(48), until: i(68), x: 0, y: 250, size: 40, align: "center" },
    { text: "+\nBuilds backlinks for you", from: i(56), until: i(68), x: 0, y: 360, size: 40, align: "center" },
    { text: "+ Shows up\non ChatGPT", from: i(61), until: i(68), x: 0, y: 1320, size: 40, align: "center" },
    { text: "No retainer.\nNo contracts.", from: i(68), until: i(75), x: 0, y: 300, size: 52, align: "center" },
    { text: "3,000+", from: t.crowd + 6, until: t.endcard, x: 0, y: 330, size: 56, align: "center" },
  ],
  overlays: [
    {
      from: i(33),
      until: i(41),
      node: (
        <>
          <Lockup top={300} />
          <Badge x={640} y={760} lines={["AUTO", "PILOT"]} />
        </>
      ),
    },
    { from: i(47), until: i(68), node: <Checks base={i(47)} items={[{ at: i(48), y: 760 }, { at: i(56), y: 900 }, { at: i(61), y: 1040 }]} /> },
  ],
};

export const StickAgencyInvoice: React.FC = () => <StickAd spec={SPEC} />;
export const STICK_AGENCY_INVOICE_TOTAL = t.total;
