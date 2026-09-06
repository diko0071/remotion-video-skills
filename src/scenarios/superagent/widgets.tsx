import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { Pop } from "../../kit/pop";

const UI = "Inter, -apple-system, sans-serif";
export const CARD_BG = "#FCFBF6";

export const Card: React.FC<{ at: number; x: number; y: number; w: number; h: number; id: string; children: React.ReactNode; scaleFrom?: number }> = ({ at, x, y, w, h, id, children, scaleFrom = 0.6 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <Pop
      at={at}
      from={scaleFrom}
      rise={0}
      blur={{ id, scale: 40, style: { position: "absolute", left: x, top: y, width: w, height: h } }}
      style={{ display: "block", width: w, height: h, borderRadius: 26, background: CARD_BG, boxShadow: "0 24px 60px rgba(60,50,20,0.14), 0 0 0 1px rgba(60,50,20,0.06)", transformOrigin: "50% 50%", overflow: "hidden", fontFamily: UI, color: "#1A1A1A" }}
    >
      {children}
    </Pop>
  );
};

export const CardHead: React.FC<{ title: string; sub: string; at: number; icons?: boolean; info?: boolean; size?: number }> = ({ title, sub, at, icons = true, info, size = 30 }) => {
  const frame = useCurrentFrame();
  const t = ramp(frame, at, at + 10);
  const s = ramp(frame, at + 4, at + 14);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.01em", opacity: t, transform: `translateY(${(1 - t) * 8}px)` }}>
          {title}
          {info ? <span style={{ display: "inline-block", width: size * 0.55, height: size * 0.55, borderRadius: "50%", background: "#F2B233", marginLeft: 12, verticalAlign: "middle" }} /> : null}
        </div>
        <div style={{ fontSize: size * 0.66, color: "#4B4B4B", marginTop: 6, opacity: s, transform: `translateY(${(1 - s) * 6}px)` }}>{sub}</div>
      </div>
      {icons ? (
        <div style={{ display: "flex", gap: 10, opacity: s }}>
          {["M3 17l5-5 4 4 8-8", "M4 20V9M10 20V4M16 20v-8M22 20v-5"].map((d, i) => (
            <span key={i} style={{ width: size * 1.5, height: size * 1.5, borderRadius: 10, background: "#F1EFE4", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#3B6BFF" : "#444"} strokeWidth={2} strokeLinecap="round">
                <path d={d} />
              </svg>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const Counter: React.FC<{ from: number; to: number; range: readonly [number, number]; suffix?: string; size?: number }> = ({ from, to, range, suffix = "%", size = 96 }) => {
  const frame = useCurrentFrame();
  const v = Math.round(from + (to - from) * ramp(frame, range[0], range[1]));
  return <span style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{v}{suffix}</span>;
};

export const Chip: React.FC<{ at: number; label: string; color?: string; bg?: string }> = ({ at, label, color = "#0B7A3B", bg = "#CFF5DE" }) => {
  const s = useSpringAt(at, SPRINGS.pop, 16);
  return (
    <span style={{ display: "inline-block", padding: "8px 22px", borderRadius: 999, background: bg, color, fontSize: 28, fontWeight: 500, transform: `scale(${0.4 + 0.6 * s})`, opacity: Math.min(1, s * 2) }}>
      {label}
    </span>
  );
};

export const ThickLine: React.FC<{ range: readonly [number, number]; w: number; h: number }> = ({ range, w, h }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, range[0], range[1], Easing.inOut(Easing.cubic));
  const d = `M 0 ${h * 0.55} C ${w * 0.15} ${h * 0.55}, ${w * 0.2} ${h * 0.95}, ${w * 0.35} ${h * 0.9} C ${w * 0.5} ${h * 0.85}, ${w * 0.55} ${h * 0.2}, ${w * 0.7} ${h * 0.18} C ${w * 0.85} ${h * 0.15}, ${w * 0.9} ${h * 0.05}, ${w} 0`;
  const end = { x: interpolate(p, [0, 1], [0, w]), y: interpolate(p, [0, 0.35, 0.7, 1], [h * 0.55, h * 0.9, h * 0.18, 0]) };
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sa-thick" x1="0" x2="1">
          <stop offset="0" stopColor="#E85D4C" />
          <stop offset="0.55" stopColor="#E85D4C" />
          <stop offset="1" stopColor="#3B6BFF" />
        </linearGradient>
      </defs>
      <path d={d} stroke="url(#sa-thick)" strokeWidth={22} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <circle cx={end.x} cy={end.y} r={30} fill="#E9E4C9" />
    </svg>
  );
};

const bell = (w: number, h: number, cx: number, sig: number, amp: number) => {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * w;
    const y = h - amp * h * Math.exp(-Math.pow((x - cx * w) / (sig * w), 2));
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return pts.join(" ");
};

export const Bells: React.FC<{ range: readonly [number, number]; w: number; h: number }> = ({ range, w, h }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, range[0], range[1], Easing.out(Easing.cubic));
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {[0, 25, 50, 75].map((v) => (
        <text key={v} x={-10} y={h - (v / 100) * h + 5} fontSize={16} fill="#6B6B6B" textAnchor="end" fontFamily="Inter, sans-serif">{v}%</text>
      ))}
      <path d={bell(w, h, 0.62, 0.16, 0.85)} stroke="#2FD3B0" strokeWidth={4} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <path d={bell(w, h, 0.38, 0.17, 0.62)} stroke="#6A5CFF" strokeWidth={4} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {["Jan1", "Jan2", "Jan3", "Jan4", "Jan5", "Jan6", "Jan7"].map((l, i) => (
        <text key={l} x={(i / 6) * w} y={h + 26} fontSize={15} fill="#6B6B6B" textAnchor="middle" fontFamily="Inter, sans-serif">{l}</text>
      ))}
    </svg>
  );
};

export const Gauge: React.FC<{ range: readonly [number, number]; size: number; value: number }> = ({ range, size, value }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, range[0], range[1], Easing.out(Easing.cubic));
  const r = size / 2 - 40;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const arc = (a0: number, a1: number, color: string) => {
    const s = Math.PI + (a0 * Math.PI);
    const e = Math.PI + (a1 * Math.PI);
    const x0 = cx + r * Math.cos(s), y0 = cy + r * Math.sin(s), x1 = cx + r * Math.cos(e), y1 = cy + r * Math.sin(e);
    return <path key={color} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} stroke={color} strokeWidth={44} fill="none" strokeLinecap="butt" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, (p - a0) / (a1 - a0)))} />;
  };
  return (
    <svg width={size} height={size * 0.62} style={{ overflow: "visible" }}>
      {arc(0, 0.62, "#20C15E")}
      {arc(0.62, 0.86, "#F2B233")}
      {arc(0.86, 1, "#F03A5F")}
      <text x={cx} y={cy - 40} fontSize={26} fill="#333" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing={2} opacity={p}>POSITIVE</text>
      <text x={cx} y={cy + 12} fontSize={64} fontWeight={600} fill="#111" textAnchor="middle" fontFamily="Inter, sans-serif" opacity={p}>{Math.round(value * p)}</text>
    </svg>
  );
};

export const Bars: React.FC<{ range: readonly [number, number]; w: number; h: number; values: { v: number; color: string; icon: string }[] }> = ({ range, w, h, values }) => {
  const frame = useCurrentFrame();
  const bw = w / values.length;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {values.map((b, i) => {
        const p = ramp(frame, range[0] + i * 3, range[0] + i * 3 + 10, Easing.out(Easing.cubic));
        const bh = (b.v / 100) * h * p;
        return (
          <g key={i}>
            <rect x={i * bw + bw * 0.2} y={h - bh} width={bw * 0.6} height={bh} rx={8} fill={b.color} />
            <foreignObject x={i * bw + bw * 0.2} y={h - bh + 6} width={bw * 0.6} height={40}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: 28, height: 28, borderRadius: 7, background: "#FFF", display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: p }}>
                  <Img src={staticFile(b.icon)} style={{ width: 18, height: 18, objectFit: "contain" }} />
                </span>
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
};

export const ModelTiles: React.FC<{ at: number; items: { name: string; icon: string; v: number; delta: string }[] }> = ({ at, items }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {items.map((it, i) => {
        const p = ramp(frame, at + i * 4, at + i * 4 + 8, Easing.out(Easing.cubic));
        return (
          <div key={it.name} style={{ borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", background: "#FFF", padding: 16, opacity: p, transform: `translateY(${(1 - p) * 10}px)` }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: "#F1EFE4", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(it.icon)} style={{ width: 24, height: 24, objectFit: "contain" }} />
            </span>
            <div style={{ fontSize: 20, marginTop: 12, color: "#333" }}>{it.name}</div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 4 }}>
              {it.v} <span style={{ fontSize: 16, color: "#0B7A3B", fontWeight: 500 }}>{it.delta}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BarRows: React.FC<{ at: number; rows: { label: string; v: number; color: string }[] }> = ({ at, rows }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map((r, i) => {
        const p = ramp(frame, at + i * 3, at + i * 3 + 10, Easing.out(Easing.cubic));
        return (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14, opacity: p }}>
            <span style={{ width: 150, fontSize: 17, color: "#444" }}>{r.label}</span>
            <span style={{ flex: 1, height: 12, borderRadius: 6, background: "#EEECE2", overflow: "hidden" }}>
              <span style={{ display: "block", width: `${r.v * p}%`, height: "100%", background: r.color, borderRadius: 6 }} />
            </span>
            <span style={{ width: 50, fontSize: 17, textAlign: "right" }}>{Math.round(r.v * p)}%</span>
          </div>
        );
      })}
    </div>
  );
};

export const SourceRows: React.FC<{ at: number; rows: { title: string; domain: string; n: number; icon: string }[] }> = ({ at, rows }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((r, i) => {
        const p = ramp(frame, at + i * 4, at + i * 4 + 8, Easing.out(Easing.cubic));
        return (
          <div key={r.title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.07)", background: "#FFF", opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
            <Img src={staticFile(r.icon)} style={{ width: 28, height: 28, borderRadius: 8, objectFit: "cover" }} />
            <span style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: "#777" }}>{r.domain}</div>
            </span>
            <span style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{r.n}</div>
              <div style={{ fontSize: 12, color: "#777" }}>Citations</div>
            </span>
            <span style={{ fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.15)" }}>Engage</span>
          </div>
        );
      })}
    </div>
  );
};
