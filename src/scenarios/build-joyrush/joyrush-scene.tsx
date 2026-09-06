import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPacifico } from "@remotion/google-fonts/Pacifico";
import { ArtifactSceneProps } from "../../engine/demo/scenario";
import { SPRINGS, Ticker, useReveal as useRevealCore } from "../../core/motion";
import { buildFrame, buildScrollAt, travelBlur } from "../../kit/build-scroll";
import { BuiltImg } from "../../kit/built-img";
import { useLocalFonts } from "../../kit/local-font";
import { BUILD_FRACS, OFFSETS, PAGE_HEIGHT, SCROLL_STOPS, SECTION_HEIGHTS } from "./timings";

const LOCAL_FONTS = [
  { family: "Fedro", url: staticFile("joyrush/Fedro-Semibold.woff"), weight: "600" },
  { family: "Montreal", url: staticFile("joyrush/PPNeueMontreal-Medium.woff"), weight: "500" },
  { family: "Montreal", url: staticFile("joyrush/PPNeueMontreal-Bold.woff"), weight: "700" },
];
const { fontFamily: script } = loadPacifico();

const CREAM = "#fbf6ed";
const BLOOD = "#9a1902";
const PLUM = "#2f1948";
const FIRE = "#fe431a";
const display = "Fedro, sans-serif";
const body = "Montreal, sans-serif";

const ease = SPRINGS.smooth;
const useReveal = (start: number, dist = 24) => useRevealCore(start, dist, 26);

export type JoyrushContent = {
  juices: Array<{ name: string; image: string; bg: string; ink: string }>;
  gummies: Array<{ name: string; image: string; bg: string; ink: string }>;
  moods: Array<{ title: string; desc: string; image: string }>;
};

export const makeJoyrushScene =
  (content: JoyrushContent): React.FC<ArtifactSceneProps> =>
  ({ revealStart, scrollStart, scrollEnd, scrollDistance }) => (
    <JoyrushScene
      content={content}
      localStart={revealStart}
      scrollStart={scrollStart}
      scrollEnd={scrollEnd}
      scrollDistance={scrollDistance}
    />
  );

export const JoyrushScene: React.FC<{
  content: JoyrushContent;
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
        background: CREAM,
        color: BLOOD,
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
        <JuiceShowcase start={tBuild(BUILD_FRACS.juices)} items={content.juices} />
        <GummyGrid start={tBuild(BUILD_FRACS.gummies)} items={content.gummies} />
        <About start={tBuild(BUILD_FRACS.about)} />
        <JoyLife start={tBuild(BUILD_FRACS.joylife)} moods={content.moods} />
        <Bundle start={tBuild(BUILD_FRACS.bundle)} />
        <Footer start={tBuild(BUILD_FRACS.footer)} />
        <div
          style={{
            position: "absolute",
            top: PAGE_HEIGHT,
            left: 0,
            right: 0,
            height: 300,
            background: CREAM,
          }}
        />
      </div>
      <FloatingButtons start={localStart + 30} />
    </div>
  );
};

const FloatingButtons: React.FC<{ start: number }> = ({ start }) => {
  const style = useReveal(start, 14);
  return (
    <div
      style={{
        ...style,
        position: "absolute",
        right: 22,
        bottom: 22,
        display: "flex",
        gap: 10,
      }}
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: FIRE,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={CREAM} strokeWidth="1.6">
            {i === 0 ? (
              <>
                <circle cx="10" cy="12" r="6" />
                <path d="M10 6c0-2 1.5-3.5 3.5-3.5" />
              </>
            ) : (
              <>
                <path d="M4 7h12l-1.2 10H5.2L4 7z" />
                <path d="M7 7c0-2 1.3-3.6 3-3.6S13 5 13 7" />
              </>
            )}
          </svg>
        </span>
      ))}
    </div>
  );
};

const Hero: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imgP = spring({ frame: frame - (start - 22), fps, config: ease, durationInFrames: 24 });
  const headerStyle = useReveal(start + 4, 14);
  const titleP = spring({ frame: frame - (start + 12), fps, config: ease, durationInFrames: 30 });
  const btnStyle = useReveal(start + 28, 16);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.hero,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.hero,
        background: "#2a120a",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("joyrush/drink-photo.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: imgP,
          transform: `scale(${
            interpolate(imgP, [0, 1], [1.1, 1]) +
            interpolate(frame, [start + 20, start + 260], [0, 0.06], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          })`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 160,
          background: "linear-gradient(180deg, rgba(26,10,5,0.5) 0%, rgba(26,10,5,0) 100%)",
          opacity: imgP,
        }}
      />
      <div style={{ ...headerStyle, position: "absolute", top: 24, left: 30, right: 30 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: CREAM,
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em" }}>
            PRODUCTS &#9662;&nbsp;&nbsp;&nbsp;LEARN &#9662;
          </span>
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: script,
              fontSize: 30,
            }}
          >
            Joy Rush
          </span>
          <span style={{ display: "flex", gap: 10 }}>
            {["ACCOUNT", "CART"].map((label) => (
              <span
                key={label}
                style={{
                  border: `1.5px solid ${CREAM}`,
                  borderRadius: 999,
                  padding: "9px 18px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: CREAM,
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [40, 0])}px)`,
          filter: titleP < 0.96 ? `blur(${((1 - titleP) * 6).toFixed(1)}px)` : undefined,
        }}
      >
        <div
          style={{
            fontFamily: display,
            fontSize: 64,
            lineHeight: 1.02,
            textTransform: "uppercase",
            letterSpacing: "0.005em",
            textShadow: "0 2px 30px rgba(26,10,5,0.35)",
          }}
        >
          THC-infused sparkling
          <br />
          juices &amp; gummies
        </div>
        <div
          style={{
            marginTop: 24,
            maxWidth: 430,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            lineHeight: 1.7,
            textTransform: "uppercase",
          }}
        >
          Crafted for those who want to live fully and savor joyful moments&mdash;all while making
          smarter lifestyle choices.
        </div>
        <div style={{ ...btnStyle, marginTop: 30, display: "flex", gap: 8 }}>
          <span
            style={{
              background: CREAM,
              color: PLUM,
              borderRadius: 999,
              padding: "16px 30px",
              fontWeight: 700,
              fontSize: 12.5,
              letterSpacing: "0.08em",
            }}
          >
            SHOP NOW
          </span>
          <span
            style={{
              width: 47,
              height: 47,
              borderRadius: 999,
              border: `1.5px solid ${CREAM}`,
              color: CREAM,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            &#8599;
          </span>
        </div>
      </div>
    </section>
  );
};

const CLOUD_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 160'><circle cx='55' cy='60' r='42'/><circle cx='105' cy='42' r='40'/><circle cx='152' cy='68' r='38'/><circle cx='60' cy='108' r='40'/><circle cx='112' cy='112' r='44'/><circle cx='155' cy='104' r='34'/></svg>\") center / contain no-repeat";

const CloudPhoto: React.FC<{
  src: string;
  start: number;
  left: number;
  top: number;
  size: number;
}> = ({ src, start, left, top, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: ease, durationInFrames: 30 });
  const h = size * 0.8;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: h + 14,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 14,
          width: size,
          height: h,
          background: FIRE,
          WebkitMask: CLOUD_MASK,
          mask: CLOUD_MASK,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: size,
          height: h,
          WebkitMask: CLOUD_MASK,
          mask: CLOUD_MASK,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

const About: React.FC<{ start: number }> = ({ start }) => {
  const titleStyle = useReveal(start, 30);
  const textStyle = useReveal(start + 20, 18);
  const rowStyle = useReveal(start + 28, 14);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.about,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.about,
        background: CREAM,
        color: PLUM,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...titleStyle,
          margin: "64px auto 0",
          maxWidth: 900,
          textAlign: "center",
          fontFamily: display,
          fontSize: 44,
          lineHeight: 1.08,
          textTransform: "uppercase",
        }}
      >
        Clean, functional, feel good drinks and gummies that enhance joyful moments
      </div>
      <CloudPhoto src="joyrush/mood-1.png" start={start + 10} left={44} top={280} size={300} />
      <CloudPhoto src="joyrush/lifestyle.jpg" start={start + 18} left={300} top={420} size={340} />
      <CloudPhoto src="joyrush/mood-2.png" start={start + 26} left={400} top={250} size={220} />
      <div style={{ ...textStyle, position: "absolute", right: 56, top: 380, width: 350 }}>
        <div style={{ fontFamily: display, fontSize: 27, lineHeight: 1.25 }}>
          Joy Rush isn&rsquo;t just another thc brand. It&rsquo;s a cultural shift in how we
          socialize, unwind, and celebrate.
        </div>
        <div
          style={{
            ...rowStyle,
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              border: `1.5px solid ${PLUM}`,
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            ABOUT US
          </span>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: `1.5px solid ${PLUM}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            &#8599;
          </span>
          <span style={{ fontSize: 15, letterSpacing: "0.14em", color: PLUM }}>
            &#9733;&#9733;&#9733;&#9733;&#9734;
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textDecoration: "underline",
            }}
          >
            170 REVIEWS
          </span>
        </div>
      </div>
    </section>
  );
};

const JUICE_TAGLINES: Record<string, string> = {
  "Tropical Tangerine": "Bright citrus fizz for golden afternoons.",
  "Lush Cherry": "Deep cherry sparkle, smooth and mellow.",
  "Wild Berries": "A juicy berry rush with a calm finish.",
};

const JuiceFeature: React.FC<{
  item: { name: string; image: string; bg: string; ink: string };
  index: number;
  start: number;
  top: number;
}> = ({ item, index, start, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: ease, durationInFrames: 30 });
  const canP = spring({ frame: frame - (start + 8), fps, config: ease, durationInFrames: 32 });
  const textStyle = useReveal(start + 16, 20);
  const flip = index % 2 === 1;
  return (
    <div
      style={{
        position: "absolute",
        left: 24,
        right: 24,
        top,
        height: 420,
        borderRadius: 24,
        background: item.bg,
        color: item.ink,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(item.image)}
        style={{
          position: "absolute",
          top: 20,
          [flip ? "left" : "right"]: 70,
          height: 380,
          objectFit: "contain",
          opacity: canP,
          transform: `translateY(${interpolate(canP, [0, 1], [46, 0])}px) rotate(${flip ? -4 : 4}deg)`,
        } as React.CSSProperties}
      />
      <div
        style={{
          ...textStyle,
          position: "absolute",
          [flip ? "right" : "left"]: 56,
          top: 96,
          width: 430,
          textAlign: flip ? "right" : "left",
        } as React.CSSProperties}
      >
        <div style={{ fontFamily: display, fontSize: 56, lineHeight: 1.02 }}>{item.name}</div>
        <div style={{ marginTop: 16, fontSize: 15, fontWeight: 500, lineHeight: 1.55, opacity: 0.85 }}>
          {JUICE_TAGLINES[item.name] ?? ""}
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 10,
            justifyContent: flip ? "flex-end" : "flex-start",
          }}
        >
          <span
            style={{
              border: `1.5px solid currentColor`,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            ZERO PROOF
          </span>
          <span
            style={{
              border: `1.5px solid currentColor`,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            10MG THC
          </span>
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          SHOP {item.name.toUpperCase()} &rarr;
        </div>
      </div>
    </div>
  );
};

const JuiceShowcase: React.FC<{ start: number; items: JoyrushContent["juices"] }> = ({
  start,
  items,
}) => {
  const tickerStyle = useReveal(start, 20);
  const features = [items[0], items[2], items[1]];
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.juices,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.juices,
        background: CREAM,
        color: BLOOD,
      }}
    >
      <div
        style={{
          ...tickerStyle,
          borderTop: `1px solid rgba(154,25,2,0.25)`,
          borderBottom: `1px solid rgba(154,25,2,0.25)`,
          padding: "16px 0",
          marginTop: 40,
        }}
      >
        <Ticker
          items={["low calorie", "functional ingredients", "no added sugars", "gluten free"]}
          speed={1.4}
          style={{
            fontFamily: display,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: BLOOD,
          }}
        />
      </div>
      {features.map((item, i) => (
        <JuiceFeature
          key={item.name}
          item={item}
          index={i}
          start={start + 10 + (i === 2 ? 62 : i * 26)}
          top={132 + i * 436}
        />
      ))}
    </section>
  );
};

const GUMMY_SLOTS: Array<{ left: number; top: number; w: number }> = [
  { left: 24, top: 150, w: 333 },
  { left: 371, top: 150, w: 333 },
  { left: 718, top: 150, w: 333 },
  { left: 197, top: 486, w: 333 },
  { left: 544, top: 486, w: 333 },
];

const GummyCard: React.FC<{
  item: { name: string; image: string; bg: string; ink: string };
  slot: { left: number; top: number; w: number };
  start: number;
}> = ({ item, slot, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: ease, durationInFrames: 28 });
  return (
    <div
      style={{
        position: "absolute",
        left: slot.left,
        top: slot.top,
        width: slot.w,
        height: 320,
        borderRadius: 22,
        background: item.bg,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px)`,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(item.image)}
        style={{
          position: "absolute",
          left: "50%",
          top: 20,
          height: 195,
          transform: "translateX(-50%)",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 52,
          textAlign: "center",
          fontFamily: display,
          fontSize: 26,
          lineHeight: 1.05,
          color: item.ink,
        }}
      >
        {item.name}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 22,
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: item.ink,
          opacity: 0.75,
        }}
      >
        10MG THC
      </div>
    </div>
  );
};

const GummyGrid: React.FC<{ start: number; items: JoyrushContent["gummies"] }> = ({
  start,
  items,
}) => {
  const titleStyle = useReveal(start, 26);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.gummies,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.gummies,
        background: CREAM,
        color: BLOOD,
      }}
    >
      <div
        style={{
          ...titleStyle,
          textAlign: "center",
          marginTop: 60,
          fontFamily: display,
          fontSize: 52,
          textTransform: "uppercase",
          letterSpacing: "0.01em",
        }}
      >
        blends built to match moods
      </div>
      {items.slice(0, 5).map((item, i) => (
        <GummyCard key={item.name} item={item} slot={GUMMY_SLOTS[i]} start={start + 12 + i * 7} />
      ))}
      <ShopAllLink start={start + 54} top={838} />
    </section>
  );
};

const ShopAllLink: React.FC<{ start: number; top: number }> = ({ start, top }) => {
  const style = useReveal(start, 12);
  return (
    <div
      style={{
        ...style,
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      shop all &rarr;
    </div>
  );
};

const JoyLife: React.FC<{ start: number; moods: JoyrushContent["moods"] }> = ({ start, moods }) => {
  const titleStyle = useReveal(start, 30);
  const subStyle = useReveal(start + 10, 16);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.joylife,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.joylife,
        background: PLUM,
        color: CREAM,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...titleStyle,
          position: "absolute",
          top: 70,
          left: 56,
          fontFamily: display,
          fontSize: 58,
          lineHeight: 1.04,
        }}
      >
        Life is a Lot.
        <br />
        Joy Should be Too.
      </div>
      <div
        style={{
          ...subStyle,
          position: "absolute",
          top: 96,
          right: 56,
          width: 300,
          fontSize: 13.5,
          lineHeight: 1.6,
          opacity: 0.85,
        }}
      >
        Joy Rush is crafted to turn hectic moments and busy days into joyful harmony and total
        balance.
      </div>
      {moods.slice(0, 2).map((mood, i) => (
        <MoodCard key={mood.title} mood={mood} index={i} start={start + 16 + i * 10} />
      ))}
    </section>
  );
};

const MoodCard: React.FC<{
  mood: { title: string; desc: string; image: string };
  index: number;
  start: number;
}> = ({ mood, index, start }) => {
  const captionStyle = useReveal(start + 10, 12);
  const w = 452;
  return (
    <div style={{ position: "absolute", left: 56 + index * (w + 24), top: 280, width: w }}>
      <BuiltImg
        src={mood.image}
        start={start}
        style={{ width: w, height: 360, borderRadius: 20 }}
      />
      <div style={{ ...captionStyle, marginTop: 18 }}>
        <div style={{ fontFamily: display, fontSize: 26 }}>{mood.title}</div>
        <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.6, opacity: 0.8, maxWidth: 400 }}>
          {mood.desc}
        </div>
      </div>
    </div>
  );
};

const Bundle: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleStyle = useReveal(start, 30);
  const subStyle = useReveal(start + 10, 16);
  const chip1 = useReveal(start + 18, 14);
  const chip2 = useReveal(start + 24, 14);
  const packP = spring({ frame: frame - (start + 8), fps, config: ease, durationInFrames: 32 });
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.bundle,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.bundle,
        background: FIRE,
        color: CREAM,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...titleStyle,
          position: "absolute",
          top: 84,
          left: 56,
          fontFamily: display,
          fontSize: 74,
          lineHeight: 0.98,
          textTransform: "uppercase",
        }}
      >
        Bundle
        <br />
        &amp; save
      </div>
      <div
        style={{
          ...subStyle,
          position: "absolute",
          top: 300,
          left: 56,
          width: 330,
          fontSize: 13.5,
          lineHeight: 1.6,
          opacity: 0.92,
        }}
      >
        Why pick one? Curate your evening with a variety pack or add in some gummies — a little
        something for every feeling.
      </div>
      <div
        style={{
          ...chip1,
          position: "absolute",
          top: 420,
          left: 56,
          border: `1.5px solid ${CREAM}`,
          borderRadius: 999,
          padding: "13px 24px",
          fontFamily: display,
          fontSize: 16,
          textTransform: "uppercase",
        }}
      >
        Spend $50 &mdash; save $5
      </div>
      <div
        style={{
          ...chip2,
          position: "absolute",
          top: 490,
          left: 56,
          border: `1.5px solid ${CREAM}`,
          borderRadius: 999,
          padding: "13px 24px",
          fontFamily: display,
          fontSize: 16,
          textTransform: "uppercase",
        }}
      >
        Spend $75 &mdash; free shipping
      </div>
      <Img
        src={staticFile("joyrush/variety-pack.png")}
        style={{
          position: "absolute",
          right: -40,
          top: 60,
          width: 620,
          opacity: packP,
          transform: `translateY(${interpolate(packP, [0, 1], [44, 0])}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 56,
          bottom: 40,
          fontFamily: display,
          fontSize: 20,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          opacity: 0.95,
        }}
      >
        order more. save more. joy more.
      </div>
    </section>
  );
};

const Footer: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const linksStyle = useReveal(start, 16);
  const markP = spring({ frame: frame - (start + 12), fps, config: ease, durationInFrames: 34 });
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.footer,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.footer,
        background: CREAM,
        color: BLOOD,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...linksStyle,
          position: "absolute",
          top: 56,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span>Products &mdash; Learn &mdash; Contact</span>
        <span>Instagram &mdash; TikTok</span>
        <span>21+ only</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          textAlign: "center",
          fontFamily: script,
          fontSize: 190,
          lineHeight: 1,
          color: FIRE,
          opacity: markP,
          transform: `translateY(${interpolate(markP, [0, 1], [40, 0])}px)`,
        }}
      >
        Joy Rush
      </div>
    </section>
  );
};
