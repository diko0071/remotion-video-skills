import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  BrandContextBody,
  BrandIdentityBody,
  BrandVisualBody,
} from "../../../kit/ryze-ui/pages/brand";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import { NOTES_TEXT, NotesDialog } from "./notes-dialog";
import { ImprovePanelThread } from "./panel-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const VISUAL_AT = timeline.at("visual");
const CONTEXT_AT = timeline.at("context");
const NOTES_DIALOG_AT = timeline.at("notesDialog");
const NOTES_TYPING_AT = timeline.at("notesTyping");
const NOTES_SAVED_AT = timeline.at("notesSaved");
const IMPROVE_AT = timeline.at("improvePanel");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_BRAND_TOTAL = OUTRO_AT + 110;

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onB1 = frame < VISUAL_AT;
  const onB2 = frame >= VISUAL_AT && frame < CONTEXT_AT;
  const onB3 = frame >= CONTEXT_AT && frame < NOTES_SAVED_AT + 8;
  const onB4 = frame >= NOTES_SAVED_AT + 8;
  const dialogOpen = frame >= NOTES_DIALOG_AT && frame < NOTES_SAVED_AT + 4;
  const typed = typing(frame, NOTES_TEXT, NOTES_TYPING_AT, NOTES_TYPING_AT + 70);
  const panelProgress = usePanelSlide([{ open: IMPROVE_AT, close: OUTRO_AT + 40 }]);

  return (
    <ShellOverrideProvider value={{ expanded: true, nav: "Brand", section: "dashboard" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page="Brand"
          nav="Brand"
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Improve brand profile"
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <ImprovePanelThread from={IMPROVE_AT + 10} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onB1} scope="b1">
              <BrandIdentityBody />
            </PageLayer>
            <PageLayer visible={onB2} scope="b2">
              <BrandVisualBody />
            </PageLayer>
            <PageLayer visible={onB3} scope="b3">
              <BrandContextBody notes={null} notesEditId="brand.notes.edit" />
            </PageLayer>
            <PageLayer visible={onB4} scope="b4">
              <BrandContextBody notes={NOTES_TEXT} />
            </PageLayer>
          </div>
        </RyzeApp>
        <NotesDialog at={NOTES_DIALOG_AT} visible={dialogOpen} typed={typed} />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideBrand: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-brand"
    title={{ title: "How the Brand page works", accent: "Brand" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
