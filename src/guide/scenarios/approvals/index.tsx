import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import {
  ApprovalDetailSheet,
  ApprovalRejectDialog,
  ApprovalsBody,
  HISTORY_ROWS,
  PENDING_ROWS,
} from "../../../kit/ryze-ui/pages/approvals";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS, CARD_1, CARD_2, CARD_REJECT } from "./acts";
import { ApplyRunChat, ResearchRunChat } from "./run-chats";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const SHEET1_AT = timeline.at("sheet1");
const RESEARCH_AT = timeline.at("researchChat");
const BACK_RESEARCH_AT = timeline.at("backResearch");
const APPROVED1_AT = timeline.at("approved1");
const APPLY_AT = timeline.at("applyChat");
const BACK_APPLY_AT = timeline.at("backApply");
const SHEET2_AT = timeline.at("sheet2");
const APPROVED2_AT = timeline.at("approved2");
const REJECT_DLG_AT = timeline.at("rejectDlg");
const REASON_AT = timeline.at("reasonTyping");
const REJECTED_AT = timeline.at("rejected");
const SHEET_BLOCKED_AT = timeline.at("sheetBlocked");
const BLOCKED_CLOSED_AT = timeline.at("blockedClosed");
const HISTORY_AT = timeline.at("history");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_APPROVALS_TOTAL = OUTRO_AT + 110;

const ROW_1 = PENDING_ROWS.find((r) => r.id === CARD_1)!;
const ROW_2 = PENDING_ROWS.find((r) => r.id === CARD_2)!;
const ROW_BLOCKED = PENDING_ROWS.find((r) => r.id === "connect-google-ads")!;
const ROW_REJECTED = PENDING_ROWS.find((r) => r.id === CARD_REJECT)!;
const HISTORY_FINAL = [
  { ...ROW_1, status: "applied" as const, age: "just now" },
  { ...ROW_2, status: "applied" as const, age: "just now" },
  { ...ROW_REJECTED, status: "rejected" as const, age: "just now" },
  ...HISTORY_ROWS,
];
const REASON = "Our meta titles are on-brand as written — don't rewrite copy.";

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onChatR = frame >= RESEARCH_AT && frame < BACK_RESEARCH_AT;
  const onChatA = frame >= APPLY_AT && frame < BACK_APPLY_AT;
  const onList = !onChatR && !onChatA;
  const onP1 = onList && frame < APPROVED1_AT + 14;
  const onP2 = onList && !onP1 && frame < BACK_APPLY_AT;
  const onP3 = onList && frame >= BACK_APPLY_AT && frame < APPROVED2_AT + 14;
  const onP3b = onList && frame >= APPROVED2_AT + 14 && frame < REJECTED_AT;
  const onP4 = onList && frame >= REJECTED_AT && frame < HISTORY_AT;
  const onP5 = onList && frame >= HISTORY_AT;

  const sheet1Open = frame >= SHEET1_AT && frame < RESEARCH_AT;
  const sheet2Open = frame >= SHEET2_AT && frame < APPROVED2_AT + 14;
  const sheetBlockedOpen = frame >= SHEET_BLOCKED_AT && frame < BLOCKED_CLOSED_AT + 4;
  const rejectOpen = frame >= REJECT_DLG_AT && frame < REJECTED_AT + 4;
  const reason = typing(frame, REASON, REASON_AT, REASON_AT + 70);

  return (
    <ShellOverrideProvider
      value={{ expanded: true, nav: "Approvals", section: "dashboard" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp workspace="ember-and-oak" page="Approvals" nav="Approvals" credits="4,180" stretch>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onP1} scope="p1">
              <ApprovalsBody />
            </PageLayer>
            <PageLayer visible={onP2} scope="p2">
              <ApprovalsBody statusOverrides={{ [CARD_1]: "applying" }} />
            </PageLayer>
            <PageLayer visible={onP3} scope="p3">
              <ApprovalsBody statusOverrides={{ [CARD_1]: "applied" }} />
            </PageLayer>
            <PageLayer visible={onP3b} scope="p3b">
              <ApprovalsBody
                statusOverrides={{ [CARD_1]: "applied", [CARD_2]: "applied" }}
              />
            </PageLayer>
            <PageLayer visible={onP4} scope="p4">
              <ApprovalsBody
                statusOverrides={{
                  [CARD_1]: "applied",
                  [CARD_2]: "applied",
                  [CARD_REJECT]: "rejected",
                  ...(frame >= BLOCKED_CLOSED_AT
                    ? { "connect-google-ads": "acknowledged" as const }
                    : null),
                }}
              />
            </PageLayer>
            <PageLayer visible={onP5} scope="p5">
              <ApprovalsBody tab="History" rows={HISTORY_FINAL} />
            </PageLayer>
            <PageLayer visible={onChatR} scope="rc">
              <ResearchRunChat from={RESEARCH_AT} />
            </PageLayer>
            <PageLayer visible={onChatA} scope="ac">
              <ApplyRunChat from={APPLY_AT + 2} />
            </PageLayer>
          </div>
        </RyzeApp>
        <PageLayer visible={sheet1Open} scope="s1">
          <ApprovalDetailSheet
            at={SHEET1_AT}
            row={ROW_1}
            statusOverride={frame >= APPROVED1_AT + 8 ? "applying" : undefined}
            showApplyLink={frame >= APPROVED1_AT + 8}
          />
        </PageLayer>
        <PageLayer visible={sheetBlockedOpen} scope="sb">
          <ApprovalDetailSheet at={SHEET_BLOCKED_AT} row={ROW_BLOCKED} />
        </PageLayer>
        <PageLayer visible={sheet2Open} scope="s2">
          <ApprovalDetailSheet
            at={SHEET2_AT}
            row={ROW_2}
            statusOverride={frame >= APPROVED2_AT + 10 ? "applying" : undefined}
          />
        </PageLayer>
        <ApprovalRejectDialog at={REJECT_DLG_AT} visible={rejectOpen} reasonText={reason} />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideApprovals: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-approvals"
    title={{ title: "How Approvals work", accent: "Approvals" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
