import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { OrbitMark } from "./mark";
import { END, INK, LIGHT, LINE } from "./timings";

const CX = 960;
const CY = 540;

export const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const s = ramp(frame, END.shrink[0], END.shrink[1], Easing.inOut(Easing.cubic));
  const r = interpolate(s, [0, 1], [END.disc.r0, END.disc.r1]);
  const bare = frame >= END.bare;
  const markSize = bare ? END.mark1 : interpolate(s, [0, 1], [END.mark0, END.mark0 * 0.9]);
  const orbitA = (frame - END.from) * 0.11;
  const orx = r * 1.55;
  const ory = r * 0.36;
  const tilt = -8;
  const trail = [0, 0.06, 0.12, 0.18, 0.24];
  const pt = (a: number) => {
    const x = orx * Math.cos(a);
    const y = ory * Math.sin(a);
    const t = (tilt * Math.PI) / 180;
    return { x: CX + x * Math.cos(t) - y * Math.sin(t), y: CY + x * Math.sin(t) + y * Math.cos(t) };
  };
  const wipe = ramp(frame, END.wipe[0], END.wipe[1], Easing.inOut(Easing.cubic));
  const appear = ramp(frame, END.from, END.from + 10);
  const outer = 1 - ramp(frame, END.shrink[1] - 14, END.shrink[1]);
  if (frame >= END.black) return <AbsoluteFill style={{ background: "#000" }} />;
  const cut = -30 + wipe * 160;
  const mask = `linear-gradient(to top right, transparent ${cut}%, #000 ${cut + 20}%)`;
  return (
    <AbsoluteFill style={{ background: LIGHT, overflow: "hidden" }}>
      {!bare ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: appear }}>
          <ellipse cx={CX} cy={CY + r * 0.2} rx={r * 2.3} ry={r * 1.7} fill="none" stroke={LINE} strokeWidth={1.3} strokeDasharray="8 10" opacity={outer * 0.8} transform={`rotate(-12 ${CX} ${CY})`} />
          <ellipse cx={CX} cy={CY + r * 0.1} rx={r * 3.1} ry={r * 2.3} fill="none" stroke={LINE} strokeWidth={1.1} opacity={outer * 0.45} transform={`rotate(-12 ${CX} ${CY})`} />
          <circle cx={CX} cy={CY} r={r} fill="#FAFAFA" stroke={LINE} strokeWidth={1.4} />
          <ellipse cx={CX} cy={CY} rx={orx} ry={ory} fill="none" stroke={LINE} strokeWidth={1.2} opacity={0.6} transform={`rotate(${tilt} ${CX} ${CY})`} />
          {trail.map((d, i) => {
            const p = pt(orbitA - d);
            return <circle key={i} cx={p.x} cy={p.y} r={Math.max(1, 9 - i * 1.8)} fill={INK} opacity={i === 0 ? 1 : 0.5 - i * 0.08} />;
          })}
        </svg>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: CX - markSize / 2,
          top: CY - markSize / 2,
          width: markSize,
          height: markSize,
          opacity: appear,
          WebkitMaskImage: wipe > 0 ? mask : undefined,
          maskImage: wipe > 0 ? mask : undefined,
        }}
      >
        <OrbitMark size={markSize} color={INK} />
      </div>
    </AbsoluteFill>
  );
};
