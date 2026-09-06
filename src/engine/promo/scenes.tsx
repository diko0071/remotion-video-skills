import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { BareShell, CardShell, Heading } from "../../kit/promo-blocks";
import { Lockup } from "../../kit/lockup";
import { PromoScene, type StatementPart } from "./scenario";
import { usePromoTheme } from "./theme";

const TitleScene: React.FC<{ scene: Extract<PromoScene, { kind: "title" }> }> = ({ scene }) => {
  const { ink } = usePromoTheme();
  const p = useSpringAt(0, SPRINGS.smooth, 24);
  const sub = useSpringAt(10, SPRINGS.smooth, 24);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <div
        style={{
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.06,
          textAlign: "center",
          color: ink,
          maxWidth: 860,
          opacity: p,
          transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)`,
        }}
      >
        {scene.headingNode ?? scene.heading}
      </div>
      {scene.sub ? (
        <div
          style={{
            marginTop: 26,
            fontSize: 44,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 900,
            color: `color-mix(in oklab, ${ink} 55%, transparent)`,
            opacity: sub,
            transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
          }}
        >
          {scene.sub}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const CardScene: React.FC<{ scene: Extract<PromoScene, { kind: "card" }> }> = ({ scene }) => {
  const { ink } = usePromoTheme();
  const { width } = useVideoConfig();
  const w = scene.cardWidth ?? Math.min(width * 0.82, 860);
  const Shell = scene.bare ? BareShell : CardShell;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44 }}>
      {scene.heading ? (
        <Heading text={scene.heading} check={scene.check} start={0} ink={ink} />
      ) : null}
      <Shell width={w} start={6}>
        {scene.node}
      </Shell>
    </AbsoluteFill>
  );
};

const ShowcaseScene: React.FC<{ scene: Extract<PromoScene, { kind: "showcase" }> }> = ({
  scene,
}) => {
  const { ink } = usePromoTheme();
  const { width } = useVideoConfig();
  const cols = scene.columns ?? 3;
  const gridWidth = Math.min(width * 0.86, 900);
  const gap = 20;
  const cell = (gridWidth - gap * (cols - 1)) / cols;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 46 }}>
      <Heading text={scene.heading} check={scene.check} start={0} ink={ink} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap }}>
        {scene.images.map((img, i) => (
          <ShowcaseCell key={img} img={img} index={i} cell={cell} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ShowcaseCell: React.FC<{ img: string; index: number; cell: number }> = ({
  img,
  index,
  cell,
}) => {
  const p = useSpringAt(8 + index * 5, { damping: 22, stiffness: 140, mass: 0.8 });
  return (
    <div
      style={{
        width: cell,
        height: cell * 1.05,
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 14px 40px rgba(20,15,10,0.12)",
        opacity: Math.min(1, p * 1.3),
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
      }}
    >
      <Img src={staticFile(img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};

const OutroScene: React.FC<{ scene: Extract<PromoScene, { kind: "outro" }> }> = ({ scene }) => {
  const { ink, accent } = usePromoTheme();
  const logo = useSpringAt(0, { damping: 16, stiffness: 140 });
  const head = useSpringAt(4, SPRINGS.smooth, 22);
  const pill = useSpringAt(12, SPRINGS.smooth, 22);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30 }}>
      {scene.logo ? (
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#ffffff",
            boxShadow: "0 16px 44px rgba(20,15,10,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: Math.min(1, logo * 1.3),
            transform: `scale(${interpolate(logo, [0, 1], [0.6, 1])})`,
          }}
        >
          <Img src={staticFile(scene.logo)} style={{ width: 52, height: 52 }} />
        </div>
      ) : null}
      <div
        style={{
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: ink,
          textAlign: "center",
          opacity: head,
          transform: `translateY(${interpolate(head, [0, 1], [20, 0])}px)`,
        }}
      >
        {scene.heading}
      </div>
      {scene.pill ? (
        <div
          style={{
            background: ink,
            color: "#F5EFE4",
            borderRadius: 12,
            padding: "20px 40px",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: pill,
            transform: `translateY(${interpolate(pill, [0, 1], [16, 0])}px)`,
          }}
        >
          {scene.pill}
          <span style={{ color: accent }}>→</span>
        </div>
      ) : null}
      {scene.footnote ? (
        <div
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: `color-mix(in oklab, ${ink} 55%, transparent)`,
            opacity: pill,
          }}
        >
          {scene.footnote}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};


const ALIGN_SELF: Record<string, string> = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
};

const StatementScene: React.FC<{ scene: Extract<PromoScene, { kind: "statement" }> }> = ({
  scene,
}) => {
  const theme = usePromoTheme();
  const ink = scene.ink ?? "#ffffff";
  const background = scene.background ?? theme.accent;
  const parts: StatementPart[] =
    scene.parts ??
    ([
      scene.left ? { kind: "text", text: scene.left, align: "top" } : null,
      scene.image
        ? { kind: "image", src: scene.image, height: scene.imageHeight ?? 300, align: "middle" }
        : null,
      scene.right ? { kind: "text", text: scene.right, align: "bottom" } : null,
    ].filter(Boolean) as StatementPart[]);
  const caption = scene.caption ?? theme.caption;
  const band = Math.max(
    ...parts.map((part) => (part.kind === "image" ? (part.height ?? 300) : 0)),
    300,
  );
  return (
    <AbsoluteFill
      style={{ background, alignItems: "center", justifyContent: "center", padding: "0 110px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          columnGap: 40,
          height: band,
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.04,
          color: ink,
        }}
      >
        {parts.map((part, i) =>
          part.kind === "text" ? (
            <StatementWord key={i} part={part} at={i * 8} />
          ) : (
            <StatementImage key={i} part={part} at={i * 8} band={band} />
          ),
        )}
      </div>
      {caption ? (
        <CaptionBar
          text={caption}
          background={scene.captionBackground}
          ink={scene.captionInk}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const StatementWord: React.FC<{
  part: Extract<StatementPart, { kind: "text" }>;
  at: number;
}> = ({ part, at }) => {
  const p = useSpringAt(at, SPRINGS.smooth, 20);
  return (
    <span
      style={{
        alignSelf: ALIGN_SELF[part.align ?? "top"],
        whiteSpace: "pre-line",
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [22, 0])}px)`,
      }}
    >
      {part.text}
    </span>
  );
};

const StatementImage: React.FC<{
  part: Extract<StatementPart, { kind: "image" }>;
  at: number;
  band: number;
}> = ({ part, at, band }) => {
  const p = useSpringAt(at, SPRINGS.pop, 24);
  const height = part.height ?? band;
  return (
    <span
      style={{
        alignSelf: ALIGN_SELF[part.align ?? "middle"],
        display: "inline-flex",
        alignItems: "center",
        height,
        opacity: Math.min(1, p * 1.4),
        transform: `scale(${interpolate(p, [0, 1], [0.86, 1])})`,
      }}
    >
      <Img src={staticFile(part.src)} style={{ height, width: "auto", display: "block" }} />
    </span>
  );
};

const CaptionBar: React.FC<{ text: string; background?: string; ink?: string }> = ({
  text,
  background = "#0f0d0b",
  ink = "#ffffff",
}) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      bottom: 92,
      transform: "translateX(-50%)",
      background,
      color: ink,
      borderRadius: 6,
      padding: "12px 20px",
      fontSize: 30,
      fontWeight: 600,
    }}
  >
    {text}
  </div>
);

const LockupScene: React.FC<{ scene: Extract<PromoScene, { kind: "lockup" }> }> = ({ scene }) => {
  const theme = usePromoTheme();
  return (
    <Lockup
      mark={scene.mark}
      word={scene.word}
      tagline={scene.tagline}
      partner={scene.partner}
      background={scene.background ?? "#ffffff"}
      ink={scene.ink ?? theme.ink}
      fallbackFont={theme.fontFamily}
    />
  );
};

const CustomScene: React.FC<{ scene: Extract<PromoScene, { kind: "custom" }> }> = ({
  scene,
}) => {
  const Render = scene.render;
  return <Render />;
};

export const SCENE_RENDERERS: {
  [K in PromoScene["kind"]]: React.FC<{ scene: Extract<PromoScene, { kind: K }> }>;
} = {
  custom: CustomScene,
  title: TitleScene,
  card: CardScene,
  showcase: ShowcaseScene,
  statement: StatementScene,
  lockup: LockupScene,
  outro: OutroScene,
};
