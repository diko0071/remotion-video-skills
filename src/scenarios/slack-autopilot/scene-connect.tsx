import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { press, SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";

const CLICK_AT = 44;
export const CONNECT_TOTAL = CLICK_AT + 30;

const SHOTS: CameraShot[] = [{ at: 0, target: "connect.card", zoom: 1.2 }];

export const SlackConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const cardIn = useReveal(4, 40, 20);
  const on = useSpringAt(CLICK_AT + 2, SPRINGS.pop, 14);
  const connectedIn = useSpringAt(CLICK_AT + 8, SPRINGS.pop, 16);

  return (
    <AbsoluteFill
      style={{
        background: "var(--background)",
        fontFamily: "'Plus Jakarta Sans'",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CameraRig shots={SHOTS}>
        <div
          data-click="connect.card"
          style={{
            ...cardIn,
            position: "absolute",
            left: (1920 - 680) / 2,
            top: 380,
            width: 680,
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid rgba(23,19,16,0.08)",
            boxShadow: "0 20px 60px rgba(74,53,29,0.16)",
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "1px solid rgba(23,19,16,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Img src={staticFile("integrations/slack.svg")} style={{ width: 36, height: 36 }} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>Slack</span>
              {connectedIn > 0.02 ? (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#059669",
                    background: "rgba(5,150,105,0.1)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    opacity: connectedIn,
                    transform: `scale(${interpolate(connectedIn, [0, 1], [0.7, 1])})`,
                  }}
                >
                  Connected
                </span>
              ) : null}
            </div>
            <div style={{ fontSize: 15, color: "var(--muted-foreground)", marginTop: 4, lineHeight: 1.45 }}>
              Approvals, reports and answers from your agent — right in your
              team&rsquo;s Slack.
            </div>
          </div>
          <span
            data-click="connect.toggle"
            style={{
              width: 58,
              height: 32,
              borderRadius: 999,
              background: on > 0.5 ? "#059669" : "rgba(23,19,16,0.15)",
              position: "relative",
              flexShrink: 0,
              transform: `scale(${press(frame, CLICK_AT)})`,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                width: 26,
                height: 26,
                borderRadius: 999,
                background: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(15,23,42,0.3)",
                transform: `translateX(${interpolate(on, [0, 1], [0, 26])}px)`,
              }}
            />
          </span>
        </div>
        <SceneCursor
          from={{ x: 1560, y: 1040 }}
          moves={[{ target: "connect.toggle", at: CLICK_AT, travel: 46 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: CLICK_AT }]} />
    </AbsoluteFill>
  );
};
