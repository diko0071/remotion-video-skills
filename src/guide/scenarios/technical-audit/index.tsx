import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  AUDIT_PAGE_ROWS,
  AUDIT_RINGS,
  AUDIT_SITE_ROW,
  TechnicalAuditBody,
} from "../../../kit/ryze-ui/pages/technical-audit";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { useGuideScroll } from "../../scroll";
import { ACTS, ROW_URL } from "./acts";
import { FixPanelThread } from "./panel-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const ROW_OPEN_AT = timeline.at("rowOpen");
const FIX_PANEL_AT = timeline.at("fixPanel");
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const RESCANNED_AT = timeline.at("rescanned");
const SCAN_DONE_AT = RESCANNED_AT + 75;
const OUTRO_AT = timeline.total - 4;

export const GUIDE_TECHNICAL_AUDIT_TOTAL = OUTRO_AT + 110;

const ROWS_CLOSED = [AUDIT_SITE_ROW, ...AUDIT_PAGE_ROWS];
const ROWS_OPEN = [
  AUDIT_SITE_ROW,
  ...AUDIT_PAGE_ROWS.map((r) => (r.url === ROW_URL ? { ...r, open: true } : r)),
];
const HEALED_RINGS = AUDIT_RINGS.map((ring) => ({
  ...ring,
  value: ring.value + 26,
  tone: "#059669",
  stroke: "#10b981",
}));
const ROWS_HEALED = ROWS_CLOSED.map((r) => ({
  ...r,
  open: false,
  score: Math.min(97, r.score + 30),
  count: 0,
  issues: [],
}));

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = useGuideScroll(timeline.scrolls);
  const panelProgress = usePanelSlide([{ open: FIX_PANEL_AT, close: PANEL_CLOSED_AT }]);

  const onT1 = frame < ROW_OPEN_AT;
  const onT1b = frame >= ROW_OPEN_AT && frame < FIX_PANEL_AT - 40;
  const onT2 = frame >= FIX_PANEL_AT - 40 && frame < RESCANNED_AT;
  const onScan = frame >= RESCANNED_AT && frame < SCAN_DONE_AT;
  const onT3 = frame >= SCAN_DONE_AT;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav: "Technical Audit", section: "seo" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page="Technical Audit"
          nav="Technical Audit"
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Fix audit issues"
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <FixPanelThread from={FIX_PANEL_AT + 10} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onT1} scope="t1">
              <TechnicalAuditBody rows={ROWS_CLOSED} scrollPx={scroll} />
            </PageLayer>
            <PageLayer visible={onT1b} scope="t1b">
              <TechnicalAuditBody rows={ROWS_OPEN} scrollPx={scroll} />
            </PageLayer>
            <PageLayer visible={onT2} scope="t2">
              <TechnicalAuditBody rows={ROWS_OPEN} scrollPx={scroll} />
            </PageLayer>
            <PageLayer visible={onScan} scope="ts">
              <TechnicalAuditBody rows={ROWS_OPEN} scanning />
            </PageLayer>
            <PageLayer visible={onT3} scope="t3">
              <TechnicalAuditBody health={84} rings={HEALED_RINGS} rows={ROWS_HEALED} />
            </PageLayer>
          </div>
        </RyzeApp>
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideTechnicalAudit: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-technical-audit"
    title={{ title: "How the Technical Audit works", accent: "Technical" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
