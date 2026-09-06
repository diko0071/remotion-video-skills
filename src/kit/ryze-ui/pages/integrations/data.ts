import { IntegrationGroup } from "./types";

export const INTEGRATION_GROUPS: IntegrationGroup[] = [
  {
    category: "AI",
    items: [
      {
        name: "Claude MCP",
        icon: "icons/ai/claude.png",
        description:
          "Add Ryze to Claude so you can ask your AI analyst about any campaign in plain English.",
        state: "connected",
      },
      {
        name: "ChatGPT MCP",
        icon: "integrations/openai-ads.svg",
        description:
          "Add Ryze to ChatGPT so you can ask your AI analyst about any campaign in plain English.",
        state: "none",
      },
      {
        name: "Anthropic",
        icon: "integrations/anthropic.svg",
        description:
          "Bring your own Anthropic API key. Chat runs on your key — no AI credits charged, only tools. Agent mode does not use your key; it always runs on Ryze and is billed in credits.",
        state: "none",
      },
    ],
  },
  {
    category: "Analytics",
    items: [
      {
        name: "Google Analytics 4",
        icon: "integrations/google-analytics.svg",
        description: "Traffic, landing pages, conversions, and engagement metrics.",
        state: "setup",
      },
      {
        name: "Google Search Console",
        icon: "integrations/google-search-console.svg",
        description: "Queries, impressions, clicks, CTR, position, and indexation.",
        state: "connected",
      },
      {
        name: "AppsFlyer",
        icon: "integrations/appsflyer.svg",
        description:
          "Mobile attribution: installs, in-app events, and aggregate metrics via the Pull API.",
        state: "none",
      },
      {
        name: "Ahrefs",
        icon: "integrations/ahrefs.svg",
        description:
          "Backlinks, referring domains, domain rating, and organic keyword data via the Ahrefs API v3.",
        state: "none",
      },
      {
        name: "Semrush",
        icon: "integrations/semrush.png",
        description:
          "Domain and keyword analytics, backlinks, and referring-domain data via the Semrush Analytics API.",
        state: "none",
      },
      {
        name: "PostHog",
        icon: "integrations/posthog.svg",
        description: "Product analytics: events, insights, funnels, and HogQL queries via the API.",
        state: "none",
      },
    ],
  },
  {
    category: "Commerce & CMS",
    items: [
      {
        name: "Shopify",
        icon: "integrations/shopify.svg",
        iconBg: "#95BF47",
        description: "Products, collections, pages, and store-wide SEO settings.",
        state: "connected",
      },
      {
        name: "Framer",
        icon: "integrations/framer.svg",
        description: "Project pages, custom code, redirects, and CMS collections.",
        state: "none",
      },
      {
        name: "WordPress",
        icon: "integrations/wordpress.svg",
        description: "Posts, pages, media, and site-wide content via the REST API.",
        state: "none",
      },
      {
        name: "GitHub",
        icon: "integrations/github.svg",
        description: "Publish articles as files committed to a repository on your own domain.",
        state: "none",
      },
      {
        name: "HubSpot",
        icon: "integrations/hubspot.svg",
        description: "Read and edit CRM records, lists, and CMS content from HubSpot.",
        state: "none",
      },
      {
        name: "Wix",
        icon: "integrations/wix.svg",
        description: "Auto-publish SEO articles to your Wix blog.",
        state: "none",
      },
      {
        name: "Ryze Hosting",
        icon: "icons/ryze-sun.png",
        description:
          "Host your blog on your own domain. We render the pages, you point one DNS record.",
        state: "connected",
      },
      {
        name: "Ghost",
        icon: "integrations/ghost.png",
        description: "Publish posts and manage content via the Admin API.",
        state: "none",
      },
      {
        name: "Lightspeed eCom",
        icon: "integrations/lightspeed.png",
        description: "Publish blog articles straight to your Lightspeed eCom store.",
        state: "none",
      },
      {
        name: "Webflow",
        icon: "integrations/webflow.svg",
        description: "Publish generated articles to a Webflow CMS collection.",
        state: "none",
      },
      {
        name: "Magento",
        icon: "integrations/magento.svg",
        description: "Products, categories, and CMS pages via the Magento 2 / Adobe Commerce REST API.",
        state: "none",
      },
      {
        name: "HighLevel",
        icon: "integrations/gohighlevel.png",
        description: "Publish generated articles to a HighLevel (GoHighLevel) blog.",
        state: "none",
      },
      {
        name: "Directus",
        icon: "integrations/directus.png",
        description:
          "Publish generated articles to a Directus collection and manage content via the REST API.",
        state: "none",
      },
    ],
  },
  {
    category: "Advertising",
    items: [
      {
        name: "Google Ads",
        icon: "integrations/google-ads.webp",
        description: "Campaigns, keywords, spend, and conversion performance.",
        state: "accounts",
        accountsCount: 2,
      },
      {
        name: "Meta Ads",
        icon: "integrations/meta-ads.svg",
        description: "Facebook and Instagram ad performance, spend, and audiences.",
        state: "connected",
      },
      {
        name: "LinkedIn Ads",
        icon: "integrations/linkedin-ads.svg",
        description: "Campaign performance, spend, and audience insights from LinkedIn Ads.",
        state: "none",
      },
      {
        name: "OpenAI Ads",
        icon: "integrations/openai-ads.svg",
        description: "Campaigns, ad groups, ads, and insights for ads in ChatGPT.",
        state: "none",
      },
      {
        name: "Thrad",
        icon: "integrations/thrads.svg",
        description: "Campaigns, ad groups, ads, and insights across Thrad and ChatGPT supply.",
        state: "none",
      },
      {
        name: "Microsoft Ads",
        icon: "integrations/microsoft-ads.svg",
        description: "Campaign performance, spend, and keyword insights from Microsoft Advertising.",
        state: "reconnect",
      },
      {
        name: "Snapchat Ads",
        icon: "integrations/snapchat-ads.svg",
        description: "Campaign performance, spend, and audience insights from Snapchat Ads.",
        state: "none",
      },
      {
        name: "TikTok Ads",
        icon: "integrations/tiktok-ads.svg",
        description: "Campaign performance, spend, and audience insights from TikTok Ads.",
        state: "none",
      },
      {
        name: "Reddit Ads",
        icon: "integrations/reddit-ads.svg",
        description: "Campaign performance, spend, and management from Reddit Ads.",
        state: "none",
      },
      {
        name: "Pinterest Ads",
        icon: "integrations/pinterest-ads.svg",
        description: "Campaign performance, spend, and management from Pinterest Ads.",
        state: "none",
      },
      {
        name: "Criteo",
        icon: "integrations/criteo.png",
        description:
          "Commerce media campaigns, audiences, and performance reporting via the Criteo Marketing Solutions API.",
        state: "none",
      },
      {
        name: "StackAdapt",
        icon: "integrations/stackadapt.png",
        description:
          "Programmatic campaigns, campaign groups, and delivery reporting via the StackAdapt GraphQL API.",
        state: "none",
      },
    ],
  },
  {
    category: "Messaging",
    items: [
      {
        name: "Klaviyo",
        icon: "integrations/klaviyo.svg",
        description: "Email and SMS campaigns, flows, lists, and reporting via the REST API.",
        state: "connected",
      },
      {
        name: "Slack",
        icon: "integrations/slack.svg",
        description:
          "Ask the agent about your marketing — ads, spend, traffic, and revenue — right in Slack.",
        state: "connected",
      },
      {
        name: "Mailchimp",
        icon: "integrations/mailchimp.png",
        description: "Email audiences, campaigns, automations, and reports via the Marketing API.",
        state: "none",
      },
    ],
  },
  {
    category: "Files",
    items: [
      {
        name: "Google Drive",
        icon: "integrations/google-drive.svg",
        description: "Sheets, Docs, and files you pick — read, update, and create.",
        state: "connected",
      },
    ],
  },
];

export const INTEGRATION_CATEGORIES = ["All", "AI", "Analytics", "Commerce & CMS", "Advertising", "Messaging", "Files"];
