import React from "react";
import { PromoScenario } from "../../engine/promo/scenario";
import { LogoCycler } from "../../kit/logo-cycler";
import { UnderlineAccent } from "../../kit/underline-accent";
import { ChatScene, PopupScene, SettingsScene } from "./scenes";
import { CHAT, POPUP, SETTINGS } from "./timings";

const Title: React.FC = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    Ryze. Now in <UnderlineAccent drawAt={26}>Claude</UnderlineAccent>.
  </span>
);

export const mcpClaude: PromoScenario = {
  id: "mcp-claude",
  format: "square",
  scenes: [
    { kind: "title", heading: "", headingNode: <Title />, sub: "One connector. Your whole marketing stack.", duration: 90 },
    {
      kind: "card",
      heading: "Open Connectors",
      bare: true,
      cardWidth: 960,
      duration: SETTINGS.end,
      node: <SettingsScene />,
    },
    {
      kind: "card",
      heading: "Paste one link",
      bare: true,
      cardWidth: 560,
      duration: POPUP.end,
      node: <PopupScene />,
    },
    {
      kind: "card",
      heading: "And Claude becomes your marketer",
      bare: true,
      cardWidth: 960,
      duration: CHAT.end,
      node: <ChatScene />,
    },
    {
      kind: "card",
      heading: "Every channel you run",
      bare: true,
      duration: 178,
      node: (
        <LogoCycler
          hold={12}
          items={[
            { name: "Google Ads", image: "claude/int-google.png" },
            { name: "Shopify", image: "claude/int-shopify.png" },
            { name: "Meta Ads", image: "claude/int-meta.png" },
            { name: "TikTok Ads", image: "claude/int-tiktok.png" },
            { name: "WordPress", image: "claude/int-wordpress.png" },
            { name: "LinkedIn Ads", image: "claude/int-linkedin.png" },
            { name: "Klaviyo", image: "claude/int-klaviyo.png" },
            { name: "HubSpot", image: "claude/int-hubspot.png" },
            { name: "Semrush", image: "claude/int-semrush.png" },
            { name: "Ahrefs", image: "claude/int-ahrefs.png" },
            { name: "Framer", image: "claude/int-framer.png" },
            { name: "Webflow", image: "claude/int-webflow.png" },
            { name: "Reddit Ads", image: "claude/int-reddit.png" },
            { name: "Microsoft Ads", image: "claude/int-microsoft.png" },
          ]}
        />
      ),
    },
    {
      kind: "card",
      bare: true,
      duration: 130,
      node: (
        <div
          style={{
            textAlign: "center",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.18,
            color: "#171310",
            maxWidth: 900,
          }}
        >
          Your whole marketing stack,
          <br />
          available in <UnderlineAccent drawAt={30}>Claude</UnderlineAccent>
        </div>
      ),
    },
    {
      kind: "outro",
      logo: "ryze-sun.png",
      heading: "Your marketer, wherever you work",
      pill: "ryze.ai",
      footnote: "Works in Claude · MCP connector",
    },
  ],
};
