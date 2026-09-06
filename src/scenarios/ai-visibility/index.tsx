import { PromoScenario } from "../../engine/promo/scenario";
import { ChatScene } from "./chat-scene";
import { DashboardScene } from "./dashboard-scene";
import { TypeScene } from "./type-scene";
import { T } from "./timings";

export const aiVisibility: PromoScenario = {
  id: "ai-visibility",
  format: "wide",
  transition: "cut",
  scenes: [
    { kind: "custom", render: DashboardScene, duration: T.dashboard },
    { kind: "custom", render: TypeScene, duration: T.typePrompt },
    { kind: "custom", render: ChatScene, duration: T.chat },
  ],
};
