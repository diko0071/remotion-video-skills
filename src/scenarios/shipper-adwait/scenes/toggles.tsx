import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { HandCursor } from "../ui/hand-cursor";
import { Camera } from "../camera";
import { PALETTE } from "../timings";
import { UI_FONT } from "../ui/composer";

const APPS: { name: string; icon?: string; color?: string; glyph?: string }[] = [
  { name: "Claude Code", icon: "claude-code.svg" },
  { name: "VS Code", icon: "vscode.svg" },
  { name: "Lovable", color: "#E5484D", glyph: "♥" },
  { name: "Cursor", icon: "cursor-agent.svg" },
  { name: "V0", icon: "v0.svg" },
  { name: "Replit", icon: "replit.svg" },
  { name: "Bolt.new", color: "#101010", glyph: "b" },
  { name: "Antigravity", icon: "antigravity-cli.svg" },
  { name: "Shipper", color: "#2FA98C", glyph: "S" },
  { name: "Base44", color: "#E5533D", glyph: "●" },
];

const Toggle: React.FC<{ on: number }> = ({ on }) => {
  const tint = Math.min(1, on * 1.6);
  const slide = interpolate(on, [0.3, 1], [0, 25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 58,
        height: 33,
        borderRadius: 999,
        background: `rgb(${interpolate(tint, [0, 1], [227, 178])}, ${interpolate(tint, [0, 1], [227, 226])}, ${interpolate(tint, [0, 1], [227, 74])})`,
        display: "flex",
        alignItems: "center",
        padding: 3,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 27,
          height: 27,
          borderRadius: 999,
          background: "#fff",
          transform: `translateX(${slide}px)`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.24)",
        }}
      />
    </div>
  );
};

const Row: React.FC<{
  name: string;
  icon?: string;
  color?: string;
  glyph?: string;
  at: number;
}> = ({ name, icon, color, glyph, at }) => {
  const on = useSpringAt(at, SPRINGS.card, 12);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "21px 4px",
        borderTop: "1px solid #EFEFEF",
      }}
    >
      {icon ? (
        <Img
          src={staticFile(`shipper/icons/${icon}`)}
          style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 8 }}
        />
      ) : (
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: color,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {glyph}
        </div>
      )}
      <div style={{ fontSize: 23, color: "#141414", flex: 1 }}>{name}</div>
      <Toggle on={on} />
    </div>
  );
};

const Sheet: React.FC<{
  master: number;
  rowAt: (i: number) => number;
  scroll: number;
  dim: boolean;
}> = ({ master, rowAt, scroll, dim }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 22, fontFamily: UI_FONT }}>
    <div
      style={{
        background: "#F1EFEA",
        borderRadius: 10,
        padding: "9px 16px",
        fontSize: 19,
        color: "#3A3A3A",
        marginTop: 14,
      }}
    >
      ⊞ AI Apps
    </div>
    <div
      style={{
        width: 660,
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "26px 26px",
        boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
        overflow: "hidden",
        maxHeight: 515,
      }}
    >
      <div style={{ transform: `translateY(${scroll}px)` }}>
        <div style={{ display: "flex", alignItems: "center", paddingBottom: 14 }}>
          <div style={{ fontSize: 24, color: "#141414", flex: 1 }}>Enable monetization</div>
          <Toggle on={master} />
        </div>
        {APPS.map((a, i) => (
          <div key={a.name} style={{ opacity: dim && i > 2 ? 0.45 : 1 }}>
            <Row {...a} at={rowAt(i)} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SettingsWideShot: React.FC = () => (
  <AbsoluteFill style={{ background: "#0E0E0E" }}>
    <Camera
      keys={[
        { frame: 0, zoom: 1.5, x: 44, y: 48 },
        { frame: 23, zoom: 1.6, x: 36, y: 44 },
      ]}
    >
      <Sheet master={0} rowAt={() => 9999} scroll={0} dim />
    </Camera>
    <HandCursor
      stops={[
        { x: 1330, y: 452, at: 0 },
        { x: 1150, y: 392, at: 18 },
      ]}
      scale={2.1}
    />
  </AbsoluteFill>
);

export const SettingsMacroShot: React.FC = () => {
  const master = useSpringAt(30, SPRINGS.card, 12);
  return (
  <AbsoluteFill style={{ background: "#0E0E0E" }}>
    <Camera
      keys={[
        { frame: 0, zoom: 3.9, x: -148, y: 210 },
        { frame: 35, zoom: 4.0, x: -150, y: 206 },
      ]}
    >
      <Sheet master={master} rowAt={() => 9999} scroll={0} dim={false} />
    </Camera>
    <HandCursor
      stops={[
        { x: 1758, y: 566, at: 0 },
        { x: 1706, y: 496, at: 27, click: true },
      ]}
      scale={2.9}
    />
  </AbsoluteFill>
  );
};

export const SettingsCascadeShot: React.FC = () => {
  const frame = useCurrentFrame();
  const master = useSpringAt(0, SPRINGS.card, 6);
  const scroll = interpolate(frame, [4, 46], [0, -840], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "#0E0E0E" }}>
      <Camera
        keys={[
          { frame: 0, zoom: 3.6, x: -132, y: 140 },
          { frame: 12, zoom: 3.6, x: -132, y: 140 },
          { frame: 46, zoom: 3.3, x: -112, y: 60 },
        ]}
      >
        <Sheet master={master} rowAt={(i) => 1 + i * 3.9} scroll={scroll} dim={false} />
      </Camera>
      <HandCursor stops={[{ x: 1706, y: 496, at: 0 }, { x: 1718, y: 520, at: 30 }]} scale={2.6} />
    </AbsoluteFill>
  );
};

export const EndcardShot: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["The", "Idle", "Attention", "Company"];
  const rise = interpolate(frame, [0, 24], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cols = 30;
  const rows = 17;

  return (
    <AbsoluteFill style={{ background: "#0A0A0A", overflow: "hidden" }}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column" }}>
        {new Array(rows).fill(0).map((_, r) => (
          <div key={r} style={{ display: "flex", flex: 1 }}>
            {new Array(cols).fill(0).map((_, c) => {
              const d = (c / cols) * 0.42 + (r / rows) * 0.78;
              const wave = 0.06 * Math.sin(c * 0.9 + r * 0.5);
              const t = Math.max(0, Math.min(1, d + wave)) * rise;
              const light = 4 + t * 34;
              const sat = 12 + t * 60;
              return (
                <div
                  key={c}
                  style={{ flex: 1, background: `hsl(${74 - t * 6} ${sat}% ${light}%)` }}
                />
              );
            })}
          </div>
        ))}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1.7px, transparent 1.8px)",
          backgroundSize: "86px 86px",
          backgroundPosition: "20px 20px",
          opacity: 0.3 + rise * 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 84px, rgba(255,255,255,0.28) 84px 86px)",
          maskImage: "linear-gradient(90deg, transparent 52%, #000 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 52%, #000 100%)",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 24, fontFamily: UI_FONT }}>
          {words.map((w, i) => {
            const p = interpolate(frame, [1 + i * 3, 6 + i * 3], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <span
                key={w}
                style={{
                  fontSize: 100,
                  fontWeight: 500,
                  color: PALETTE.lime,
                  letterSpacing: "-0.022em",
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
