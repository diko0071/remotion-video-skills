import React from "react";
import {
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont as loadRoboto } from "@remotion/google-fonts/RobotoCondensed";
import { loadFont as loadNoto } from "@remotion/google-fonts/NotoSansJP";
import { ArtifactSceneProps } from "../../engine/demo/scenario";
import { SPRINGS, useReveal as useRevealCore } from "../../core/motion";
import { buildFrame, buildScrollAt, travelBlur } from "../../kit/build-scroll";
import { BuiltImg } from "../../kit/built-img";
import { useLocalFonts } from "../../kit/local-font";
import { BUILD_FRACS, OFFSETS, PAGE_HEIGHT, SCROLL_STOPS, SECTION_HEIGHTS } from "./timings";

const LOCAL_FONTS = [
  { family: "Roslindale", url: staticFile("vermillion/Roslindale-DisplayCondensedLight.woff2"), weight: "300" },
  { family: "Roslindale", url: staticFile("vermillion/Roslindale-DisplayCondensedRegular.woff2"), weight: "400" },
];
const { fontFamily: robotoCond } = loadRoboto("normal", { weights: ["400", "700"] });
const { fontFamily: notoJp } = loadNoto("normal", {
  weights: ["400", "500"],
  subsets: ["japanese", "latin"],
});

const RED = "#af1e15";
const PAPER = "#eeeeee";
const INK = "#222222";
const display = `Roslindale, serif`;
const body = `${robotoCond}, ${notoJp}, sans-serif`;
const jp = `${notoJp}, sans-serif`;

const ease = SPRINGS.smooth;
const useReveal = (start: number, dist = 24) => useRevealCore(start, dist, 26);

export type VermillionContent = {
  pins: Array<{ name: string; price: string; image: string }>;
  collections: Array<{ num: string; name: string; desc: string; image: string }>;
  journal: Array<{ cat: string; title: string; image: string }>;
};

export const makeVermillionScene =
  (content: VermillionContent): React.FC<ArtifactSceneProps> =>
  ({ revealStart, scrollStart, scrollEnd, scrollDistance }) => (
    <VermillionScene
      content={content}
      localStart={revealStart}
      scrollStart={scrollStart}
      scrollEnd={scrollEnd}
      scrollDistance={scrollDistance}
    />
  );

export const VermillionScene: React.FC<{
  content: VermillionContent;
  localStart: number;
  scrollStart: number;
  scrollEnd: number;
  scrollDistance?: number;
}> = ({ content, localStart, scrollStart, scrollEnd, scrollDistance = PAGE_HEIGHT - 1010 }) => {
  useLocalFonts(LOCAL_FONTS);
  const frame = useCurrentFrame();
  const scroll = buildScrollAt(frame, scrollStart, scrollEnd, SCROLL_STOPS, scrollDistance);
  const speed = Math.abs(
    scroll - buildScrollAt(frame - 1, scrollStart, scrollEnd, SCROLL_STOPS, scrollDistance),
  );
  const blur = travelBlur(speed);
  const tBuild = (frac: number) => buildFrame(scrollStart, scrollEnd, frac);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: PAPER,
        color: INK,
        fontFamily: body,
      }}
    >
      <div
        style={{
          transform: `translateY(${-scroll}px)`,
          filter: blur > 0 ? `blur(${blur.toFixed(1)}px)` : undefined,
          position: "relative",
          height: PAGE_HEIGHT,
        }}
      >
        <Hero start={localStart} />
        <PickUp start={tBuild(BUILD_FRACS.pickup)} pins={content.pins} />
        <Collection
          start={tBuild(BUILD_FRACS.sign)}
          top={OFFSETS.sign}
          data={content.collections[0]}
          flip={false}
        />
        <Collection
          start={tBuild(BUILD_FRACS.zodiac)}
          top={OFFSETS.zodiac}
          data={content.collections[1]}
          flip
        />
        <Journal start={tBuild(BUILD_FRACS.journal)} entries={content.journal} />
        <Footer start={tBuild(BUILD_FRACS.footer)} />
        <div
          style={{
            position: "absolute",
            top: PAGE_HEIGHT,
            left: 0,
            right: 0,
            height: 300,
            background: RED,
          }}
        />
      </div>
    </div>
  );
};

const Hero: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imgP = spring({ frame: frame - (start - 16), fps, config: ease, durationInFrames: 28 });
  const markP = spring({ frame: frame - (start + 12), fps, config: ease, durationInFrames: 30 });
  const headerStyle = useReveal(start + 22, 14);
  const hintStyle = useReveal(start + 32, 12);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.hero,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.hero,
        background: RED,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: imgP,
          transform: `scale(${interpolate(imgP, [0, 1], [1.12, 1])})`,
        }}
      >
        <Sequence from={start - 16} layout="none">
          <Video
            src={staticFile("vermillion/hero-01-pc.mp4")}
            muted
            loop
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </Sequence>
      </div>
      <div
        style={{
          ...headerStyle,
          position: "absolute",
          top: 22,
          left: 34,
          right: 34,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: body,
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: PAPER,
        }}
      >
        <span>Item&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;Gallery&nbsp;&nbsp;&nbsp;Journal&nbsp;&nbsp;&nbsp;News&nbsp;&nbsp;&nbsp;Press</span>
        <span>Login&nbsp;&nbsp;&nbsp;Wishlist (0)&nbsp;&nbsp;&nbsp;Cart (0)</span>
      </div>
      <Img
        src={staticFile("vermillion/hero-title.svg")}
        style={{
          position: "absolute",
          left: "4%",
          right: "4%",
          width: "92%",
          top: 380,
          opacity: markP,
          transform: `translateY(${interpolate(markP, [0, 1], [46, 0])}px)`,
          filter: markP < 0.96 ? `blur(${((1 - markP) * 7).toFixed(1)}px)` : undefined,
        }}
      />
      <div
        style={{
          ...hintStyle,
          position: "absolute",
          bottom: 26,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: PAPER,
        }}
      >
        Scroll
      </div>
    </section>
  );
};

const PIN_LAYOUT: Array<{ left: number; top: number; size: number }> = [
  { left: 64, top: 168, size: 320 },
  { left: 452, top: 118, size: 232 },
  { left: 762, top: 210, size: 252 },
  { left: 452, top: 432, size: 296 },
];

const Pin: React.FC<{
  pin: { name: string; price: string; image: string };
  slot: { left: number; top: number; size: number };
  start: number;
}> = ({ pin, slot, start }) => {
  const captionStyle = useReveal(start + 10, 12);
  return (
    <div style={{ position: "absolute", left: slot.left, top: slot.top, width: slot.size }}>
      <BuiltImg
        src={pin.image}
        start={start}
        style={{ width: slot.size, height: slot.size, background: "#fff" }}
      />
      <div style={{ ...captionStyle, marginTop: 10, fontFamily: jp, fontSize: 11.5, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 500 }}>{pin.name}</div>
        <div style={{ color: "rgba(34,34,34,0.55)", marginTop: 2 }}>{pin.price}</div>
      </div>
    </div>
  );
};

const PickUp: React.FC<{ start: number; pins: VermillionContent["pins"] }> = ({ start, pins }) => {
  const titleStyle = useReveal(start, 26);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.pickup,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.pickup,
        background: PAPER,
      }}
    >
      <div
        style={{
          ...titleStyle,
          position: "absolute",
          top: 54,
          left: 64,
          fontFamily: display,
          fontWeight: 400,
          fontSize: 62,
          letterSpacing: "0.02em",
          color: INK,
        }}
      >
        PICK UP
      </div>
      {pins.slice(0, 4).map((pin, i) => (
        <Pin key={pin.image} pin={pin} slot={PIN_LAYOUT[i]} start={start + 10 + i * 9} />
      ))}
    </section>
  );
};

const Collection: React.FC<{
  start: number;
  top: number;
  data: VermillionContent["collections"][number];
  flip: boolean;
}> = ({ start, top, data, flip }) => {
  const color = flip ? RED : INK;
  const numStyle = useReveal(start + 8, 16);
  const nameStyle = useReveal(start + 14, 34);
  const descStyle = useReveal(start + 24, 18);
  const moreStyle = useReveal(start + 32, 12);
  const imgW = 560;
  const imgH = Math.round((imgW / 960) * 1275);
  const textLeft = flip ? 66 : 700;
  return (
    <section
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.sign,
        background: PAPER,
        color,
      }}
    >
      <BuiltImg
        src={data.image}
        start={start}
        style={{
          position: "absolute",
          top: 78,
          left: flip ? 445 : 66,
          width: imgW,
          height: imgH,
        }}
      />
      <div style={{ ...numStyle, position: "absolute", top: 86, left: textLeft, fontSize: 13, fontWeight: 700 }}>
        {data.num}
      </div>
      <div
        style={{
          ...nameStyle,
          position: "absolute",
          top: 116,
          left: textLeft - 8,
          fontFamily: display,
          fontWeight: 300,
          fontSize: 108,
          lineHeight: 1,
          letterSpacing: "0.01em",
          writingMode: "vertical-lr",
          height: 560,
        }}
      >
        {data.name}
      </div>
      <div
        style={{
          ...descStyle,
          position: "absolute",
          top: 130,
          left: textLeft + 130,
          width: 240,
          fontFamily: jp,
          fontSize: 12.5,
          fontWeight: 500,
          lineHeight: 2.1,
        }}
      >
        {data.desc}
      </div>
      <div
        style={{
          ...moreStyle,
          position: "absolute",
          top: 700,
          left: textLeft,
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          borderBottom: `1px solid ${color}`,
          paddingBottom: 6,
        }}
      >
        View more
      </div>
    </section>
  );
};

const JournalCard: React.FC<{
  entry: { cat: string; title: string; image: string };
  index: number;
  start: number;
}> = ({ entry, index, start }) => {
  const captionStyle = useReveal(start + 10, 12);
  const size = 292;
  return (
    <div style={{ position: "absolute", left: 64 + index * (size + 24), top: 150, width: size }}>
      <BuiltImg src={entry.image} start={start} style={{ width: size, height: size }} />
      <div style={{ ...captionStyle, marginTop: 12 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: RED,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: jp,
          }}
        >
          {entry.cat}
        </div>
        <div style={{ marginTop: 6, fontFamily: jp, fontSize: 13, fontWeight: 500, lineHeight: 1.6 }}>
          {entry.title}
        </div>
      </div>
    </div>
  );
};

const Journal: React.FC<{ start: number; entries: VermillionContent["journal"] }> = ({
  start,
  entries,
}) => {
  const titleStyle = useReveal(start, 24);
  const linkStyle = useReveal(start + 8, 12);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.journal,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.journal,
        background: PAPER,
        color: INK,
      }}
    >
      <div
        style={{
          ...titleStyle,
          position: "absolute",
          top: 56,
          left: 64,
          fontFamily: display,
          fontWeight: 400,
          fontSize: 54,
        }}
      >
        Journal
      </div>
      <div
        style={{
          ...linkStyle,
          position: "absolute",
          top: 84,
          right: 64,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          borderBottom: `1px solid ${INK}`,
          paddingBottom: 5,
        }}
      >
        View all
      </div>
      {entries.slice(0, 3).map((entry, i) => (
        <JournalCard key={entry.image} entry={entry} index={i} start={start + 8 + i * 8} />
      ))}
    </section>
  );
};

const FOOTER_LINKS = [
  ["Shopping Guide", "After Care", "Contact"],
  ["Terms & Conditions", "Privacy Policy"],
  ["Instagram", "X"],
];

const Footer: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const newsStyle = useReveal(start, 20);
  const linksStyle = useReveal(start + 8, 16);
  const markP = spring({ frame: frame - (start + 16), fps, config: ease, durationInFrames: 34 });
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.footer,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.footer,
        background: RED,
        color: PAPER,
        overflow: "hidden",
      }}
    >
      <div style={{ ...newsStyle, position: "absolute", top: 64, left: 64 }}>
        <div style={{ fontFamily: display, fontWeight: 400, fontSize: 44 }}>Mail Magazine</div>
        <div
          style={{
            marginTop: 18,
            width: 330,
            borderBottom: `1px solid rgba(238,238,238,0.6)`,
            paddingBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "rgba(238,238,238,0.75)",
          }}
        >
          <span>Email address</span>
          <span>&#8594;</span>
        </div>
      </div>
      <div
        style={{
          ...linksStyle,
          position: "absolute",
          top: 70,
          right: 64,
          display: "flex",
          gap: 56,
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.1em",
          lineHeight: 2.4,
        }}
      >
        {FOOTER_LINKS.map((col) => (
          <div key={col[0]}>
            {col.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 58,
          right: 58,
          bottom: 44,
          height: 245,
          backgroundColor: PAPER,
          WebkitMask: `url(${staticFile("vermillion/hero-title.svg")}) no-repeat center / contain`,
          mask: `url(${staticFile("vermillion/hero-title.svg")}) no-repeat center / contain`,
          opacity: markP,
          transform: `translateY(${interpolate(markP, [0, 1], [36, 0])}px)`,
        }}
      />
    </section>
  );
};
