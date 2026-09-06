import { PromoScenario } from "../../engine/promo/scenario";
import { ApprovalsScene } from "./approvals-scene";
import { AutopilotScene } from "./autopilot-scene";
import { AvalancheScene } from "./avalanche-scene";
import { ResearchScene } from "./research-scene";
import { T } from "./timings";
import { TitleScene } from "./title-scene";

export const approvalsAutopilot: PromoScenario = {
  id: "approvals-autopilot",
  format: "wide",
  transition: "cut",
  scenes: [
    { kind: "custom", render: TitleScene, duration: T.title },
    { kind: "custom", render: ResearchScene, duration: T.research },
    { kind: "custom", render: ApprovalsScene, duration: T.approvals },
    { kind: "custom", render: AvalancheScene, duration: T.avalanche },
    { kind: "custom", render: AutopilotScene, duration: T.autopilot },
    {
      kind: "outro",
      logo: "ryze-sun.png",
      heading: "You approve. Ryze ships.",
      pill: "ryze.ai",
      footnote: "Research · Approvals · Apply — every week",
      duration: T.outroShort,
    },
  ],
};
