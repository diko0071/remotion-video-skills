import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { HighlightWord } from "../../kit/kinetic-text";
import { StrandWeb, webPositions, webSchedule, type WebNode, type WebRoot } from "../../kit/strand-web";

type Outlet = { domain: string; name: string; accent: string };

const OUTLETS: Outlet[] = [
  { domain: "yahoo.com", name: "Yahoo Finance", accent: "#6001D2" },
  { domain: "marketwatch.com", name: "MarketWatch", accent: "#00AC4E" },
  { domain: "apnews.com", name: "AP News", accent: "#FF322E" },
  { domain: "benzinga.com", name: "Benzinga", accent: "#0B1F42" },
  { domain: "digitaljournal.com", name: "Digital Journal", accent: "#B7222C" },
  { domain: "seekingalpha.com", name: "Seeking Alpha", accent: "#F26522" },
  { domain: "thestreet.com", name: "TheStreet", accent: "#16A34A" },
  { domain: "investing.com", name: "Investing.com", accent: "#1256A0" },
  { domain: "morningstar.com", name: "Morningstar", accent: "#E5352E" },
  { domain: "fooddive.com", name: "Food Dive", accent: "#5A2D82" },
  { domain: "eater.com", name: "Eater SF", accent: "#C8102E" },
  { domain: "aol.com", name: "AOL", accent: "#171310" },
];

const HEADLINE = "Dusk raises the bar on sleep tracking";
const BODY1 =
  "SAN FRANCISCO — Dusk today released its AI sleep coach for iPhone and Apple Watch: a nightly sleep score, stage-by-stage breakdown, and one change to make before bed.";
const BODY2 =
  "The app is available today on the App Store, with Android arriving in spring.";

const DOC = { x: 960 - 330, y: 150, w: 660 };

const EXTRA: Outlet[] = [
  { domain: "wsj.com", name: "Wall Street Journal", accent: "#171310" },
  { domain: "reuters.com", name: "Reuters", accent: "#FF8000" },
  { domain: "bloomberg.com", name: "Bloomberg", accent: "#171310" },
  { domain: "forbes.com", name: "Forbes", accent: "#33475B" },
  { domain: "businessinsider.com", name: "Business Insider", accent: "#185F7D" },
  { domain: "cnbc.com", name: "CNBC", accent: "#005594" },
  { domain: "fortune.com", name: "Fortune", accent: "#E32227" },
  { domain: "fastcompany.com", name: "Fast Company", accent: "#7F00FF" },
  { domain: "usatoday.com", name: "USA Today", accent: "#009BFF" },
  { domain: "latimes.com", name: "LA Times", accent: "#171310" },
  { domain: "chron.com", name: "Houston Chronicle", accent: "#B31B1B" },
  { domain: "seattletimes.com", name: "Seattle Times", accent: "#171310" },
  { domain: "miamiherald.com", name: "Miami Herald", accent: "#0F4C81" },
  { domain: "denverpost.com", name: "Denver Post", accent: "#9E1B32" },
  { domain: "sfchronicle.com", name: "SF Chronicle", accent: "#B31B1B" },
  { domain: "sfgate.com", name: "SFGate", accent: "#C8102E" },
  { domain: "bostonglobe.com", name: "Boston Globe", accent: "#171310" },
  { domain: "nypost.com", name: "NY Post", accent: "#C60800" },
  { domain: "thetimes.com", name: "The Times", accent: "#171310" },
  { domain: "dailyherald.com", name: "Daily Herald", accent: "#00427A" },
  { domain: "chroniclejournal.com", name: "Chronicle Journal", accent: "#1F4E79" },
  { domain: "nbcrightnow.com", name: "NBC Right Now", accent: "#6E55DC" },
  { domain: "abc7.com", name: "ABC 7", accent: "#171310" },
  { domain: "presstelegram.com", name: "Press Telegram", accent: "#00427A" },
  { domain: "observer.com", name: "The Observer", accent: "#D62828" },
  { domain: "globenewswire.com", name: "Globe Newswire", accent: "#1B5E9E" },
  { domain: "streetinsider.com", name: "Street Insider", accent: "#2B6CB0" },
  { domain: "tastingtable.com", name: "Tasting Table", accent: "#171310" },
];

const ALL: Outlet[] = [...OUTLETS, ...EXTRA];

const N = 200;
const ZOOM_FROM = 70;
const ZOOM_END = 244;
const COUNT_AT = 150;

const POS = webPositions(N, 960, 440);
const AT = webSchedule(N, 64);

const OutletPlate: React.FC<{ index: number }> = ({ index }) => {
  const outlet = ALL[index % ALL.length];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.07)",
        borderRadius: 11,
        boxShadow: "0 12px 30px rgba(74,53,29,0.16)",
        padding: "11px 18px",
        fontSize: 22,
        fontWeight: 700,
        color: "#171310",
        whiteSpace: "nowrap",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <Img
        src={staticFile(`press/${outlet.domain}.png`)}
        style={{ width: 30, height: 30, borderRadius: 7 }}
      />
      {outlet.name}
      <span style={{ width: 9, height: 9, borderRadius: 5, background: "#059669" }} />
    </div>
  );
};

const WEB_NODES: WebNode[] = POS.map((pos, i) => ({
  x: pos.x,
  y: pos.y,
  at: AT[i],
  el: <OutletPlate index={i} />,
}));

const WEB_ROOT: WebRoot = {
  x: 960,
  y: 470,
  rect: { l: DOC.x - 14, r: DOC.x + DOC.w + 14, t: DOC.y - 14, b: DOC.y + 656 },
};

export const PrScene: React.FC = () => {
  const frame = useCurrentFrame();
  const docIn = useReveal(4, 24, 20);
  const counterIn = useReveal(COUNT_AT, 18, 18);
  const count = interpolate(frame, [COUNT_AT, COUNT_AT + 70], [12, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom =
    frame < ZOOM_FROM
      ? 1
      : Math.pow(0.32, Math.min((frame - ZOOM_FROM) / (ZOOM_END - ZOOM_FROM), 1));
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: "960px 440px",
        }}
      >
        <StrandWeb nodes={WEB_NODES} root={WEB_ROOT} />
        <div
          style={{
            ...docIn,
            position: "absolute",
            left: DOC.x,
            top: DOC.y,
            width: DOC.w,
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 26px 70px rgba(74,53,29,0.22)",
            border: "1px solid rgba(23,19,16,0.06)",
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#8A6A3F",
              background: "#F6EEDF",
              borderRadius: 6,
              padding: "4px 10px",
            }}
          >
            Press release
          </span>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#171310", lineHeight: 1.25 }}>
            {HEADLINE}
          </span>
          <Img
            src={staticFile("dusk/content/post-01.png")}
            style={{ width: "100%", height: 210, objectFit: "cover", borderRadius: 12 }}
          />
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "rgba(23,19,16,0.75)" }}>
            {BODY1}
          </p>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "rgba(23,19,16,0.75)" }}>
            {BODY2}
          </p>
        </div>
      </div>
      <div
        style={{
          ...counterIn,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          textAlign: "center",
          fontSize: 78,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#171310",
        }}
      >
        <HighlightWord at={COUNT_AT + 74}>
          {Math.round(count)}
          {frame >= COUNT_AT + 68 ? "+" : ""}
        </HighlightWord>{" "}
        news sources
      </div>
    </AbsoluteFill>
  );
};

export const PR_TOTAL = 268;
