import { PromoScenario } from "../../engine/promo/scenario";
import { ToolCard } from "../../kit/tool-card";
import { AuditFlow } from "./audit-flow";
import { F } from "./timings";

export const auditFix: PromoScenario = {
  id: "audit-fix",
  format: "square",
  scenes: [
    { kind: "title", heading: "AI runs your SEO audit.", sub: "Then fixes it", duration: 80 },
    {
      kind: "card",
      heading: "It checks everything",
      bare: true,
      duration: 175,
      node: (
        <ToolCard
          tools={[
            { label: "Crawling your store", detail: "214 pages · sitemaps", start: 8, done: 54 },
            { label: "Checking 31 SEO factors", detail: "meta · links · speed · indexing", start: 54, done: 106 },
            { label: "Reading Search Console", detail: "16 months of data", start: 106, done: 152 },
          ]}
        />
      ),
    },
    {
      kind: "card",
      bare: true,
      cardWidth: 760,
      duration: F.end,
      node: <AuditFlow />,
    },
    {
      kind: "outro",
      logo: "ryze-sun.png",
      heading: "Set it. Forget it.",
      pill: "ryze.ai",
      footnote: "Audit · Fix · Every week, automatically",
    },
  ],
};
