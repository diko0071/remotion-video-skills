import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { press, useReveal, useSpringAt, SPRINGS } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { ScoreRing } from "../../kit/score-ring";
import { SfxTrack } from "../../kit/sfx";

const PARA1 =
  "Open any sleep app and you face the same choice: a score that grades last night, or a model that plans tomorrow. Neither is better — they answer different questions.";
const PARA2 =
  "A nightly score tells you what happened: how long you were in deep sleep, how often you surfaced. A circadian model does the opposite work — it takes weeks of your data and tells you when to go to bed tonight so tomorrow feels different.";
const QA =
  "Start with a blend you love, then try a single origin from the same maker — the contrast teaches you more than any tasting note ever will.";
const PARA3 =
  "Taste them the way makers do: let a piece melt on your tongue without chewing, note what you pick up in the first ten seconds, and again at the finish. Origin bars tend to open loud and evolve; blends stay composed from start to end.";
const PARA4 =
  "Whichever side you land on, buy from makers who publish their sourcing. Transparent trade is the single strongest predictor of a bar you'll want to finish.";

const FACTS: { label: string; at: number }[] = [
  { label: "Readability", at: 96 },
  { label: "Structure", at: 122 },
  { label: "Citations", at: 148 },
];

export const PUBLISH_AT = 196;

const Fact: React.FC<{ label: string; at: number }> = ({ label, at }) => {
  const style = useReveal(at, 12, 16);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 21,
        fontWeight: 600,
        color: "rgba(23,19,16,0.72)",
      }}
    >
      <span style={{ color: "#059669", fontWeight: 800 }}>{"✓"}</span>
      {label}
    </div>
  );
};

const PublishButton: React.FC = () => {
  const frame = useCurrentFrame();
  const style = useReveal(PUBLISH_AT - 36, 16, 18);
  const done = useSpringAt(PUBLISH_AT + 4, SPRINGS.card, 20);
  return (
    <div
      data-click="publish"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        height: 66,
        borderRadius: 12,
        background: "#171310",
        color: "#FFFFFF",
        fontSize: 23,
        fontWeight: 700,
        transform: `scale(${press(frame, PUBLISH_AT)})`,
      }}
    >
      <Img src={staticFile("integrations/shopify-color.svg")} style={{ height: 30 }} />
      {done > 0.5 ? "Scheduled \u2713" : "Setup Auto Publish"}
    </div>
  );
};

const DOC = { x: 120, y: 64, w: 1040, h: 952 };

export const ValidateScene: React.FC = () => {
  const docIn = useReveal(4, 26, 22);
  const panelIn = useReveal(24, 20, 20);
  const scoreIn = useSpringAt(38, SPRINGS.card, 24);
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <CameraRig shots={SHOTS} drift={0}>
        <div
          data-click="doc"
          style={{
            ...docIn,
            position: "absolute",
            left: DOC.x,
            top: DOC.y,
            width: DOC.w,
            height: DOC.h,
            background: "#FFFFFF",
            borderRadius: 18,
            boxShadow: "0 24px 70px rgba(74,53,29,0.18)",
            border: "1px solid rgba(23,19,16,0.06)",
            padding: "44px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            overflow: "hidden",
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
            Blog post
          </span>
          <span style={{ fontSize: 40, fontWeight: 800, color: "#171310", lineHeight: 1.2 }}>
            Sleep score vs sleep debt: which to trust
          </span>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: "rgba(23,19,16,0.78)" }}>
            {PARA1}
          </p>
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
            <Img
              src={staticFile("dusk/dusk-sq-2.png")}
              style={{ width: 320, height: 320, objectFit: "contain", background: "#0A0E22", borderRadius: 12, flexShrink: 0 }}
            />
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: "rgba(23,19,16,0.78)" }}>
              {PARA2}
            </p>
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#171310" }}>
            Which number should you act on?
          </span>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: "rgba(23,19,16,0.78)" }}>
            {QA}
          </p>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#171310" }}>
            How to read your own night
          </span>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: "rgba(23,19,16,0.78)" }}>
            {PARA3}
          </p>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: "rgba(23,19,16,0.78)" }}>
            {PARA4}
          </p>
        </div>
        <div
          data-click="score"
          style={{
            ...panelIn,
            position: "absolute",
            left: 1250,
            top: 280,
            width: 550,
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 20px 55px rgba(74,53,29,0.16)",
            border: "1px solid rgba(23,19,16,0.06)",
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: scoreIn }}>
            <ScoreRing score={100} size={150} appearAt={44} color="#059669" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: "#171310" }}>100 / 100</span>
              <span style={{ fontSize: 20, fontWeight: 600, color: "rgba(23,19,16,0.55)" }}>
                Article score
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FACTS.map((f) => (
              <Fact key={f.label} label={f.label} at={f.at} />
            ))}
          </div>
          <PublishButton />
        </div>
        <SceneCursor
          from={{ x: 1780, y: 1120 }}
          moves={[{ target: "publish", at: PUBLISH_AT, travel: 40 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: PUBLISH_AT }]} />
    </AbsoluteFill>
  );
};

const SHOTS: CameraShot[] = [{ at: 0, zoom: 1.04 }];

export const VALIDATE_TOTAL = 264;
