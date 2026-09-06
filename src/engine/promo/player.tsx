import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { FADE, PromoScenario, PromoScene, promoSceneDuration } from "./scenario";
import { SCENE_RENDERERS } from "./scenes";
import { DEFAULT_THEME, PromoThemeCtx } from "./theme";

const SceneFade: React.FC<{ duration: number; isLast: boolean; children: React.ReactNode }> = ({
  duration,
  isLast,
  children,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = isLast
    ? 1
    : interpolate(frame, [duration - 2, duration + FADE - 2], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>{children}</AbsoluteFill>;
};

const PromoSequence: React.FC<{
  scene: PromoScene;
  start: number;
  duration: number;
  isLast: boolean;
  transition: "fade" | "cut";
}> = ({ scene, start, duration, isLast, transition }) => {
  const Renderer = SCENE_RENDERERS[scene.kind] as React.FC<{ scene: PromoScene }>;
  if (transition === "cut") {
    return (
      <Sequence from={start} durationInFrames={duration}>
        <AbsoluteFill>
          <Renderer scene={scene} />
        </AbsoluteFill>
      </Sequence>
    );
  }
  return (
    <Sequence from={start} durationInFrames={duration + (isLast ? 0 : FADE)}>
      <SceneFade duration={duration} isLast={isLast}>
        <Renderer scene={scene} />
      </SceneFade>
    </Sequence>
  );
};

export const PromoPlayer: React.FC<{ scenario: PromoScenario }> = ({ scenario }) => {
  const theme = {
    ...DEFAULT_THEME,
    ...(scenario.background ? { background: scenario.background } : {}),
    ...(scenario.ink ? { ink: scenario.ink } : {}),
    ...(scenario.accent ? { accent: scenario.accent } : {}),
    ...(scenario.caption ? { caption: scenario.caption } : {}),
  };
  let cursor = 0;
  const windows = scenario.scenes.map((scene, i) => {
    const start = cursor;
    const duration = promoSceneDuration(scene);
    cursor += duration;
    return { scene, start, duration, isLast: i === scenario.scenes.length - 1 };
  });
  return (
    <PromoThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{ background: theme.background, fontFamily: theme.fontFamily }}>
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 55%)",
          }}
        />
        {windows.map((w, i) => (
          <PromoSequence key={i} {...w} transition={scenario.transition ?? "fade"} />
        ))}
      </AbsoluteFill>
    </PromoThemeCtx.Provider>
  );
};
