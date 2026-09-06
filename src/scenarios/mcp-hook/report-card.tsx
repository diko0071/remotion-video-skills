import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DOC, REPORT, REPORT_ROWS } from "./claude-timings";

const ACCENT = "#D97757";
const SERIF = "var(--cl-serif, Georgia, serif)";

const RowIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const common = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: ACCENT, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "target")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill={ACCENT} />
      </svg>
    );
  if (kind === "chart")
    return (
      <svg {...common}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    );
  if (kind === "star")
    return (
      <svg {...common}>
        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
      </svg>
    );
  if (kind === "edit")
    return (
      <svg {...common}>
        <path d="M4 20h5l10-10-5-5L4 15z M13 6l5 5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
};

const StreamWords: React.FC<{ text: string; from: number; to: number }> = ({ text, from, to }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <span>
      {words.map((w, i) => {
        const at = from + (i / words.length) * (to - from);
        const t = ramp(frame, at, at + 5);
        return (
          <span key={i} style={{ color: t <= 0 ? "transparent" : t < 1 ? ACCENT : "#141413" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
};

export const ReportCard: React.FC = () => {
  const frame = useCurrentFrame();
  const cardIn = 1 - Math.pow(1 - ramp(frame, REPORT.at + 2, REPORT.at + 12), 3);
  return (
    <div style={{ width: 320, borderRadius: 10, border: "0.5px solid rgba(20,20,19,0.16)", background: "#FFFFFF", padding: "12px 14px", opacity: cardIn, transform: `translateY(${(1 - cardIn) * 12}px)` }}>
      <div style={{ fontFamily: "inherit", fontSize: 8, fontWeight: 700, color: "#141413", marginBottom: 6 }}>Weekly visibility snapshot</div>
      {REPORT_ROWS.map((r, i) => {
        const at = REPORT.rows[i];
        const p = 1 - Math.pow(1 - ramp(frame, at, at + 6), 3);
        return (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderTop: i === 0 ? undefined : "0.5px solid rgba(20,20,19,0.08)", opacity: p, transform: `translateY(${(1 - p) * 6}px)` }}>
            <span style={{ flex: "none", display: "inline-flex" }}>
              <RowIcon kind={r.icon} />
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 9, lineHeight: 1.4, color: "#141413" }}>
              <StreamWords text={r.text} from={at} to={at + 10} />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const DocCard: React.FC<{ hideIcon: boolean }> = ({ hideIcon }) => {
  const frame = useCurrentFrame();
  const p = 1 - Math.pow(1 - ramp(frame, REPORT.docAt, REPORT.docAt + 10), 3);
  return (
    <div style={{ width: 480, height: 46, borderRadius: 8, border: "0.5px solid rgba(20,20,19,0.16)", background: "#FFFFFF", display: "flex", alignItems: "center", gap: 10, padding: "0 10px", opacity: p, transform: `translateY(${(1 - p) * 10}px)` }}>
      <span data-click="doc.icon" style={{ width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: hideIcon ? 0 : 1 }}>
        <Img src={staticFile("integrations/google-docs.svg")} style={{ width: 22, height: 22, display: "block" }} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 500, color: "#141413" }}>{DOC.title}</span>
        <span style={{ fontSize: 8, color: "#91908A" }}>{DOC.meta}</span>
      </span>
      <Img src={staticFile("integrations/google-drive.svg")} style={{ width: 17, height: 15, display: "block" }} />
      <span style={{ fontSize: 8.5, fontWeight: 500, color: "#141413", border: "0.5px solid rgba(20,20,19,0.2)", borderRadius: 6, padding: "4px 8px" }}>Download</span>
    </div>
  );
};
