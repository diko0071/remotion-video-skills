import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, SPRINGS, springAt } from "../../core/motion";
import { SceneCursor, STAGE_ATTR, useObjectRects } from "../../core/stage";
import { ChromeFrame } from "../../kit/chrome-ui";
import { KeyedRig } from "../../kit/keyed-rig";
import { SfxTrack } from "../../kit/sfx";
import { siteView } from "./site";
import { OverviewStory } from "./story-overview";
import { SourcesStory } from "./story-sources";
import { AnySiteStory } from "./story-anysite";
import { AS, AS_LOCKUP, BADGE_AT, CAM, CLICK, CORAL, CURSOR_IN, CUT, GROUND, ICON_RECT, OPEN_LEN, OV, SR, TITLE, TOTAL } from "./timings";
import { RiseLetters } from "../../kit/rise-letters";
import { HEADLINE_FONT } from "../../kit/headline";

export const CHROME_EXT_TOTAL = TOTAL;

const VIEW = siteView("notion.so");
const TITLES: Record<string, string> = {
  "hubspot.com": "HubSpot | Software & Tools for your Business",
  "clickup.com": "ClickUp™ | The everything app, for work.",
  "stripe.com": "Stripe | Financial Infrastructure to Grow Your Revenue",
  "shopify.com": "Start and grow your e-commerce business | Shopify",
  "figma.com": "Figma: The Collaborative Interface Design Tool",
  "canva.com": "Canva: Visual Suite for Everyone",
  "webflow.com": "Webflow: Create a custom website | Visual website builder",
  "zapier.com": "Zapier | Automation that moves you forward",
  "asana.com": "Manage your team's work, projects, & tasks online • Asana",
  "mailchimp.com": "Mailchimp: Marketing, Automation & Email Platform",
  "monday.com": "monday.com | A new way of working",
  "slack.com": "Slack is where work happens",
  "vercel.com": "Vercel: Build and deploy the best web experiences",
  "trello.com": "Manage Your Team's Projects From Anywhere | Trello",
  "intercom.com": "Intercom: The complete AI-first customer service platform",
  "calendly.com": "Free Online Appointment Scheduling Software | Calendly",
  "loom.com": "Loom | Async Video Messaging for Work",
};
const NOTION = { view: VIEW, shot: "chrome-ext/sites/notion.png", title: "The AI workspace that works for you. | Notion" };
const SITES = AS.sites.map((domain) => ({ view: siteView(domain), shot: `chrome-ext/sites/${domain.split(".")[0]}.png`, title: TITLES[domain] }));
const EXT_ID = "chrome.ext";

const PanelBorn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rects = useObjectRects([EXT_ID]);
  if (frame < CLICK) return null;
  const icon = rects[EXT_ID];
  const from = icon ? { x: icon.x + 4, y: icon.y + 4, w: icon.width - 8, h: icon.height - 8 } : ICON_RECT;
  const p = springAt(frame, fps, CLICK, SPRINGS.panel, 24);
  const x = interpolate(p, [0, 1], [from.x, -200]);
  const y = interpolate(p, [0, 1], [from.y, -200]);
  const w = interpolate(p, [0, 1], [from.w, 2320]);
  const h = interpolate(p, [0, 1], [from.h, 1480]);
  const radius = interpolate(p, [0, 1], [ICON_RECT.radius, 40]);
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: radius, background: "#1a0e06", boxShadow: `0 24px 64px rgba(15,23,42,${0.28 * p})` }} />;
};

const Page: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = ramp(frame, CLICK, CLICK + 16);
  return (
    <ChromeFrame
      host="notion.so"
      tab={{ title: "The AI workspace that works for you. | Notion", favicon: VIEW.favicon }}
      badge={{ text: String(VIEW.cites), color: "#b54708", at: BADGE_AT }}
      extClickId={EXT_ID}
      pageStyle={{ filter: dim > 0.01 ? `blur(${dim * 8}px)` : undefined }}
    >
      <Img src={staticFile("chrome-ext/sites/notion.png")} />
    </ChromeFrame>
  );
};

const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const gone = ramp(frame, CLICK + 4, CLICK + 10);
  if (gone >= 1) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - gone, pointerEvents: "none" }}>
      <SceneCursor from={{ x: 1560, y: 1140 }} moves={[{ target: EXT_ID, at: CLICK, travel: 40 }]} appearAt={CURSOR_IN} scale={1} wander={0} />
    </div>
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < TITLE.at) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: HEADLINE_FONT, textAlign: "center" }}>
      <div style={{ fontSize: 44, fontWeight: 500, letterSpacing: "0.02em", color: "rgba(255,255,255,.55)", textTransform: "uppercase" }}>
        <RiseLetters text="Introducing" from={TITLE.sub} step={1} rise={0.3} blur={10} />
      </div>
      <div style={{ marginTop: 28, fontSize: 132, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF" }}>
        <RiseLetters text={["One-click", " AI", " visibility."]} from={[TITLE.line, TITLE.line + 5, TITLE.line + 9]} len={9} rise={0.35} blur={14} letterStyle={(_, i) => (i === 0 ? { color: CORAL } : {})} />
      </div>
    </AbsoluteFill>
  );
};

const Open: React.FC = () => (
  <>
    <KeyedRig id="chrome-ext-cam" keys={CAM} bg={GROUND}>
      <Page />
      <PanelBorn />
      <Cursor />
    </KeyedRig>
    <Title />
  </>
);

export const ChromeExt: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
    <Sequence from={CUT.open} durationInFrames={OPEN_LEN} layout="none">
      <Open />
    </Sequence>
    <Sequence from={CUT.overview} durationInFrames={OV.len} layout="none">
      <OverviewStory view={VIEW} />
    </Sequence>
    <Sequence from={CUT.sources} durationInFrames={SR.len} layout="none">
      <SourcesStory view={VIEW} shot={NOTION.shot} title={NOTION.title} />
    </Sequence>
    <Sequence from={CUT.anysite} durationInFrames={AS_LOCKUP + AS.lockupLen} layout="none">
      <AnySiteStory sites={SITES} first={NOTION} />
    </Sequence>
    <SfxTrack hits={[{ name: "mouse-click", at: CLICK }, { name: "mouse-click", at: CUT.sources + SR.overviewAt }]} />
  </AbsoluteFill>
);
