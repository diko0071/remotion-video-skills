import type { PublishPlatform } from "./types";

export const SEO_SETTINGS_TITLE = "Settings";

export const SEO_SETTINGS_SUBTITLE = "How your content is written, illustrated and published";

export const SEO_SETTINGS_GROUPS = {
  content: "Content",
  publishing: "Publishing",
} as const;

export const PUBLISHING = {
  title: "Publishing",
  hint: "Where and how finished articles go live.",
  modeLabel: "Publishing mode",
  autoLabel: "Automatic",
  autoHint: "Content publishes on schedule",
  manualLabel: "Manual",
  manualHint: "You publish drafts yourself",
  targetLabel: "Publish to",
  targetHint: "Which connected CMS receives your articles.",
  targetEmptyLabel: "No CMS connected",
  blogUrlLabel: "Override blog URL",
  blogUrlHint: "Set only if readers see articles on a different address than the CMS.",
  blogUrlPlaceholder: "https://www.example.com/blog",
  blogUrlPreview: "Articles will be published at",
  platformsLabel: "Publishing platforms",
  platformsHint: "Connect your CMS once and new articles get published for you.",
  backlinksLabel: "Backlink exchange",
  backlinksHint: "Swap contextual links with non-competing clients.",
} as const;

export const CONNECT_LABEL = "Connect";

export const CONNECTED_LABEL = "Connected";

export const VIEW_LABEL = "View";

export const PUBLISH_PLATFORMS: PublishPlatform[] = [
  {
    id: "shopify",
    name: "Shopify",
    description: "Products, collections, pages, and store-wide SEO settings.",
    icon: "integrations/shopify.svg",
    iconBg: "#95BF47",
    state: "connected",
  },
  {
    id: "wordpress",
    name: "WordPress",
    description: "Posts, pages, media, and site-wide content via the REST API.",
    icon: "integrations/wordpress.svg",
    state: "none",
  },
  {
    id: "framer",
    name: "Framer",
    description: "Project pages, custom code, redirects, and CMS collections.",
    icon: "integrations/framer.svg",
    state: "none",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Publish articles as files committed to a repository on your own domain.",
    icon: "integrations/github.svg",
    state: "none",
  },
  {
    id: "wix",
    name: "Wix",
    description: "Auto-publish SEO articles to your Wix blog.",
    icon: "integrations/wix.svg",
    state: "none",
  },
  {
    id: "ghost",
    name: "Ghost",
    description: "Publish posts and manage content via the Admin API.",
    icon: "integrations/ghost.png",
    state: "none",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Read and edit CRM records, lists, and CMS content from HubSpot.",
    icon: "integrations/hubspot.svg",
    state: "none",
  },
  {
    id: "lightspeed",
    name: "Lightspeed eCom",
    description: "Publish blog articles straight to your Lightspeed eCom store.",
    icon: "integrations/lightspeed.png",
    state: "none",
  },
  {
    id: "webflow",
    name: "Webflow",
    description: "Publish generated articles to a Webflow CMS collection.",
    icon: "integrations/webflow.svg",
    state: "none",
  },
  {
    id: "magento",
    name: "Magento",
    description: "Products, categories, and CMS pages via the Magento 2 / Adobe Commerce REST API.",
    icon: "integrations/magento.svg",
    state: "none",
  },
  {
    id: "gohighlevel",
    name: "HighLevel",
    description: "Publish generated articles to a HighLevel (GoHighLevel) blog.",
    icon: "integrations/gohighlevel.png",
    state: "none",
  },
  {
    id: "directus",
    name: "Directus",
    description:
      "Publish generated articles to a Directus collection and manage content via the REST API.",
    icon: "integrations/directus.png",
    state: "none",
  },
  {
    id: "webhook",
    name: "Custom Webhook",
    description:
      "Publish generated articles to your own site via a webhook endpoint you control — for custom CMSes and site builders Ryze has no native integration for.",
    icon: "integrations/webhook.svg",
    state: "none",
  },
  {
    id: "ryze_sites",
    name: "Ryze Hosting",
    description: "Host your blog on your own domain. We render the pages, you point one DNS record.",
    icon: "icons/ryze-sun.png",
    state: "none",
  },
];
