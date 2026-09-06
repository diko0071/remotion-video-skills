import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor } from "../../kit/cursor";
import { DirectionalBlur } from "../../kit/directional-blur";
import { CAPSULE_TOP, CAPSULE_W, MCP_SCALE, sample } from "./curves";
import { ramp } from "../../core/motion";
import { SANS } from "./font";
import { PLATFORM_ORDER, PlatformIcon } from "../../kit/platform-icon";
import { Pop } from "../../kit/pop";
import { cursorAt, Stop } from "../../core/stage";
import { CABLE, CAPSULE, CAPSULE_BLACK, CHIP, CORAL, CURSOR1, CURSOR1_EXIT, CUT_WIDE, DRAG, ICONS, KNOB, MCP, PORT, SCATTER } from "./timings";


const Bars: React.FC<{ x: number; tops: number[]; widths: number[]; h: number; color: string; right?: boolean }> = ({ x, tops, widths, h, color, right }) => (
  <>
    {tops.map((top, i) => (
      <div key={i} style={{ position: "absolute", top, left: right ? x - widths[i] : x, width: widths[i], height: h, borderRadius: h / 2, background: color }} />
    ))}
  </>
);



const PILL_BARS = { x: 43, tops: [57, 92, 128], widths: [87, 141, 87], h: 21 } as const;
const CARRY = { scale: 0.62, dx: 30, dy: 34, land: 6, settle: 8 } as const;

const LEFT = CAPSULE.cx - CAPSULE.w / 2;
const TOP = CAPSULE.cy - CAPSULE.h / 2;
const EDGE_X = CAPSULE.cx + CAPSULE.w / 2;

export const iconWorld = (i: number) => ({
  x: LEFT + ICONS.x + i * ICONS.gap + ICONS.size / 2,
  y: TOP + ICONS.y + ICONS.size / 2,
});

const SCATTER_DIR = [
  { dx: 120, dy: -260, rot: -60 },
  { dx: 60, dy: 180, rot: 50 },
  { dx: -110, dy: -90, rot: -40 },
  { dx: 90, dy: 240, rot: 45 },
  { dx: -40, dy: -220, rot: -45 },
];

export const CapsuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const top = sample(CAPSULE_TOP, frame, CAPSULE.rise);
  const topPrev = sample(CAPSULE_TOP, frame - 1, CAPSULE.rise);
  const w = sample(CAPSULE_W, frame, CAPSULE.rise);
  const vy = Math.abs(top - topPrev);
  const scatter = ramp(frame, SCATTER.from, SCATTER.to);
  const wide = frame >= CUT_WIDE;
  const knob = ramp(frame, KNOB.out, KNOB.to);
  const drag = 1 - Math.pow(1 - ramp(frame, DRAG.from, DRAG.to), 3);
  const cableEnd = wide ? DRAG.xFrom + (DRAG.xTo - DRAG.xFrom) * drag : EDGE_X + KNOB.travel * knob;
  const mcpScale = sample(MCP_SCALE, frame, MCP.appear);
  const mcpPrev = sample(MCP_SCALE, frame - 1, MCP.appear);
  const mcpBlur = Math.abs(mcpScale - mcpPrev) * 90;
  const stops: Stop[] = [
    { x: CURSOR1.from.x, y: CURSOR1.from.y, at: CURSOR1.appear },
    { x: CURSOR1.mid.x, y: CURSOR1.mid.y, at: CURSOR1.mid.at },
    { x: CURSOR1.hover.x, y: CURSOR1.hover.y, at: CURSOR1.hover.at },
    { x: CURSOR1.hover.x, y: CURSOR1.hover.y, at: CURSOR1.grab, click: true },
    { x: EDGE_X + KNOB.travel - 6, y: CAPSULE.cy + 4, at: KNOB.to },
    { x: DRAG.xFrom, y: CAPSULE.cy + 2, at: CUT_WIDE },
    { x: DRAG.xTo, y: CAPSULE.cy + 2, at: DRAG.to },
    { x: DRAG.xTo + 8, y: CAPSULE.cy + 12, at: CURSOR1_EXIT.at },
    { x: CURSOR1_EXIT.to.x, y: CURSOR1_EXIT.to.y, at: CURSOR1_EXIT.end },
  ];
  const cur = cursorAt(stops, frame, fps);
  const landAt = MCP.appear + CARRY.land;
  const settle = 1 - Math.pow(1 - ramp(frame, landAt, landAt + CARRY.settle), 3);
  const barsHome = { x: MCP.cx - MCP.w / 2 + PILL_BARS.x, y: CAPSULE.cy - MCP.h / 2 + PILL_BARS.tops[0] };
  const carryX = cur.x + CARRY.dx + (barsHome.x - cur.x - CARRY.dx) * settle;
  const carryY = cur.y + CARRY.dy + (barsHome.y - cur.y - CARRY.dy) * settle;
  const carryScale = CARRY.scale + (1 - CARRY.scale) * settle;
  const carrying = frame >= CURSOR1.grab + 2 && frame < landAt + CARRY.settle;
  const carryIn = ramp(frame, CURSOR1.grab + 2, CURSOR1.grab + 8);
  const grabbed = frame >= CURSOR1.grab;
  const capW = w;
  const shiftY = top - TOP;
  return (
    <>
      {frame >= KNOB.out ? (
        <div style={{ position: "absolute", left: EDGE_X - 8, top: CAPSULE.cy - CABLE.h / 2, width: Math.max(0, (frame >= MCP.appear ? MCP.cx - MCP.w / 2 + 10 : cableEnd) - EDGE_X + 8), height: CABLE.h, background: CABLE.color, borderRadius: CABLE.h / 2 }} />
      ) : null}
      {frame >= KNOB.out && !wide ? (
        <div style={{ position: "absolute", left: cableEnd - KNOB.r, top: CAPSULE.cy - KNOB.r, width: KNOB.r * 2, height: KNOB.r * 2, borderRadius: KNOB.r, background: "#5C5C5C" }} />
      ) : null}
      {frame >= CAPSULE.rise ? (
        <DirectionalBlur id="mh-capsule" x={scatter * 24} y={vy * 0.32} style={{ position: "absolute", left: CAPSULE.cx - capW / 2, top, width: capW, height: CAPSULE.h }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: CAPSULE.radius, background: CAPSULE_BLACK, boxShadow: "0 28px 60px rgba(0,0,0,0.28)" }} />
          <Pop at={CHIP.at} style={{ position: "absolute", left: CHIP.x, top: CHIP.y }}>
            <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.6)", borderRadius: 999, padding: "9px 19px", lineHeight: 1.1, whiteSpace: "nowrap" }}>AI Platforms</span>
          </Pop>
          <Pop at={PORT.at} from={0.7} style={{ position: "absolute", left: PORT.x, top: PORT.y, width: PORT.w, height: PORT.h, transform: `scale(${grabbed ? 0.96 : 1})` }}>
            <span style={{ position: "relative", display: "block", width: PORT.w, height: PORT.h }}>
              <Bars right x={195} tops={[16, 62, 108]} widths={[115, 187, 115]} h={26} color="#EDEDED" />
            </span>
          </Pop>
        </DirectionalBlur>
      ) : null}
      {frame >= CAPSULE.rise
        ? PLATFORM_ORDER.map((id, i) => {
            const base = iconWorld(i);
            const dir = SCATTER_DIR[i];
            const size = id === "google" ? ICONS.size * 1.2 : ICONS.size;
            const w = size;
            const plate = scatter * 84;
            return (
              <DirectionalBlur
                key={id}
                id={`mh-icon-${i}`}
                x={scatter * 8}
                y={vy * 0.32 + scatter * 10}
                style={{ position: "absolute", left: base.x - w / 2 + dir.dx * scatter, top: base.y - size / 2 + shiftY + dir.dy * scatter, width: w, height: size, transform: `rotate(${dir.rot * scatter}deg)` }}
              >
                <div style={{ position: "absolute", left: (w - size) / 2 - plate / 2, top: -plate / 2, width: size + plate, height: size + plate, borderRadius: 8 + plate * 0.25, background: CAPSULE_BLACK, opacity: Math.min(1, scatter * 2) }} />
                <Pop at={ICONS.at[i]} style={{ position: "absolute", inset: 0 }}>
                  <PlatformIcon id={id} size={size} />
                </Pop>
              </DirectionalBlur>
            );
          })
        : null}
      {frame >= MCP.appear ? (
        <DirectionalBlur id="mh-mcp" x={mcpBlur} y={mcpBlur * 0.4} style={{ position: "absolute", left: MCP.cx - MCP.w / 2 - scatter * 70, top: CAPSULE.cy - MCP.h / 2, width: MCP.w, height: MCP.h, transform: `scale(${mcpScale * (1 - scatter * 0.15)})` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: MCP.h / 2, background: CORAL, boxShadow: "0 24px 50px rgba(232,115,90,0.35)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: MCP.h / 2, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: frame >= landAt + CARRY.settle ? 1 : 0 }}>
              <Bars x={PILL_BARS.x} tops={[...PILL_BARS.tops]} widths={[...PILL_BARS.widths]} h={PILL_BARS.h} color="#EFEFEF" />
            </div>
            <Pop at={MCP.appear + 10} from={0.4} style={{ position: "absolute", right: 44, top: 34 }}>
              <Img src={staticFile("integrations/mcp.svg")} style={{ width: 40, height: 40, display: "block" }} />
            </Pop>
            <Pop at={MCP.appear + 13} style={{ position: "absolute", right: 44, bottom: 26 }}>
              <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 400, color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.75)", borderRadius: 999, padding: "6px 17px", lineHeight: 1.1 }}>MCP</span>
            </Pop>
          </div>
        </DirectionalBlur>
      ) : null}
      {carrying ? (
        <div style={{ position: "absolute", left: carryX, top: carryY, width: PILL_BARS.widths[1], height: PILL_BARS.tops[2] - PILL_BARS.tops[0] + PILL_BARS.h, transform: `scale(${carryScale})`, transformOrigin: "0 0", opacity: carryIn, filter: `drop-shadow(0 6px 14px rgba(0,0,0,0.25))` }}>
          <Bars x={0} tops={[0, PILL_BARS.tops[1] - PILL_BARS.tops[0], PILL_BARS.tops[2] - PILL_BARS.tops[0]]} widths={[...PILL_BARS.widths]} h={PILL_BARS.h} color={frame < CUT_WIDE ? "#EDEDED" : "#EFEFEF"} />
        </div>
      ) : null}
      <Cursor appearAt={CURSOR1.appear} scale={2.2} stops={stops} />
    </>
  );
};
