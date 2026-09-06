import React from "react";
import { StackAvalanche } from "../../kit/stack-avalanche";
import { STACK_EXTRA_MARKS, STACK_MARKS, STACK_TOTAL } from "./timings";

export { STACK_TOTAL };

const EXIT_AT = STACK_TOTAL - 12;

const CARD_FILES = [
  "apps/lovable_top-10-2d.jpg",
  "creative-wall/notion_top-3-52d.jpg",
  "apps/granola_top-2-30d.jpg",
  "creative-wall/zapier_top-1-898d.jpg",
  "apps/cursor_top-3-2d.jpg",
  "creative-wall/superhuman_top-2-35d.jpg",
  "apps/elevenlabs_top-2-154d.jpg",
  "creative-wall/deel_top-5-29d.jpg",
  "creative-wall/intercom_top-1-7d.jpg",
  "creative-wall/canva_top-1-103d.jpg",
  "creative-wall/sunsama_top-3-20d.jpg",
  "creative-wall/grammarly_top-1-87d.jpg",
  "creative-wall/beehiiv_top-5-39d.jpg",
  "creative-wall/wise_top-5-27d.jpg",
  "creative-wall/notion_top-5-38d.jpg",
  "creative-wall/zapier_top-4-598d.jpg",
  "creative-wall/airtable_top-1-106d.jpg",
  "apps/base44_top-1-131d.jpg",
  "creative-wall/typeform_top-3-224d.jpg",
  "creative-wall/coinbase_top-1-256d.jpg",
  "apps/elevenlabs_top-5-135d.jpg",
  "apps/base44_top-2-43d.jpg",
];

const ITEMS = CARD_FILES.map((file) => ({ file }));
const MARKS = [...STACK_MARKS, ...STACK_EXTRA_MARKS];

export const SceneStack: React.FC = () => (
  <StackAvalanche items={ITEMS} marks={MARKS} exitAt={EXIT_AT} />
);
