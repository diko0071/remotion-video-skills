import { PromoScenario } from "../../engine/promo/scenario";
import { HookScene } from "./hook-scene";
import { OutroScene } from "./outro-scene";
import { WordsScene } from "./words-scene";
import { T } from "./timings";

export const whyRyze: PromoScenario = {
  id: "why-ryze",
  format: "vertical",
  transition: "cut",
  scenes: [
    { kind: "custom", render: HookScene, duration: T.hook },
    { kind: "custom", render: WordsScene, duration: T.words },
    { kind: "custom", render: OutroScene, duration: T.outro },
  ],
};
