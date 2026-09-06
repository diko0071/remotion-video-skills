import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { lerpRect, SPRINGS, useSpringAt, window01 } from "../../../core/motion";
import { PromptComposer } from "../../../kit/prompt-composer";
import { ToolCard } from "../../../kit/tool-card";
import { ToolSpec } from "../../../kit/tool-flow";
import { CheckIcon } from "../../../kit/ryze-ui/icons";
import { CELL, CHIP, COMPOSER_Y, FULL, HEADING_DROP, STAGE_H, STAGE_W, W } from "../timings";
import { cellRect, GridCell, HeroCell } from "./grid";
import { PhaseHeading } from "../../../kit/phase-heading";
import { SfxTrack } from "../../../kit/sfx";

const ADS = [
  "showcase/ad-1.jpg",
  "showcase/ad-2.jpg",
  "showcase/ad-3.jpg",
  "showcase/ad-4.jpg",
  "showcase/ad-5.jpg",
  "showcase/ad-6.jpg",
];

const PUB_TOOLS: ToolSpec[] = [
  { label: "Connecting Meta Ads", detail: "account 84032 · authorized", start: W.toolsIn + 10, done: W.toolsIn + 52 },
  { label: "Creating campaign draft", detail: "traffic · 4:5 feed placement", start: W.toolsIn + 52, done: W.toolsIn + 96 },
  { label: "Uploading your creative", detail: "live in Ads Manager", start: W.toolsIn + 96, done: W.toolsIn + 136 },
];

export const WorkflowCard: React.FC = () => {
  const frame = useCurrentFrame();

  const fly1 = useSpringAt(W.fly1, SPRINGS.drift);
  const reveal = useSpringAt(W.reveal, SPRINGS.card);
  const fly2 = useSpringAt(W.fly2, SPRINGS.drift);
  const toolsIn = useSpringAt(W.toolsIn, SPRINGS.card);

  const composerP = Math.min(
    window01(frame, W.composerIn1, W.composerOut1) + window01(frame, W.composerIn2, W.composerOut2),
    1,
  );
  const composerShift = interpolate(composerP, [0, 1], [18, 0]);

  const SWAP = 0.985;
  const heroRect = { ...cellRect(0), size: CELL };
  const chipRect = { x: CHIP.x, y: CHIP.y + composerShift, size: CHIP.size };
  const heroFly = lerpRect(fly1, heroRect, chipRect);
  const full =
    frame < W.fly2 ? lerpRect(reveal, chipRect, FULL) : lerpRect(fly2, FULL, chipRect);
  const showFull = frame >= W.reveal && fly2 < SWAP;

  const chipVisible =
    (fly1 >= SWAP && frame < W.reveal) ||
    (fly2 >= SWAP && frame < W.composerOut2 + 6);
  const chipImage = frame < W.reveal ? "showcase/ad-1.jpg" : "showcase/ad-1b.jpg";

  return (
    <div style={{ position: "relative" }}>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: W.editSend },
          { name: "mouse-click", at: W.pubSend },
        ]}
      />
      <div style={{ position: "relative", height: 64, zIndex: 5 }}>
        <PhaseHeading visibleFrom={0} visibleTo={W.fly1 + 14}>
          <span style={{ display: "inline-flex", color: "#059669" }}>
            <CheckIcon size={30} strokeWidth={3} />
          </span>
          Your ads are ready
        </PhaseHeading>
        <PhaseHeading
          visibleFrom={W.fly1 + 22}
          visibleTo={W.fly2 + 10}
          y={HEADING_DROP * (1 - reveal)}
        >
          Edit by prompting
        </PhaseHeading>
        <PhaseHeading
          visibleFrom={W.fly2 + 18}
          y={HEADING_DROP * (1 - toolsIn)}
        >
          <Img src={staticFile("meta-ads.svg")} style={{ height: 34 }} />
          Publish right away
        </PhaseHeading>
      </div>

      <div style={{ position: "relative", height: STAGE_H }}>
        {ADS.slice(1).map((img, i) => (
          <GridCell key={img} image={img} index={i + 1} />
        ))}

        {fly1 < SWAP ? (
          <HeroCell
            x={heroFly.x}
            y={heroFly.y}
            size={heroFly.size}
            radius={interpolate(fly1, [0, 1], [12, 9])}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: COMPOSER_Y - 18,
            opacity: composerP,
            transform: `translateY(${interpolate(composerP, [0, 1], [18, 0])}px)`,
            pointerEvents: "none",
          }}
        >
          <PromptComposer
            prompts={[
              { text: "Make it warmer — golden backlight", typeWindow: W.editType, sendAt: W.editSend },
              { text: "Publish it to Meta Ads", typeWindow: W.pubType, sendAt: W.pubSend },
            ]}
            attachment={
              frame >= W.fly1 + 20 ? (
                <div style={{ height: CHIP.size + 12, overflow: "hidden" }}>
                  <Img
                    src={staticFile(chipImage)}
                    style={{
                      width: CHIP.size,
                      height: CHIP.size,
                      borderRadius: 9,
                      objectFit: "cover",
                      border: "1px solid rgba(23,19,16,0.12)",
                      opacity: chipVisible ? 1 : 0,
                    }}
                  />
                </div>
              ) : null
            }
          />
        </div>

        {showFull ? (
          <div
            style={{
              position: "absolute",
              left: full.x,
              top: full.y,
              width: full.size,
              height: full.size,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 24px 70px rgba(20,15,10,0.16)",
              zIndex: 3,
            }}
          >
            <Img
              src={staticFile("showcase/ad-1b.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.92)",
                borderRadius: 999,
                padding: "7px 13px",
                fontSize: 13.5,
                fontWeight: 700,
                color: "#059669",
                opacity:
                  interpolate(reveal, [0.75, 1], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }) * Math.max(0, 1 - fly2),
              }}
            >
              <CheckIcon size={13} /> Updated
            </div>
          </div>
        ) : null}

        <div style={{ position: "absolute", left: (STAGE_W - 520) / 2, top: 140, width: 520 }}>
          <ToolCard
            tools={PUB_TOOLS}
            appearAt={W.toolsIn}
            doneLine={{ at: W.live, text: "Your ad is live" }}
          />
        </div>
      </div>
    </div>
  );
};

