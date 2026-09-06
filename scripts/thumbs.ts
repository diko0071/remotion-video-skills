import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const THUMBS: Record<string, { title: string; accent?: string }> = {
  "guide-schedules": { title: "How to set up scheduled tasks", accent: "scheduled tasks" },
  "guide-templates": { title: "How to use templates", accent: "templates" },
  "guide-visibility": { title: "How AI visibility works", accent: "visibility" },
  "guide-approvals": { title: "How Approvals work", accent: "Approvals" },
  "guide-technical-audit": { title: "How the Technical Audit works", accent: "Technical" },
  "guide-brand": { title: "How the Brand page works", accent: "Brand" },
  "guide-backlink-exchange": { title: "How the Backlink Exchange works", accent: "Backlink" },
  "guide-blog-studio": { title: "How the Blog Studio works", accent: "Blog" },
  "guide-seo-setup": { title: "How to set up SEO in Ryze", accent: "SEO" },
  "guide-publishing": { title: "How publishing works", accent: "publishing" },
  "guide-writing-articles": { title: "Make every article yours", accent: "yours" },
  "guide-competitor-ads": { title: "How Competitor Ads work", accent: "Competitor" },
  "guide-creatives": { title: "Ad creatives, made by asking", accent: "creatives" },
  "guide-reports": { title: "Reports in Ryze, made by asking", accent: "Reports" },
  "guide-agent": { title: "Meet the Ryze Agent", accent: "Agent" },
  "guide-platform-overview": { title: "Ryze in ninety seconds", accent: "Ryze" },
  "guide-paid-ads-overview": { title: "Paid ads, on autopilot", accent: "Paid ads" },
  "guide-mcp": { title: "Ryze inside Claude", accent: "Claude" },
};

const only = process.argv[2];
const outDir = path.join(process.cwd(), "out", "thumbs");
mkdirSync(outDir, { recursive: true });

for (const [id, props] of Object.entries(THUMBS)) {
  if (only && id !== only) continue;
  const out = path.join(outDir, `${id}.png`);
  execSync(
    `bunx remotion still guide-thumb "${out}" --props='${JSON.stringify(props)}' --log=error`,
    { stdio: "inherit" },
  );
  console.log(`thumb ${id}`);
}
