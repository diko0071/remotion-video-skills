import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { noise2D } from "@remotion/noise";
import { CHASE, chase, type ChaseConfig } from "./chase";
import { rectCenter, STAGE_ATTR, useObjectRects } from "./objects";

export type CameraShot = {
  at: number;
  target?: string;
  zoom?: number;
  fit?: number;
  align?: { x?: number; y?: number };
  nudge?: { x?: number; y?: number };
  axis?: "x" | "y";
  snap?: boolean;
  chase?: ChaseConfig;
};

const GRID = 2;
const DRIFT_REPORT = 3;
const quantize = (v: number) => Math.round(v / GRID) * GRID;
const seen = new Map<string, { x: number; y: number }>();
const reported = new Set<string>();
const missing = new Set<string>();

const reportTarget = (id: string, x: number, y: number) => {
  const last = seen.get(id);
  if (last && !reported.has(id)) {
    const dx = Math.abs(last.x - x);
    const dy = Math.abs(last.y - y);
    if (dx > DRIFT_REPORT || dy > DRIFT_REPORT) {
      reported.add(id);
      console.warn(
        `CameraRig: target "${id}" is not stable — it shifts ${Math.round(dx)}x${Math.round(dy)}px while the camera watches it. Point the shot at a container that keeps its size.`,
      );
    }
  }
  seen.set(id, { x, y });
};

const DRIFT_ZOOM_PER_FRAME = 0.00022;
const WANDER_PX = 4;
const WANDER_SPEED = 0.0055;

type Pose = { x: number; y: number; scale: number };

export const CameraRig: React.FC<{
  shots: CameraShot[];
  drift?: number;
  bounds?: boolean;
  children: React.ReactNode;
}> = ({ shots, drift = 1, bounds = true, children }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const ids = React.useMemo(
    () => shots.map((s) => s.target).filter((t): t is string => !!t),
    [shots],
  );
  const rects = useObjectRects(ids);

  const resolved: Pose[] = [];
  for (let i = 0; i < shots.length; i += 1) {
    const shot = shots[i];
    const rect = shot.target ? rects[shot.target] : undefined;
    if (shot.target && !rect && frame >= shot.at && !missing.has(shot.target)) {
      missing.add(shot.target);
      console.warn(`CameraRig: object "${shot.target}" not mounted at frame ${frame}`);
    }
    const raw = rect ? rectCenter(rect) : { x: width / 2, y: height / 2 };
    const center = { x: quantize(raw.x), y: quantize(raw.y) };
    if (shot.target && rect && frame >= shot.at) reportTarget(shot.target, center.x, center.y);
    let scale = shot.zoom ?? 1;
    if (shot.zoom === undefined && shot.fit !== undefined && rect) {
      scale = Math.min(
        width / (rect.width + shot.fit * 2),
        height / (rect.height + shot.fit * 2),
      );
    }
    const ax = shot.align?.x ?? 0.5;
    const ay = shot.align?.y ?? 0.5;
    let x = center.x + (shot.nudge?.x ?? 0) + ((0.5 - ax) * width) / scale;
    let y = center.y + (shot.nudge?.y ?? 0) + ((0.5 - ay) * height) / scale;
    const prev = resolved[i - 1];
    if (shot.axis === "x" && prev) y = prev.y;
    if (shot.axis === "y" && prev) x = prev.x;
    if (bounds && scale >= 1) {
      const hw = width / (2 * scale);
      const hh = height / (2 * scale);
      x = Math.min(Math.max(x, hw), width - hw);
      y = Math.min(Math.max(y, hh), height - hh);
    }
    resolved.push({ x, y, scale });
  }

  const activeAt = (k: number): number => {
    let idx = 0;
    for (let i = 0; i < shots.length; i += 1) {
      if (k >= shots[i].at) idx = i;
      else break;
    }
    return idx;
  };
  const fallback: Pose = { x: width / 2, y: height / 2, scale: 1 };
  const poseAt = (k: number): Pose => resolved[activeAt(k)] ?? fallback;
  const cfgAt = (k: number) => {
    const shot = shots[activeAt(k)];
    if (shot?.chase) return shot.chase;
    return shot?.snap ? CHASE.snap : CHASE.camera;
  };

  const cx = chase((k) => poseAt(k).x, frame, cfgAt);
  const cy = chase((k) => poseAt(k).y, frame, cfgAt);
  const cs = chase((k) => poseAt(k).scale, frame, cfgAt);

  const scale = cs.value * (1 + frame * DRIFT_ZOOM_PER_FRAME * drift);
  const x = cx.value + noise2D("camera-wander-x", frame * WANDER_SPEED, 0) * WANDER_PX * drift;
  const y = cy.value + noise2D("camera-wander-y", 0, frame * WANDER_SPEED) * WANDER_PX * drift;
  const tx = width / 2 - x * scale;
  const ty = height / 2 - y * scale;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        {...{ [STAGE_ATTR]: "" }}
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
