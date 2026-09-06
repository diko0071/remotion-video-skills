import React from "react";
import { DemoPlayer } from "../engine/demo/player";
import { Scenario } from "../engine/demo/scenario";
import { PromoScenario } from "../engine/promo/scenario";
import { PromoPlayer } from "../engine/promo/player";
import { buildVermillion } from "./build-vermillion";
import { buildJoyrush } from "./build-joyrush";
import { buildAfuri } from "./build-afuri";
import { buildBlog } from "./build-blog";
import { adsPromo } from "./ads-promo";
import { auditFix } from "./audit-fix";
import { mcpClaude } from "./mcp-claude";
import { approvalsAutopilot } from "./approvals-autopilot";
import { aiVisibility } from "./ai-visibility";
import { whyRyze } from "./why-ryze";
import { sceneLab } from "./scene-lab";

const demos: Scenario[] = [buildVermillion, buildJoyrush, buildAfuri, buildBlog];
const promos: PromoScenario[] = [adsPromo, auditFix, mcpClaude, approvalsAutopilot, aiVisibility, whyRyze, sceneLab];

export const demoComps = demos.map((scenario) => ({
  scenario,
  Component: (() => {
    const Bound: React.FC = () => <DemoPlayer scenario={scenario} />;
    Bound.displayName = `Demo_${scenario.id}`;
    return Bound;
  })(),
}));

export const promoComps = promos.map((scenario) => ({
  scenario,
  Component: (() => {
    const Bound: React.FC = () => <PromoPlayer scenario={scenario} />;
    Bound.displayName = `Promo_${scenario.id}`;
    return Bound;
  })(),
}));
