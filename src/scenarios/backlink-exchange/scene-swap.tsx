import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { ChainArrow } from "../../kit/chain-arrow";
import { HighlightWord } from "../../kit/kinetic-text";
import { CandleIcon, CoffeeIcon, LinenIcon } from "./scene-emails";

const CARD_W = 566;
const COLS = [64, 677, 1290];
const TOP = 250;

const YOU_IN = -8;
const LINK_A_YOU = 58;
const LINK_YOU_B = 104;
const DR_UP = [196, 214, 232];
export const SWAP_TOTAL = 292;

const DrBadge: React.FC<{ dr: number; upAt: number }> = ({ dr, upAt }) => {
  const frame = useCurrentFrame();
  const up = useSpringAt(upAt, SPRINGS.pop, 20);
  const bumped = frame >= upAt + 6;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 13,
        fontWeight: 800,
        color: "#0F6B4F",
        background: "#DEF3EA",
        borderRadius: 6,
        padding: "3px 8px",
        transform: `scale(${1 + (1 - Math.abs(1 - up * 2)) * 0.25})`,
      }}
    >
      DR {bumped ? dr + 2 : dr}
      {frame >= upAt ? (
        <span style={{ color: "#059669", opacity: up, fontSize: 14 }}>{"\u2191"}</span>
      ) : null}
    </span>
  );
};

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      alignSelf: "flex-start",
      fontSize: 15,
      fontWeight: 800,
      letterSpacing: "0.03em",
      textTransform: "uppercase",
      color: "#8A6A3F",
      background: "#F6EEDF",
      borderRadius: 6,
      padding: "4px 10px",
    }}
  >
    {children}
  </span>
);

const Article: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  site: string;
  tag: string;
  dr: number;
  drUpAt: number;
  you?: boolean;
  title: string;
  para: string;
  anchor: string;
  after: string;
  anchorAt: number;
}> = ({ icon, iconBg, site, tag, dr, drUpAt, you, title, para, anchor, after, anchorAt }) => (
  <div
    style={{
      width: "100%",
      background: "#FFFFFF",
      borderRadius: 14,
      boxShadow: you ? "0 26px 66px rgba(74,53,29,0.26)" : "0 20px 50px rgba(74,53,29,0.15)",
      border: you ? "2px solid #C19767" : "1px solid rgba(23,19,16,0.06)",
      padding: "26px 30px",
      display: "flex",
      flexDirection: "column",
      gap: 13,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: iconBg,
          color: "#FFFFFF",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 19, fontWeight: 800, color: "#171310" }}>{site}</span>
      <DrBadge dr={dr} upAt={drUpAt} />
    </div>
    <Tag>{tag}</Tag>
    <span style={{ fontSize: 24, fontWeight: 800, color: "#171310", lineHeight: 1.25 }}>
      {title}
    </span>
    <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "rgba(23,19,16,0.76)" }}>
      {para}{" "}
      <HighlightWord at={anchorAt}>
        <span style={{ textDecoration: "underline", textDecorationColor: "#C19767" }}>
          {anchor}
        </span>
      </HighlightWord>{" "}
      {after}
    </p>
    <span style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ height: 8, width: "90%", borderRadius: 4, background: "rgba(23,19,16,0.07)" }} />
      <span style={{ height: 8, width: "74%", borderRadius: 4, background: "rgba(23,19,16,0.07)" }} />
    </span>
  </div>
);

export const SwapScene: React.FC = () => {
  const aIn = useReveal(LINK_A_YOU - 22, 26, 20);
  const youIn = useReveal(YOU_IN, 26, 20);
  const bIn = useReveal(LINK_YOU_B - 22, 26, 20);
  const noteIn = useReveal(244, 18, 18);
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <ChainArrow at={LINK_A_YOU} y={216} fromX={COLS[0] + CARD_W - 70} toX={COLS[1] + 70} />
      <ChainArrow at={LINK_YOU_B} y={216} fromX={COLS[1] + CARD_W - 70} toX={COLS[2] + 70} />
      <div style={{ ...aIn, position: "absolute", left: COLS[0], top: TOP, width: CARD_W }}>
        <Article
          icon={<LinenIcon size={17} />}
          iconBg="#4A6FA5"
          site="stillmind.app"
          tag="meditation app"
          dr={64}
          title="What we listen to before bed"
          para="Our wind-down sessions pair well with the"
          anchor="sleep scores from dusk.app"
          after="— our team checks them every morning."
          anchorAt={LINK_A_YOU + 10}
          drUpAt={DR_UP[1]}
        />
      </div>
      <div style={{ ...youIn, position: "absolute", left: COLS[1], top: TOP, width: CARD_W }}>
        <Article
          icon={<CoffeeIcon size={17} />}
          iconBg="#171310"
          site="dusk.app"
          tag="you make a sleep app"
          dr={49}
          you
          title="The habits behind a good night"
          para="Consistent bedtimes get easier with the"
          anchor="streak tracking in loopy.app"
          after="running quietly in the background."
          anchorAt={LINK_YOU_B + 10}
          drUpAt={DR_UP[0]}
        />
      </div>
      <div style={{ ...bIn, position: "absolute", left: COLS[2], top: TOP, width: CARD_W }}>
        <Article
          icon={<CandleIcon size={17} />}
          iconBg="#B4632A"
          site="loopy.app"
          tag="habit tracker"
          dr={57}
          title="Small streaks, big weeks"
          para="The evening streak works best next to"
          anchor="a wind-down routine"
          after="— one habit feeds the other."
          anchorAt={LINK_YOU_B + 16}
          drUpAt={DR_UP[2]}
        />
      </div>
      <div
        style={{
          ...noteIn,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 96,
          textAlign: "center",
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#171310",
        }}
      >
        Every rating <HighlightWord at={262}>climbs.</HighlightWord>
      </div>
    </AbsoluteFill>
  );
};
