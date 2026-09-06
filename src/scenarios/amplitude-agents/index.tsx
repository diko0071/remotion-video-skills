import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../core/motion";
import { MacCursor, useLegSprings } from "./ui/cursor";
import {
  SlackChannelPane,
  SlackFrame,
  SlackMessage,
  SlackReactions,
  SlackSidebar,
} from "../../kit/slack-ui";
import { AMP, BUGS, LAYOUT, PROMPT_1, PROMPT_2, SHOTS, TOTAL } from "./timings";
import {
  AMP_FONT,
  AmplitudeMark,
  BugsTable,
  Composer,
  ConnectorTooltip,
  ConnectorsPanel,
  FinishedCard,
  Hero,
  NotionCard,
  PromptChip,
} from "./ui/surfaces";

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: AMP.bg, alignItems: "center" }}>{children}</AbsoluteFill>
);


const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const heroIn = useSpringAt(2, SPRINGS.smooth, 20);
  const compIn = useSpringAt(6, SPRINGS.smooth, 20);
  const ph = frame > 42;
  return (
    <Page>
      <div style={{ marginTop: LAYOUT.heroTop, opacity: heroIn }}>
        <Hero />
      </div>
      <div
        style={{
          position: "absolute",
          left: LAYOUT.compLeft,
          top: LAYOUT.compTop,
          opacity: compIn,
          transform: `translateY(${interpolate(compIn, [0, 1], [16, 0])}px)`,
        }}
      >
        <Composer placeholder={ph} width={LAYOUT.compW} />
      </div>
      <MacCursor
        stops={[
          { x: 700, y: 940, at: 52 },
          { x: LAYOUT.plus.x + 4, y: LAYOUT.plus.y + 6, at: 88 },
        ]}
        appearAt={52}
      />
    </Page>
  );
};

const FLOW_Z = [0, 34, 60, 122, 158, 205, 242];
const FLOW_ZV = [1.0, 1.05, 1.3, 1.3, 1.08, 1.85, 2.3];
const FLOW_XV = [0, 0, 250, 250, 0, -260, -500];
const FLOW_YV = [0, 0, 40, 40, -15, -25, -35];

const flowCam = (frame: number) => ({
  zoom: interpolate(frame, FLOW_Z, FLOW_ZV, { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  x: interpolate(frame, FLOW_Z, FLOW_XV, { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  y: interpolate(frame, FLOW_Z, FLOW_YV, { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
});

const project = (
  wx: number,
  wy: number,
  cam: { zoom: number; x: number; y: number },
): { x: number; y: number } => ({
  x: (wx + cam.x - 960) * cam.zoom + 960,
  y: (wy + cam.y - 540) * cam.zoom + 540,
});

type WStop = { x: number; y: number; at: number; click?: boolean };

const FlowCursor: React.FC<{ stops: WStop[]; cam: { zoom: number; x: number; y: number } }> = ({
  stops,
  cam,
}) => {
  const frame = useCurrentFrame();
  const legs = useLegSprings(stops);

  let wx = stops[0].x;
  let wy = stops[0].y;
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const next = stops[i];
    const p = legs[i - 1];
    wx += (next.x - prev.x) * p;
    wy += (next.y - prev.y) * p;
  }

  let dip = 1;
  for (const stop of stops) {
    if (stop.click) {
      dip *= interpolate(frame, [stop.at - 2, stop.at, stop.at + 4], [1, 0.86, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }

  const pos = project(wx, wy, cam);
  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        zIndex: 80,
        transform: `scale(${dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
      }}
    >
      <svg width={44} height={64} viewBox="0 0 20 29" fill="none">
        <path
          d="M1.5 1.5 L1.5 22.5 L6.6 17.9 L9.9 26.2 L13.3 24.8 L10 16.7 L17.3 16.2 Z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const ConnectFlowShot: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = flowCam(frame);

  const dim = interpolate(frame, [4, 18, 34, 44], [0, 0.07, 0.07, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tipIn = useSpringAt(6, SPRINGS.card, 12);
  const tipOut = interpolate(frame, [36, 44], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelIn = useSpringAt(40, SPRINGS.panel, 15);
  const panelOut = interpolate(frame, [126, 140], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const connected = interpolate(frame, [58, 104], [0, 7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icons = interpolate(frame, [128, 146], [0, 7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconsShown = frame > 160 ? 0 : icons;
  const text = typing(frame, PROMPT_1, 168, 196);

  const rowStops: WStop[] = new Array(7)
    .fill(0)
    .map((_, i) => ({ x: LAYOUT.panelBtnX, y: LAYOUT.panelRowY(i), at: 54 + i * 6.6, click: true }));

  return (
    <AbsoluteFill style={{ background: AMP.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: `scale(${cam.zoom}) translate(${cam.x}px, ${cam.y}px)`,
          transformOrigin: "50% 50%",
        }}
      >
            <AbsoluteFill style={{ alignItems: "center" }}>
              <div style={{ marginTop: LAYOUT.heroTop }}>
                <Hero />
              </div>
            </AbsoluteFill>
            <AbsoluteFill style={{ background: "#16181D", opacity: dim }} />
            <div style={{ position: "absolute", left: LAYOUT.compLeft, top: LAYOUT.compTop }}>
              <Composer
                placeholder={frame < 168}
                icons={iconsShown}
                text={text}
                caret={frame > 162 && frame < 226}
                width={LAYOUT.compW}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: LAYOUT.plus.x + 24,
                top: LAYOUT.plus.y + 52,
                opacity: tipIn * tipOut,
                transform: `translateY(${interpolate(tipIn, [0, 1], [8, 0])}px)`,
              }}
            >
              <ConnectorTooltip />
            </div>
            <div
              style={{
                position: "absolute",
                left: LAYOUT.panel.left,
                top: LAYOUT.panel.top,
                opacity: panelIn * panelOut,
                transform: `scale(${interpolate(panelIn, [0, 1], [0.7, 1])}) translateY(${interpolate(
                  panelOut,
                  [0, 1],
                  [30, 0],
                )}px)`,
                transformOrigin: "12% 100%",
              }}
            >
              <ConnectorsPanel connected={connected} width={LAYOUT.panel.w} />
            </div>
      </div>
      <FlowCursor
        cam={cam}
        stops={[
          { x: LAYOUT.plus.x + 4, y: LAYOUT.plus.y + 6, at: 0 },
          { x: LAYOUT.plus.x, y: LAYOUT.plus.y, at: 22, click: true },
          ...rowStops,
          { x: LAYOUT.panelBtnX - 60, y: LAYOUT.panelRowY(6) + 40, at: 118 },
          { x: LAYOUT.send.x, y: LAYOUT.send.y, at: 218 },
          { x: LAYOUT.send.x - 3, y: LAYOUT.send.y - 3, at: 234, click: true },
        ]}
      />
    </AbsoluteFill>
  );
};

const ChipEmptyShot: React.FC = () => {
  const chipIn = useSpringAt(2, SPRINGS.smooth, 14);
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 56,
          left: "50%",
          opacity: chipIn,
          transform: `translateX(-50%) translateY(${interpolate(chipIn, [0, 1], [-14, 0])}px)`,
        }}
      >
        <PromptChip text={PROMPT_1} />
      </div>
      <div style={{ position: "absolute", bottom: 130 }}>
        <Composer width={1180} placeholder />
      </div>
    </Page>
  );
};

const BugsShot: React.FC = () => {
  const frame = useCurrentFrame();
  const chipIn = useSpringAt(0, SPRINGS.smooth, 16);
  const visible = interpolate(frame, [4, 26], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const highlight = frame > 34 ? Math.min(3, Math.floor((frame - 34) / 12)) : -1;
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 56,
          left: "50%",
          opacity: chipIn,
          transform: `translateX(-50%) translateY(${interpolate(chipIn, [0, 1], [-14, 0])}px)`,
        }}
      >
        <PromptChip text={PROMPT_1} />
      </div>
      <div style={{ marginTop: 190, alignSelf: "center" }}>
        <BugsTable rows={[...BUGS]} visible={visible} highlight={highlight} />
      </div>
      <div style={{ position: "absolute", bottom: 130 }}>
        <Composer width={880} placeholder />
      </div>
    </Page>
  );
};

const Prompt2Shot: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typing(frame, PROMPT_2, 2, 26);
  const sent = frame > 34;
  const notionAt = 84;
  const notion = frame > notionAt;
  const tableFade = interpolate(frame, [34, 44], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Page>
      <div style={{ position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)" }}>
        <PromptChip text={sent ? PROMPT_2 : PROMPT_1} />
      </div>
      <div style={{ marginTop: 190, opacity: tableFade }}>
        <BugsTable rows={[...BUGS]} visible={4} highlight={-1} />
      </div>
      {notion ? (
        <div style={{ position: "absolute", top: 400, alignSelf: "center" }}>
          <NotionCard step={Math.min(2, Math.floor((frame - notionAt) / 14))} />
        </div>
      ) : null}
      <div style={{ position: "absolute", bottom: 130 }}>
        <Composer width={880} text={sent ? "" : text} placeholder={sent} caret={!sent} />
      </div>
    </Page>
  );
};

const FinishedShot: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [6, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 56,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: AMP_FONT,
        }}
      >
        <PromptChip text={PROMPT_2} />
      </div>
      <div style={{ marginTop: 200 }}>
        <FinishedCard reveal={reveal} />
      </div>
      <div style={{ position: "absolute", bottom: 130 }}>
        <Composer width={880} placeholder />
      </div>
    </Page>
  );
};

const SLACK_ROWS = [
  { kind: "link" as const, icon: "threads", name: "Unread" },
  { kind: "link" as const, icon: "threads", name: "Threads" },
  { kind: "link" as const, icon: "send-filled", name: "Drafts & sent" },
  { kind: "heading" as const, name: "Channels" },
  { kind: "channel" as const, name: "product-sprint", selected: true },
  { kind: "channel" as const, name: "general" },
  { kind: "channel" as const, name: "marketing" },
  { kind: "channel" as const, name: "insights" },
  { kind: "channel" as const, name: "product" },
  { kind: "channel" as const, name: "design" },
  { kind: "channel" as const, name: "client-feedbacks" },
  { kind: "channel" as const, name: "product_supports" },
  { kind: "channel" as const, name: "investors" },
  { kind: "channel" as const, name: "productivity" },
];

const SprintHealth: React.FC<{ withReaction?: boolean }> = ({ withReaction = false }) => (
  <SlackMessage
    avatar="amplitude/icons/amplitude.png"
    sender="Weekly Sprint Health – Week of June 1"
    badge="APP"
    time="08:03 AM"
    extra={withReaction ? <SlackReactions items={[{ emoji: "slack/emoji-eyes.png", count: 2 }]} /> : undefined}
  >
    <div>Status: 4 sprints tracked · 2 at risk · 0 resolved this week</div>
    <div style={{ marginTop: 8, fontWeight: 700 }}>🔴 At Risk</div>
    <div>SPRINT-212 Dashboard export – 34% drop-off · 2,847 errors</div>
    <div>SPRINT-204 File upload redesign – 22% drop-off · 1,104 errors</div>
    <div style={{ marginTop: 8, fontWeight: 700 }}>🟢 On Track</div>
    <div>SPRINT-201 Search refactor – 0.6% drop-off · 9 errors</div>
    <div>SPRINT-209 Notification preferences – 1.8% drop-off · 41 errors</div>
  </SlackMessage>
);

const WALLPAPER =
  "linear-gradient(118deg, #6D64E8 0%, #8A55D8 34%, #5C3FB2 62%, #35256E 100%)";

const SlackWindow: React.FC<{
  withReaction?: boolean;
  w: number;
  h: number;
  radius?: number;
}> = ({ withReaction, w, h, radius = 13 }) => {
  const scale = 1.62;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: "0 30px 90px rgba(22,24,29,0.35)",
        background: "#3F0E40",
      }}
    >
      <div
        style={{
          width: w / scale,
          height: h / scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <SlackFrame workspace="Vantara" style={{ height: "100%" }}>
          <SlackSidebar workspace="Vantara" rows={SLACK_ROWS} />
          <SlackChannelPane name="product-sprint">
            <div style={{ marginBottom: "auto" }}>
              <SprintHealth withReaction={withReaction} />
            </div>
          </SlackChannelPane>
        </SlackFrame>
      </div>
    </div>
  );
};

const SlackSlideShot: React.FC = () => {
  const slide = useSpringAt(10, SPRINGS.panel, 40);
  return (
    <AbsoluteFill style={{ background: AMP.bg }}>
      <Page>
        <div style={{ position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)" }}>
          <PromptChip text={PROMPT_2} />
        </div>
        <div style={{ marginTop: 200 }}>
          <FinishedCard reveal={1} />
        </div>
        <div style={{ position: "absolute", bottom: 130 }}>
          <Composer width={880} placeholder />
        </div>
      </Page>
      <MacCursor
        stops={[
          { x: 1240, y: 820, at: 0 },
          { x: 1176, y: 742, at: 26, click: true },
        ]}
      />
      <AbsoluteFill
        style={{
          transform: `translateX(${interpolate(slide, [0, 1], [1920, 648])}px)`,
        }}
      >
        <SlackWindow w={1272} h={1080} radius={0} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SlackFullShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: WALLPAPER,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <SlackWindow withReaction={frame > 56} w={1730} h={1010} />
    </AbsoluteFill>
  );
};

const LogoShot: React.FC = () => {
  const frame = useCurrentFrame();
  const circle = useSpringAt(0, SPRINGS.smooth, 10);
  const draw = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: WALLPAPER }} />
      <div
        style={{
          position: "absolute",
          left: "62%",
          top: "48%",
          width: interpolate(circle, [0, 1], [0, 4600]),
          height: interpolate(circle, [0, 1], [0, 4600]),
          transform: "translate(-50%,-50%)",
          borderRadius: 9999,
          background: "#FFFFFF",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: "translate(-50%,-50%)",
          opacity: circle > 0.35 ? 1 : 0,
        }}
      >
        <AmplitudeMark size={720} draw={draw} />
      </div>
    </AbsoluteFill>
  );
};

const EndcardShot: React.FC = () => {
  const lockup = useSpringAt(2, SPRINGS.smooth, 18);
  return (
    <AbsoluteFill
      style={{
        background: AMP.endcard,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          opacity: lockup,
          transform: `scale(${interpolate(lockup, [0, 1], [0.94, 1])})`,
        }}
      >
        <div
          style={{
            width: 132, height: 132,
            borderRadius: 999,
            background: "#FFFFFF",
            display: "grid",
            placeItems: "center",
          }}
        >
          <AmplitudeMark size={92} color={AMP.endcard} />
        </div>
        <div
          style={{
            fontFamily: AMP_FONT,
            fontSize: 118,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          Amplitude
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AmplitudeAgents: React.FC = () => (
  <AbsoluteFill style={{ background: AMP.bg }}>
    <Sequence from={SHOTS.hero.from} durationInFrames={SHOTS.hero.duration}>
      <HeroShot />
    </Sequence>
    <Sequence from={SHOTS.connectFlow.from} durationInFrames={SHOTS.connectFlow.duration}>
      <ConnectFlowShot />
    </Sequence>
    <Sequence from={SHOTS.chipEmpty.from} durationInFrames={SHOTS.chipEmpty.duration}>
      <ChipEmptyShot />
    </Sequence>
    <Sequence from={SHOTS.bugs.from} durationInFrames={SHOTS.bugs.duration}>
      <BugsShot />
    </Sequence>
    <Sequence from={SHOTS.prompt2.from} durationInFrames={SHOTS.prompt2.duration}>
      <Prompt2Shot />
    </Sequence>
    <Sequence from={SHOTS.finished.from} durationInFrames={SHOTS.finished.duration}>
      <FinishedShot />
    </Sequence>
    <Sequence from={SHOTS.slackSlide.from} durationInFrames={SHOTS.slackSlide.duration}>
      <SlackSlideShot />
    </Sequence>
    <Sequence from={SHOTS.slackFull.from} durationInFrames={SHOTS.slackFull.duration}>
      <SlackFullShot />
    </Sequence>
    <Sequence from={SHOTS.logo.from} durationInFrames={SHOTS.logo.duration}>
      <LogoShot />
    </Sequence>
    <Sequence from={SHOTS.endcard.from} durationInFrames={SHOTS.endcard.duration}>
      <EndcardShot />
    </Sequence>
  </AbsoluteFill>
);

export const AMPLITUDE_AGENTS_TOTAL = TOTAL;
