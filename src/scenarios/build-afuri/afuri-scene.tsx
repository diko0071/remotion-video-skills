import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadNoto } from "@remotion/google-fonts/NotoSansJP";
import { ArtifactSceneProps } from "../../engine/demo/scenario";
import { SPRINGS, useReveal as useRevealCore } from "../../core/motion";
import { buildFrame, buildScrollAt, travelBlur } from "../../kit/build-scroll";
import { BuiltImg } from "../../kit/built-img";
import { BUILD_FRACS, OFFSETS, PAGE_HEIGHT, PANEL_VIEW, SCROLL_STOPS, SECTION_HEIGHTS } from "./timings";

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "600", "700", "800"] });
const { fontFamily: notoJp } = loadNoto("normal", {
  weights: ["400", "500", "700"],
  subsets: ["japanese", "latin"],
});

const INK = "#1d1d1d";
const WHITE = "#ffffff";
const RED = "#fe3620";
const PAPER = "#f9f9f9";
const latin = `${inter}, sans-serif`;
const jp = `${notoJp}, sans-serif`;

const ease = SPRINGS.smooth;
const useReveal = (start: number, dist = 24) => useRevealCore(start, dist, 26);

export type AfuriContent = {
  products: Array<{
    badge: string;
    name: string;
    desc: string;
    meters: [number, number, number];
    price: string;
    image: string;
  }>;
  about: Array<{ label: string; title: string; desc: string; image: string }>;
  news: Array<{ num: string; title: string; image: string }>;
};

export const makeAfuriScene =
  (content: AfuriContent): React.FC<ArtifactSceneProps> =>
  ({ revealStart, scrollStart, scrollEnd, scrollDistance }) => (
    <AfuriScene
      content={content}
      localStart={revealStart}
      scrollStart={scrollStart}
      scrollEnd={scrollEnd}
      scrollDistance={scrollDistance}
    />
  );

export const AfuriScene: React.FC<{
  content: AfuriContent;
  localStart: number;
  scrollStart: number;
  scrollEnd: number;
  scrollDistance?: number;
}> = ({ content, localStart, scrollStart, scrollEnd, scrollDistance = PAGE_HEIGHT - PANEL_VIEW }) => {
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
        background: WHITE,
        color: INK,
        fontFamily: jp,
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
        <Products start={tBuild(BUILD_FRACS.products)} products={content.products} />
        <Goods start={tBuild(BUILD_FRACS.goods)} />
        <About start={tBuild(BUILD_FRACS.about)} entries={content.about} />
        <News start={tBuild(BUILD_FRACS.news)} entries={content.news} />
        <Mountain start={tBuild(BUILD_FRACS.mountain)} />
        <Footer start={tBuild(BUILD_FRACS.footer)} />
        <div
          style={{
            position: "absolute",
            top: PAGE_HEIGHT,
            left: 0,
            right: 0,
            height: 300,
            background: WHITE,
          }}
        />
      </div>
    </div>
  );
};

const Hero: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgP = spring({ frame: frame - (start - 16), fps, config: ease, durationInFrames: 28 });
  const slideP = spring({ frame: frame - (start + 4), fps, config: ease, durationInFrames: 30 });
  const markP = spring({ frame: frame - (start + 14), fps, config: ease, durationInFrames: 30 });
  const headerStyle = useReveal(start + 24, 14);
  const taglineStyle = useReveal(start + 34, 14);
  const hintStyle = useReveal(start + 40, 12);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.hero,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.hero,
        background: "#8fc6e8",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgP,
          transform: `scale(${interpolate(bgP, [0, 1], [1.1, 1])})`,
        }}
      >
        <Img
          src={staticFile("afuri/kv-bg.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "18%",
          right: "18%",
          top: 0,
          bottom: 0,
          opacity: slideP,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("afuri/kv-01.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${interpolate(slideP, [0, 1], [1.1, 1])})`,
          }}
        />
      </div>
      <div
        style={{
          ...headerStyle,
          position: "absolute",
          top: 26,
          left: 36,
          right: 36,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Img src={staticFile("afuri/wordmark.svg")} style={{ height: 13 }} />
        <span
          style={{
            fontFamily: latin,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: WHITE,
          }}
        >
          BEER &amp; GOODS&nbsp;&nbsp;&nbsp;ABOUT&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;CART ( 0 )
        </span>
      </div>
      <div
        style={{
          ...taglineStyle,
          position: "absolute",
          top: 200,
          left: 36,
          fontFamily: jp,
          fontSize: 12.5,
          fontWeight: 500,
          lineHeight: 2,
          color: WHITE,
        }}
      >
        AFURIらしいやり方で、
        <br />
        <span style={{ borderBottom: `1px solid ${WHITE}`, paddingBottom: 2 }}>
          ビールをつくってみたい
        </span>
        と思った。
      </div>
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: 64,
          opacity: markP,
          transform: `translateY(${interpolate(markP, [0, 1], [42, 0])}px)`,
          filter: markP < 0.96 ? `blur(${((1 - markP) * 7).toFixed(1)}px)` : undefined,
        }}
      >
        <Img src={staticFile("afuri/wordmark.svg")} style={{ width: 620 }} />
        <Img src={staticFile("afuri/wordmark-jp.svg")} style={{ width: 200, marginTop: 18, display: "block" }} />
      </div>
      <div
        style={{
          ...hintStyle,
          position: "absolute",
          bottom: 30,
          right: 36,
          fontFamily: latin,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: WHITE,
        }}
      >
        Scroll down
      </div>
    </section>
  );
};

const CanPips: React.FC<{ value: number }> = ({ value }) => (
  <span style={{ display: "inline-flex", gap: 2.5, alignItems: "center" }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        style={{
          width: 6.5,
          height: 10,
          borderRadius: 2,
          background: i < value ? INK : "#d9d9d9",
        }}
      />
    ))}
  </span>
);

const Meter: React.FC<{ label: string; value: number; last?: boolean }> = ({
  label,
  value,
  last,
}) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    <span style={{ fontSize: 11.5, fontWeight: 700 }}>{label}</span>
    <CanPips value={value} />
    {!last && <span style={{ margin: "0 8px", fontSize: 10, color: "rgba(29,29,29,0.4)" }}>・</span>}
  </span>
);

const PRODUCT_W = 306;

const ProductCard: React.FC<{
  product: AfuriContent["products"][number];
  index: number;
  start: number;
}> = ({ product, index, start }) => {
  const captionStyle = useReveal(start + 10, 14);
  return (
    <div style={{ position: "absolute", left: 52 + index * (PRODUCT_W + 27), top: 150, width: PRODUCT_W }}>
      <div style={{ position: "relative" }}>
        <BuiltImg
          src={product.image}
          start={start}
          style={{ width: PRODUCT_W, height: 396, background: "#eaeaea" }}
        />
        <div
          style={{
            ...captionStyle,
            position: "absolute",
            top: 14,
            left: 14,
            background: WHITE,
            color: INK,
            fontFamily: jp,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "6px 12px",
          }}
        >
          {product.badge}
        </div>
      </div>
      <div style={{ ...captionStyle, marginTop: 18 }}>
        <div style={{ fontFamily: jp, fontSize: 20, fontWeight: 700, letterSpacing: "0.02em" }}>
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 12,
            paddingBottom: 12,
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Meter label="香り" value={product.meters[0]} />
          <Meter label="苦味" value={product.meters[1]} />
          <Meter label="ボディ" value={product.meters[2]} last />
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 12.5,
            fontWeight: 500,
            lineHeight: 2,
            color: "rgba(29,29,29,0.85)",
          }}
        >
          {product.desc}
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: latin, fontSize: 19, fontWeight: 700 }}>{product.price}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>〔6本〕〜</span>
        </div>
      </div>
    </div>
  );
};

const Products: React.FC<{ start: number; products: AfuriContent["products"] }> = ({
  start,
  products,
}) => {
  const titleStyle = useReveal(start, 26);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.products,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.products,
        background: WHITE,
      }}
    >
      <div style={{ ...titleStyle, position: "absolute", top: 58, left: 52 }}>
        <div style={{ fontFamily: latin, fontWeight: 800, fontSize: 46, letterSpacing: "0.02em" }}>
          LINE UP
        </div>
        <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "rgba(29,29,29,0.55)" }}>
          AFURIのクラフトビール
        </div>
      </div>
      {products.slice(0, 3).map((product, i) => (
        <ProductCard key={product.image} product={product} index={i} start={start + 10 + i * 9} />
      ))}
    </section>
  );
};

const Goods: React.FC<{ start: number }> = ({ start }) => {
  const titleStyle = useReveal(start + 8, 24);
  const linkStyle = useReveal(start + 16, 14);
  const descStyle = useReveal(start + 22, 14);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.goods,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.goods,
        background: WHITE,
      }}
    >
      <BuiltImg
        src="afuri/beer-goods.jpg"
        start={start}
        style={{ position: "absolute", top: 0, left: 0, width: 700, height: SECTION_HEIGHTS.goods }}
      />
      <div style={{ position: "absolute", left: 756, right: 52, top: 96 }}>
        <div
          style={{
            ...titleStyle,
            borderTop: `2px solid ${INK}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontFamily: jp, fontSize: 27, fontWeight: 700, lineHeight: 1.75 }}>
            私たちのつくった
            <br />
            すべてのビール
          </div>
          <div style={{ marginTop: 6 }}>
            <CircleIcon />
          </div>
        </div>
        <div
          style={{
            ...linkStyle,
            marginTop: 34,
            fontFamily: latin,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.18em",
            borderBottom: `1px solid #d9d9d9`,
            paddingBottom: 16,
          }}
        >
          BEER &amp; GOODS
        </div>
        <div
          style={{
            ...descStyle,
            marginTop: 22,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 2.2,
            color: "rgba(29,29,29,0.85)",
          }}
        >
          AFURI BREWING がつくってきた全てのビールをご覧いただけます。ご自宅で楽しめるオリジナルグラスもご用意しています。
        </div>
      </div>
    </section>
  );
};

const AboutBlock: React.FC<{
  entry: AfuriContent["about"][number];
  flip: boolean;
  top: number;
  start: number;
}> = ({ entry, flip, top, start }) => {
  const labelStyle = useReveal(start + 8, 14);
  const titleStyle = useReveal(start + 14, 22);
  const descStyle = useReveal(start + 22, 16);
  const imgW = 560;
  const imgH = 360;
  const textLeft = flip ? 52 : 660;
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, height: imgH }}>
      <BuiltImg
        src={entry.image}
        start={start}
        style={{
          position: "absolute",
          top: 0,
          left: flip ? 463 : 52,
          width: imgW,
          height: imgH,
        }}
      />
      <div
        style={{
          ...labelStyle,
          position: "absolute",
          top: 34,
          left: textLeft,
          fontFamily: latin,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "rgba(29,29,29,0.55)",
        }}
      >
        {entry.label}
      </div>
      <div
        style={{
          ...titleStyle,
          position: "absolute",
          top: 66,
          left: textLeft,
          width: 360,
          fontFamily: jp,
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.7,
        }}
      >
        {entry.title}
      </div>
      <div
        style={{
          ...descStyle,
          position: "absolute",
          top: 200,
          left: textLeft,
          width: 350,
          fontSize: 12.5,
          fontWeight: 500,
          lineHeight: 2.1,
          color: "rgba(29,29,29,0.8)",
        }}
      >
        {entry.desc}
      </div>
    </div>
  );
};

const About: React.FC<{ start: number; entries: AfuriContent["about"] }> = ({ start, entries }) => (
  <section
    style={{
      position: "absolute",
      top: OFFSETS.about,
      left: 0,
      right: 0,
      height: SECTION_HEIGHTS.about,
      background: PAPER,
    }}
  >
    <AboutBlock entry={entries[0]} flip={false} top={80} start={start} />
    <AboutBlock entry={entries[1]} flip top={500} start={start + 14} />
  </section>
);

const NEWS_W = 224;

const NewsCard: React.FC<{
  entry: AfuriContent["news"][number];
  index: number;
  start: number;
}> = ({ entry, index, start }) => {
  const captionStyle = useReveal(start + 10, 12);
  return (
    <div style={{ position: "absolute", left: 52 + index * (NEWS_W + 25), top: 168, width: NEWS_W }}>
      <BuiltImg src={entry.image} start={start} style={{ width: NEWS_W, height: 290 }} />
      <div style={{ ...captionStyle, marginTop: 12 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: RED,
          }}
        >
          お知らせ
        </div>
        <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 500, lineHeight: 1.7 }}>
          <span style={{ fontFamily: latin, fontWeight: 700 }}>{entry.num}</span>｜{entry.title}
        </div>
      </div>
    </div>
  );
};

const News: React.FC<{ start: number; entries: AfuriContent["news"] }> = ({ start, entries }) => {
  const titleStyle = useReveal(start, 24);
  const linkStyle = useReveal(start + 8, 12);
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.news,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.news,
        background: WHITE,
      }}
    >
      <div style={{ ...titleStyle, position: "absolute", top: 60, left: 52 }}>
        <div style={{ fontFamily: latin, fontWeight: 800, fontSize: 46, letterSpacing: "0.02em" }}>
          NEWS
        </div>
        <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "rgba(29,29,29,0.55)" }}>
          お知らせ
        </div>
      </div>
      <div
        style={{
          ...linkStyle,
          position: "absolute",
          top: 88,
          right: 52,
          fontFamily: latin,
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
      {entries.slice(0, 4).map((entry, i) => (
        <NewsCard key={entry.image} entry={entry} index={i} start={start + 8 + i * 7} />
      ))}
    </section>
  );
};

const Mountain: React.FC<{ start: number }> = ({ start }) => (
  <BuiltImg
    src="afuri/bottom-bg.webp"
    start={start}
    style={{
      position: "absolute",
      top: OFFSETS.mountain,
      left: 0,
      right: 0,
      height: SECTION_HEIGHTS.mountain,
    }}
  />
);

const FOOTER_MENU = [
  "ニュース",
  "お問い合わせ",
  "よくあるご質問",
  "プライバシーポリシー",
  "特定商取引法に基づく表記",
  "ログイン",
];

const CircleIcon: React.FC = () => (
  <span
    style={{
      width: 16,
      height: 16,
      borderRadius: 16,
      border: `1px solid ${INK}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span style={{ width: 4, height: 4, borderRadius: 4, background: INK }} />
  </span>
);

const Footer: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const navStyle = useReveal(start + 6, 12);
  const menuStyle = useReveal(start + 12, 16);
  const mailStyle = useReveal(start + 16, 16);
  const barStyle = useReveal(start + 22, 12);
  const canP = spring({ frame: frame - (start + 4), fps, config: ease, durationInFrames: 36 });
  const markP = spring({ frame: frame - (start + 26), fps, config: ease, durationInFrames: 34 });
  return (
    <section
      style={{
        position: "absolute",
        top: OFFSETS.footer,
        left: 0,
        right: 0,
        height: SECTION_HEIGHTS.footer,
        background: WHITE,
        color: INK,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...navStyle,
          position: "absolute",
          top: 34,
          left: 52,
          right: 52,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: latin,
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ borderBottom: `1px solid ${INK}`, paddingBottom: 2 }}>HOME</span>
          <span style={{ color: "#bfbfbf" }}>⋮</span>
          <span>BEER &amp; GOODS</span>
          <span style={{ color: "#bfbfbf" }}>⋮</span>
          <span>ABOUT</span>
        </span>
        <span>CART〔 0 〕</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 60,
          transform: "translateX(-50%)",
          width: 340,
          opacity: canP,
        }}
      >
        <Img
          src={staticFile("afuri/can-shadow.webp")}
          style={{ position: "absolute", top: 14, left: 0, width: 340 }}
        />
        <Img
          src={staticFile("afuri/footer-can.png")}
          style={{
            position: "relative",
            width: 300,
            marginLeft: 20,
            display: "block",
            transform: `translateY(${interpolate(canP, [0, 1], [46, 0])}px)`,
          }}
        />
      </div>
      <div
        style={{
          ...menuStyle,
          position: "absolute",
          top: 200,
          left: 52,
          fontFamily: jp,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 2.7,
        }}
      >
        {FOOTER_MENU.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div style={{ ...mailStyle, position: "absolute", top: 210, right: 52, width: 280 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid #d9d9d9`,
            paddingTop: 16,
            fontFamily: jp,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <span>メルマガの登録</span>
          <CircleIcon />
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 11.5,
            fontWeight: 500,
            lineHeight: 1.9,
            color: "rgba(29,29,29,0.75)",
          }}
        >
          新商品やイベント、お得な情報など
          <br />
          会員限定情報をお届けします。
        </div>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid #d9d9d9`,
            paddingTop: 16,
            fontFamily: latin,
            fontSize: 13.5,
            fontWeight: 700,
          }}
        >
          <span>AFURI Official Site</span>
          <CircleIcon />
        </div>
      </div>
      <div
        style={{
          ...barStyle,
          position: "absolute",
          top: 646,
          left: 52,
          right: 52,
          height: 58,
          borderTop: "1px dashed #bfbfbf",
          borderBottom: "1px dashed #bfbfbf",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", gap: 40, alignItems: "baseline" }}>
          <span style={{ fontFamily: jp, fontSize: 12.5, fontWeight: 700 }}>最新情報発信中</span>
          <span style={{ fontFamily: latin, fontSize: 12.5, fontWeight: 700 }}>
            Instagram&nbsp;&nbsp;&nbsp;X
          </span>
        </span>
        <span style={{ fontFamily: jp, fontSize: 13.5, fontWeight: 700 }}>阿夫利ブルーイング</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 26,
          right: 26,
          top: 740,
          opacity: markP,
          transform: `translateY(${interpolate(markP, [0, 1], [30, 0])}px)`,
        }}
      >
        <Img src={staticFile("afuri/wordmark-ink.svg")} style={{ width: "100%", display: "block" }} />
      </div>
      <div
        style={{
          ...barStyle,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 26,
          textAlign: "center",
          fontFamily: latin,
          fontSize: 11,
          letterSpacing: "0.04em",
          color: "rgba(29,29,29,0.65)",
        }}
      >
        Copyright © AFURI. All rights reserved.
      </div>
    </section>
  );
};
