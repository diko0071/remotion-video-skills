import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { press, SPRINGS, useSpringAt } from "../../core/motion";
import { PhaseHeading } from "../../kit/phase-heading";
import { ToolFlow } from "../../kit/tool-flow";
import { CheckIcon } from "../../kit/ryze-ui/icons";
import { SfxTrack } from "../../kit/sfx";
import { AuditCard } from "./audit-card";
import { F } from "./timings";

const BAD_ITEMS = [
  { label: "Missing meta descriptions — 41 pages", ok: false },
  { label: "Broken links — 12 found", ok: false },
  { label: "3 pages blocked from Google", ok: false },
];

const FIXED_ITEMS = [
  { label: "Meta descriptions written — all 41", ok: true },
  { label: "0 broken links left", ok: true },
  { label: "Every page indexed", ok: true },
];

const FIX_TOOLS = [
  { label: "Connecting your Shopify", detail: "store access granted", start: F.toolsIn, done: F.tool1Done },
  { label: "Writing meta descriptions", detail: "41 pages · your brand voice", start: F.tool1Done, done: F.tool2Done },
  { label: "Repairing broken links", detail: "12 redirects placed", start: F.tool2Done, done: F.tool3Done },
  { label: "Unblocking pages from Google", detail: "robots.txt cleaned", start: F.tool3Done, done: F.tool4Done },
];

const ActionButton: React.FC<{
  label: string;
  doneLabel?: string;
  appearAt: number;
  pressAt: number;
  hideAt?: number;
}> = ({ label, doneLabel, appearAt, pressAt, hideAt }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(appearAt, SPRINGS.card);
  const pressed = frame >= pressAt;
  const out =
    hideAt !== undefined
      ? interpolate(frame, [hideAt, hideAt + 12], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;
  if (frame < appearAt || (hideAt !== undefined && frame > hideAt + 14)) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: pressed && doneLabel ? "rgba(5,150,105,0.1)" : "#171310",
          color: pressed && doneLabel ? "#047857" : "#F5EFE4",
          borderRadius: 10,
          padding: "16px 30px",
          fontSize: 19,
          fontWeight: 700,
          opacity: Math.min(1, p * 1.3) * out,
          transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px) scale(${press(frame, pressAt)})`,
        }}
      >
        {pressed && doneLabel ? (
          <>
            <CheckIcon size={17} /> {doneLabel}
          </>
        ) : (
          label
        )}
      </div>
    </div>
  );
};

export const AuditFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const toolsOut = interpolate(frame, [F.toolsOut, F.toolsOut + 12], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: F.fixPress },
          { name: "mouse-click", at: F.schedulePress },
        ]}
      />
      <div style={{ position: "relative", height: 64 }}>
        <PhaseHeading visibleFrom={0} visibleTo={F.auditOut}>
          Your score today
        </PhaseHeading>
        <PhaseHeading visibleFrom={F.toolsIn - 4} visibleTo={F.toolsOut}>
          Fixing it for you
        </PhaseHeading>
        <PhaseHeading visibleFrom={F.score2In - 4} visibleTo={99999}>
          <span style={{ display: "inline-flex", color: "#059669", marginRight: 2 }}>
            <CheckIcon size={30} strokeWidth={3} />
          </span>
          Fixed. And it stays fixed.
        </PhaseHeading>
      </div>

      <div style={{ position: "relative", marginTop: 26, minHeight: 340 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <AuditCard
            score={31}
            color="#e11d48"
            items={BAD_ITEMS}
            appearAt={F.scoreIn}
            hideAt={F.auditOut}
          />
          <ActionButton
            label="Fix in one click"
            appearAt={F.fixBtnIn}
            pressAt={F.fixPress}
            hideAt={F.auditOut}
          />
        </div>

        {frame >= F.toolsIn - 8 && frame <= F.toolsOut + 14 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              opacity: toolsOut,
            }}
          >
            <div
              style={{
                width: 520,
                alignSelf: "flex-start",
                borderRadius: 22,
                background: "#ffffff",
                boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 24px 70px rgba(20,15,10,0.13)",
                padding: "26px 30px",
              }}
            >
              <ToolFlow tools={FIX_TOOLS} />
            </div>
          </div>
        ) : null}

        {frame >= F.score2In - 4 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <AuditCard score={98} color="#059669" items={FIXED_ITEMS} appearAt={F.score2In} />
            <ActionButton
              label="Schedule weekly run"
              doneLabel="Scheduled — runs every Monday"
              appearAt={F.scheduleBtnIn}
              pressAt={F.schedulePress}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
