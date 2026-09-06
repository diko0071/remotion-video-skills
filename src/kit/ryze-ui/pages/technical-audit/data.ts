import { AuditRow } from "./types";

export const AUDIT_SITE_ROW: AuditRow = {
  url: "Site-wide checks",
  site: true,
  score: 54,
  open: true,
  issues: [
    {
      name: "llms.txt missing",
      severity: "warning",
      fix: "Create llms.txt in your root directory describing your site structure and key pages.",
    },
    {
      name: "AI crawler blocked in robots.txt",
      severity: "warning",
      fix: "Allow AI crawlers in robots.txt so your content can appear in AI answers.",
    },
    {
      name: "Organization + WebSite schema on homepage",
      severity: "warning",
      fix: "Add Organization and WebSite JSON-LD with sameAs links to your homepage.",
    },
  ],
  passed: [
    { label: "Sitemap", description: "Validates sitemap.xml presence, structure and page coverage." },
    { label: "SSL & HTTPS", description: "Ensures HTTPS works and pages load no insecure resources." },
  ],
};

export const AUDIT_PAGE_ROWS: AuditRow[] = [
  {
    url: "https://ember-and-oak.com/pages/wholesale-2024",
    score: 21,
    issues: [
      {
        name: "4XX/5XX page still gets organic clicks",
        severity: "critical",
        fix: "301-redirect the URL to the closest live page to keep the traffic.",
      },
      {
        name: "Page links to broken pages",
        severity: "warning",
        fix: "Update or remove the broken internal links.",
      },
    ],
    passed: [],
  },
  { url: "https://ember-and-oak.com/collections/autumn-2025", score: 34, issues: [], count: 5 },
  { url: "https://ember-and-oak.com/products/cedar-smoke-3-wick", score: 47, issues: [], count: 4 },
  { url: "https://ember-and-oak.com/products/vetiver-ember-travel-tin", score: 52, issues: [], count: 4 },
  { url: "https://ember-and-oak.com/collections/gift-sets-under-50", score: 58, issues: [], count: 3 },
  { url: "https://ember-and-oak.com/blogs/journal/how-we-pour", score: 63, issues: [], count: 3 },
];
