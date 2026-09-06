import { PromoScenario } from "../../engine/promo/scenario";
import { ComposerCard } from "./composer-card";
import { ToolsCard } from "./tools-card";
import { WorkflowCard } from "./workflow";
import { STAGE_W } from "./timings";

export const adsPromo: PromoScenario = {
  id: "ads-promo",
  format: "square",
  scenes: [
    { kind: "title", heading: "On-brand ad creatives. In minutes.", sub: "Ryze AI Marketer", duration: 80 },
    { kind: "card", heading: "Ask your marketer", node: <ComposerCard />, bare: true, duration: 150 },
    { kind: "card", heading: "It does the work", node: <ToolsCard />, bare: true, duration: 172 },
    { kind: "card", node: <WorkflowCard />, bare: true, cardWidth: STAGE_W, duration: 660 },
    {
      kind: "outro",
      logo: "ryze-sun.png",
      heading: "Meet your AI Marketer",
      pill: "ryze.ai",
      footnote: "SEO · Paid Ads · Creatives · Reports",
    },
  ],
};
