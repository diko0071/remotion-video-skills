import { Scenario } from "../../engine/demo/scenario";
import { BlogScene } from "./blog-scene";

export const buildBlog: Scenario = {
  id: "build-blog",
  workspace: "graza",
  chatTitle: "Write a Glog post",
  beats: [
    {
      kind: "prompt",
      text: "Make us a great blog page in our style: which of our three oils for which job",
      attachments: [
        { name: "lineup.jpg", image: "graza/trio.png" },
        { name: "kitchen.jpg", image: "graza/blt.jpg" },
        { name: "gift-pack.jpg", image: "graza/dinner-party.jpg" },
      ],
    },
    { kind: "thinking" },
    { kind: "tool", label: "Understanding the task", duration: 45 },
    { kind: "tool", label: "Reading your brand kit", duration: 50 },
    { kind: "tool", label: "Researching the product lineup", duration: 55 },
    {
      kind: "artifact",
      title: "Glog — The right oil for every job",
      scene: BlogScene,
      buildDuration: 130,
    },
    { kind: "tool", label: "Writing sections and pull quotes", duration: 60 },
    { kind: "tool", label: "Writing the oil ranking", async: true, delay: 25, duration: 100 },
    { kind: "tool", label: "Comparing use cases", async: true, delay: 130, duration: 110 },
    { kind: "tool", label: "Charting smoke points", async: true, delay: 245, duration: 90 },
    { kind: "tool", label: "Adding customer stories", async: true, delay: 340, duration: 80 },
    { kind: "tool", label: "Adding FAQ and closing", async: true, delay: 430, duration: 90 },
    { kind: "scroll", duration: 640, distance: 9900 },
    {
      kind: "say",
      text: "Your post is ready — hero, product ranking, cheat sheet, smoke-point chart and FAQ, all in your brand style. Want me to publish it to the Glog?",
    },
    { kind: "hold", duration: 45 },
  ],
};
