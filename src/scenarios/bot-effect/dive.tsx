import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FocusCamera } from "../../kit/focus-camera";
import { BenjiIcon, GrokIcon, LockscreenChrome, NotificationCard } from "./lockscreen";
import { ARRIVE, CARD, CHROME_BACK, CLIP_CLOSE, CLIP_OPEN, DIVE, FOCUS, FOCUS_BACK, PHONE, PULL, PUSH, WORLD, ZOOM_IN } from "./timings";

const expoOut = Easing.out(Easing.exp);
const inOut = Easing.inOut(Easing.cubic);

const clipOpenAmount = (frame: number) => {
  if (frame < CLIP_CLOSE[0][0]) {
    return interpolate(frame, [CLIP_OPEN.at, CLIP_OPEN.at + CLIP_OPEN.len], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: expoOut,
    });
  }
  return interpolate(
    frame,
    CLIP_CLOSE.map(([f]) => f),
    CLIP_CLOSE.map(([, p]) => p),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

const zoomAt = (frame: number) => {
  if (frame < PULL.at) {
    return interpolate(frame, [DIVE.at, DIVE.at + DIVE.len], [1, ZOOM_IN], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: expoOut,
    });
  }
  return interpolate(frame, [PULL.at, PULL.at + PULL.len], [ZOOM_IN, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: inOut,
  });
};

const focusAt = (frame: number) => {
  const p =
    frame < PULL.at
      ? interpolate(frame, [CLIP_OPEN.at, CLIP_OPEN.at + CLIP_OPEN.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : interpolate(frame, [FOCUS_BACK.at, FOCUS_BACK.at + FOCUS_BACK.len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: inOut });
  return { x: WORLD.w / 2 + (FOCUS.x - WORLD.w / 2) * p, y: WORLD.h / 2 + (FOCUS.y - WORLD.h / 2) * p };
};

export const DiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = zoomAt(frame);
  const focus = focusAt(frame);
  const open = clipOpenAmount(frame);
  const inside = frame >= CLIP_OPEN.at && frame < CLIP_CLOSE[CLIP_CLOSE.length - 1][0];

  const clipX = PHONE.x * (1 - open);
  const clipY = PHONE.y * (1 - open);
  const clipW = PHONE.w + (WORLD.w - PHONE.w) * open;
  const clipH = PHONE.h + (WORLD.h + 400 - PHONE.h) * open;
  const radius = PHONE.radius * (1 - open);

  const arrive = interpolate(frame, [ARRIVE.at, ARRIVE.at + ARRIVE.len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expoOut,
  });
  const push = interpolate(frame, [PUSH.at, PUSH.at + PUSH.len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expoOut,
  });
  const grokY = inside ? CARD.slot0 - ARRIVE.drop * (1 - arrive) : CARD.slot0;
  const benjiY = inside ? CARD.slot0 + CARD.step * push : CARD.slot0 + CARD.step;
  const grokVisible = !inside || frame >= ARRIVE.at;
  const chrome =
    frame < PULL.at
      ? interpolate(frame, [CLIP_OPEN.at, CLIP_OPEN.at + CLIP_OPEN.len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : interpolate(frame, [CHROME_BACK.at, CHROME_BACK.at + CHROME_BACK.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <FocusCamera zoom={zoom} focus={focus}>
        <div
          style={{
            position: "absolute",
            left: clipX,
            top: clipY,
            width: clipW,
            height: clipH,
            borderRadius: radius,
            boxShadow: `${20 * (1 - open)}px ${40 * (1 - open)}px 90px rgba(0,0,0,${0.16 * (1 - open)})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: clipX,
            top: clipY,
            width: clipW,
            height: clipH,
            borderRadius: radius,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("bot-effect/wallpaper.jpg")}
            style={{
              position: "absolute",
              left: -clipX,
              top: -clipY,
              width: WORLD.w,
              height: WORLD.h + 400,
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{ position: "absolute", left: -clipX, top: -clipY, width: WORLD.w, height: WORLD.h + 400 }}>
            <LockscreenChrome opacity={chrome} />
            <NotificationCard
              y={benjiY}
              icon={<BenjiIcon />}
              title="Benji Taylor"
              age="3m"
              lines={["Hey, do we have a recap from this", "morning’s design standup?"]}
            />
            <NotificationCard
              y={grokY}
              icon={<GrokIcon />}
              title="Grok Bot"
              age="1m"
              lines={["Your design standup notes are ready."]}
              opacity={grokVisible ? 1 : 0}
              behind
            />
          </div>
        </div>
      </FocusCamera>
    </AbsoluteFill>
  );
};
