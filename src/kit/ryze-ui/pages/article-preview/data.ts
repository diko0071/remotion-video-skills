import type { MetaField } from "./types";

export const PREVIEW_BACK_LABEL = "Back to programmatic";
export const PREVIEW_IMPROVE_CTA = "Improve This Article";
export const PREVIEW_PUBLISH_CTA = "Publish now";
export const PREVIEW_EDIT_CTA = "Edit";

export const PREVIEW_META_FIELDS: MetaField[] = [
  { label: "Status", value: "Drafted" },
  { label: "Primary keyword", value: "candle tunneling fix" },
  { label: "Search volume", value: "1,900 / mo" },
  { label: "Difficulty", value: "18 / 100" },
  { label: "Meta title", value: "Why Your Candle Tunnels (And How To Fix It)" },
  {
    label: "Meta description",
    value:
      "Tunnelling wastes up to a third of a hand-poured candle. Here is why the wax burns down the middle, how to reset a tunnelled jar, and how to stop it happening again.",
    multiline: true,
  },
  { label: "Word count", value: "740 words" },
];
