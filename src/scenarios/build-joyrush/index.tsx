import { Scenario } from "../../engine/demo/scenario";
import { PAGE_HEIGHT } from "./timings";
import { makeJoyrushScene } from "./joyrush-scene";

const CREAM = "#fbf6ed";
const BLOOD = "#9a1902";
const PLUM = "#2f1948";

const joyrushScene = makeJoyrushScene({
  juices: [
    { name: "Tropical Tangerine", image: "joyrush/can-tangerine.png", bg: "#fe431a", ink: CREAM },
    { name: "Lush Cherry", image: "joyrush/can-cherry.png", bg: "#ff9dd3", ink: BLOOD },
    { name: "Wild Berries", image: "joyrush/can-berries.png", bg: "#85d8ff", ink: PLUM },
    { name: "Ruby Orange", image: "joyrush/can-ruby.png", bg: "#ff9740", ink: BLOOD },
    { name: "Variety Pack", image: "joyrush/variety-pack.png", bg: "#c5dd7f", ink: "#1d2817" },
  ],
  gummies: [
    { name: "Social Spark", image: "joyrush/gummy-social.png", bg: "#f15b45", ink: CREAM },
    { name: "Sweet Dreams", image: "joyrush/gummy-dreams.png", bg: "#85d8ff", ink: PLUM },
    { name: "Pure Zen", image: "joyrush/gummy-zen.png", bg: "#f287b6", ink: "#7d133d" },
    { name: "Stress Melt", image: "joyrush/gummy-melt.png", bg: "#b9b6db", ink: PLUM },
    { name: "Daily Elevation", image: "joyrush/gummy-elevation.png", bg: "#c5dd7f", ink: "#1d2817" },
  ],
  moods: [
    {
      title: "Unwind & Reset",
      desc: "Take a breath and let the day melt off. Made for after-work exhalations and cozy nights in.",
      image: "joyrush/mood-1.png",
    },
    {
      title: "Gather & Connect",
      desc: "Good company, easy laughter, and conversations that run long past sunset.",
      image: "joyrush/mood-2.png",
    },
  ],
});

const SCROLL_DISTANCE = PAGE_HEIGHT - 1010;

export const buildJoyrush: Scenario = {
  id: "build-joyrush",
  workspace: "joyrush",
  chatTitle: "Build my Shopify store",
  beats: [
    {
      kind: "prompt",
      text: "Build my Shopify store from these photos",
      attachments: [
        { name: "brand-01.jpg", image: "joyrush/drink-photo.jpg" },
        { name: "brand-02.jpg", image: "joyrush/mood-1.png" },
        { name: "brand-03.jpg", image: "joyrush/mood-2.png" },
      ],
    },
    { kind: "thinking" },
    { kind: "tool", label: "Understanding the task", duration: 38 },
    { kind: "tool", label: "Reading your brand photos", duration: 40 },
    { kind: "thinking", duration: 16 },
    { kind: "tool", label: "Extracting brand colors and type", duration: 36 },
    { kind: "tool", label: "Creating your store", duration: 42 },
    { kind: "artifact", title: "Storefront — Joy Rush", scene: joyrushScene, buildDuration: 74 },
    { kind: "tool", label: "Designing the hero", duration: 44 },
    { kind: "tool", label: "Adding sparkling juices", async: true, delay: 12, duration: 88 },
    { kind: "tool", label: "Adding gummies", async: true, delay: 128, duration: 60 },
    { kind: "tool", label: "Writing about and moods", async: true, delay: 195, duration: 90 },
    { kind: "tool", label: "Building bundles and footer", async: true, delay: 298, duration: 52 },
    { kind: "scroll", duration: 360, distance: SCROLL_DISTANCE },
    {
      kind: "say",
      text: "Your storefront is ready — hero, juices, gummies, moods and bundles, all built from your photos. Want me to publish it?",
    },
    { kind: "hold", duration: 20 },
  ],
  tail: 25,
};
