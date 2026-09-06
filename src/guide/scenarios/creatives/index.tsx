import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { ChatPage } from "../../../kit/ryze-ui/chat-page";
import { Composer } from "../../../kit/ryze-ui/composer";
import { ComposerMenu } from "../../../kit/ryze-ui/widgets";
import {
  AD_TEMPLATES,
  AD_TEMPLATE_COLUMN_COUNT,
  AdTemplatesCategoryFilter,
  AdTemplatesMasonry,
  AdTemplatesPageHead,
  AdTemplatesPagination,
  AdTemplatesSelectionBar,
  buildTemplateColumns,
} from "../../../kit/ryze-ui/pages/ad-templates";
import {
  COMPETITOR_ROWS,
  CompetitorAdsBody,
  CreativeLightbox,
} from "../../../kit/ryze-ui/pages/competitor-ads";
import {
  CREATIVES,
  CREATIVES_COLUMN_COUNT,
  CreativesMasonry,
  CreativesPageHead,
  CreativesSearchBar,
} from "../../../kit/ryze-ui/pages/creatives";
import { PageLayer } from "../../page-layer";
import { useGuideScroll } from "../../scroll";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import { AnnotateDialog } from "./annotate-dialog";
import { GuideThread, type ThreadEntry } from "../../thread";
import {
  ANNOTATE_TURN,
  ASK,
  ASK_TURN,
  COMPETITOR_TURN,
  SEED_TURN,
  TEMPLATE_TURN,
  WARMER,
  WARMER_TURN,
} from "./turns";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_CREATIVES_TOTAL = OUTRO_AT + 110;

const PANEL_AT = timeline.at("panel");
const FOCUS_AT = timeline.at("focus");
const PLUS_AT = timeline.at("plusMenu");
const ATTACHED_AT = timeline.at("attached");
const SENT_AT = timeline.at("sent");
const EXPAND_AT = timeline.at("expand");
const LIGHTBOX_AT = timeline.at("lightbox");
const PIN1_AT = timeline.at("pin1");
const NOTE1_AT = timeline.at("note1");
const PIN2_AT = timeline.at("pin2");
const NOTE2_AT = timeline.at("note2");
const ANNOSENT_AT = timeline.at("annotateSent");
const FOCUS2_AT = timeline.at("focus2");
const SENT2_AT = timeline.at("sent2");
const TPL_AT = timeline.at("tplPage");
const PICK1_AT = timeline.at("pick1");
const PICK2_AT = timeline.at("pick2");
const TPLPANEL_AT = timeline.at("tplPanel");
const TPLCLOSED_AT = timeline.at("tplClosed");
const COMP_AT = timeline.at("compPage");
const COMPLB_AT = timeline.at("compLightbox");
const COMPSENT_AT = timeline.at("compSent");
const BACKLIB_AT = timeline.at("backLib");

const MAIN_THREAD: ThreadEntry[] = [
  { turn: SEED_TURN, at: PANEL_AT + 4 },
  { turn: ASK_TURN, at: SENT_AT },
  { turn: ANNOTATE_TURN, at: ANNOSENT_AT + 4 },
  { turn: WARMER_TURN, at: SENT2_AT },
];

const TPL_THREAD: ThreadEntry[] = [{ turn: TEMPLATE_TURN, at: TPLPANEL_AT + 4 }];

const COMP_THREAD: ThreadEntry[] = [{ turn: COMPETITOR_TURN, at: COMPSENT_AT + 6 }];

const LIBRARY = [
  { id: "n1", title: "Autumn, poured slowly", size: "1024x1280", aspect: "4 / 5", image: "creatives/autumn-01.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "n2", title: "The autumn set", size: "1024x1280", aspect: "4 / 5", image: "creatives/autumn-02.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "n3", title: "Made for long evenings", size: "1024x1280", aspect: "4 / 5", image: "creatives/autumn-03.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "n4", title: "Poured by hand", size: "1024x1280", aspect: "4 / 5", image: "creatives/autumn-04.jpg", pos: "50% 50%", status: "completed" as const },
  ...CREATIVES,
];

const LIBRARY_AFTER = [
  { id: "s1", title: "The autumn set v2", size: "1024x1280", aspect: "4 / 5", image: "creatives/autumn-02-v2.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "s2", title: "A room that smells finished", size: "1024x1024", aspect: "1 / 1", image: "creatives/gen-room.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "s3", title: "Smells like home", size: "1024x1024", aspect: "1 / 1", image: "creatives/gen-home.jpg", pos: "50% 50%", status: "completed" as const },
  { id: "s4", title: "The evening ritual", size: "1024x1024", aspect: "1 / 1", image: "creatives/gen-ritual.jpg", pos: "50% 50%", status: "completed" as const },
  ...LIBRARY,
];

const TPL_PICKS = ["homesick_top-1-22d.jpg", "otherland_top-2-107d.jpg"];
const COMP_AD = COMPETITOR_ROWS.find((ad) => ad.id === "a2")!;

const navFor = (frame: number): string => {
  if (frame >= BACKLIB_AT + 4) return "Ad Creatives";
  if (frame >= COMP_AT + 4) return "Competitor Ads";
  if (frame >= TPL_AT + 4) return "Ad Templates";
  if (frame >= EXPAND_AT + 1) return "New chat";
  return "Ad Creatives";
};

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onLib = frame < EXPAND_AT + 1;
  const onChat = frame >= EXPAND_AT + 1 && frame < TPL_AT + 4;
  const onTpl = frame >= TPL_AT + 4 && frame < COMP_AT + 4;
  const onComp = frame >= COMP_AT + 4 && frame < BACKLIB_AT + 4;
  const onLib2 = frame >= BACKLIB_AT + 4;

  const panelPhase1 = frame < EXPAND_AT;
  const panelPhase2 = frame >= TPLPANEL_AT && frame < COMPSENT_AT;
  const panelPhase3 = frame >= COMPSENT_AT;
  const slideProgress = usePanelSlide([
    { open: PANEL_AT, close: EXPAND_AT },
    { open: TPLPANEL_AT, close: TPLCLOSED_AT },
    { open: COMPSENT_AT, close: OUTRO_AT + 40 },
  ]);
  const panelProgress = frame > EXPAND_AT && frame < TPLPANEL_AT ? 0 : slideProgress;

  const typedAsk = frame < SENT_AT ? typing(frame, ASK, FOCUS_AT + 4, PLUS_AT - 12) : "";
  const typedWarmer = frame < SENT2_AT ? typing(frame, WARMER, FOCUS2_AT + 4, SENT2_AT - 8) : "";
  const chatScroll = useGuideScroll(timeline.scrolls);
  const menuOpen = frame >= PLUS_AT && frame < ATTACHED_AT + 10;
  const images =
    frame >= ATTACHED_AT && frame < SENT_AT
      ? [
          { src: "product-1.jpg", name: "jar-amber.jpg" },
          { src: "product-3.jpg", name: "studio-table.jpg" },
        ]
      : [];

  const panelComposer =
    panelPhase1 ? (
      <Composer
        fill
        placeholder="Message Agent…"
        typed={typedAsk}
        cursor={frame >= FOCUS_AT && frame < SENT_AT}
        images={images}
        imagesFrom={ATTACHED_AT}
        menu={
          menuOpen ? (
            <ComposerMenu
              openAt={PLUS_AT}
              closeAt={ATTACHED_AT + 4}
              items={[
                { label: "Upload from computer", clickId: "menu.upload" },
                { label: "Upload from Drive" },
                { label: "Reference ads" },
              ]}
            />
          ) : undefined
        }
      />
    ) : panelPhase2 || panelPhase3 ? (
      <Composer fill placeholder="Message Agent…" />
    ) : (
      <span />
    );

  const chatComposer = onChat ? (
    <Composer
      fill
      placeholder="Message Agent…"
      typed={typedWarmer}
      cursor={frame >= FOCUS2_AT && frame < SENT2_AT}
    />
  ) : (
    <span />
  );

  const tplItems = AD_TEMPLATES.map((item) => ({
    ...item,
    selected:
      frame < TPLPANEL_AT + 6 &&
      ((item.file === TPL_PICKS[0] && frame >= PICK1_AT) ||
        (item.file === TPL_PICKS[1] && frame >= PICK2_AT)),
  }));
  const tplSelected = tplItems.filter((item) => item.selected).length;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav: navFor(frame), section: "dashboard" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page={navFor(frame)}
          nav={navFor(frame)}
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="New chat"
              composer={panelComposer}
            >
              {panelPhase1 ? <GuideThread entries={MAIN_THREAD} /> : null}
              {panelPhase2 ? <GuideThread entries={TPL_THREAD} /> : null}
              {panelPhase3 ? <GuideThread entries={COMP_THREAD} /> : null}
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onLib} scope="l1">
              <div className="pg">
                <div className="pg-scroll" style={{ overflow: "hidden" }}>
                  <div className="pg-inner wide">
                    <CreativesPageHead />
                    <CreativesSearchBar />
                    <CreativesMasonry creatives={LIBRARY} columnCount={CREATIVES_COLUMN_COUNT} />
                  </div>
                </div>
              </div>
            </PageLayer>
            <PageLayer visible={onChat} scope="f1">
              <ChatPage title="Autumn collection ads" composer={chatComposer} scrollPx={chatScroll}>
                <GuideThread entries={MAIN_THREAD} />
              </ChatPage>
            </PageLayer>
            <PageLayer visible={onTpl} scope="t1">
              <div className="pg">
                <div className="pg-scroll" style={{ overflow: "hidden" }}>
                  <div className="pg-inner wide">
                    <AdTemplatesPageHead />
                    <AdTemplatesCategoryFilter />
                    <AdTemplatesMasonry columns={buildTemplateColumns(tplItems, AD_TEMPLATE_COLUMN_COUNT)} />
                    <AdTemplatesPagination />
                    {tplSelected > 0 ? <AdTemplatesSelectionBar count={tplSelected} /> : null}
                  </div>
                </div>
              </div>
            </PageLayer>
            <PageLayer visible={onComp} scope="c1">
              <CompetitorAdsBody tab="explore" />
            </PageLayer>
            <PageLayer visible={onLib2} scope="l2">
              <div className="pg">
                <div className="pg-scroll" style={{ overflow: "hidden" }}>
                  <div className="pg-inner wide">
                    <CreativesPageHead />
                    <CreativesSearchBar />
                    <CreativesMasonry creatives={LIBRARY_AFTER} columnCount={CREATIVES_COLUMN_COUNT} />
                  </div>
                </div>
              </div>
            </PageLayer>
          </div>
        </RyzeApp>
        <AnnotateDialog
          at={LIGHTBOX_AT}
          visible={frame >= LIGHTBOX_AT && frame < ANNOSENT_AT + 4}
          pin1At={PIN1_AT}
          note1At={NOTE1_AT}
          pin2At={PIN2_AT}
          note2At={NOTE2_AT}
        />
        <CreativeLightbox
          at={COMPLB_AT}
          ad={COMP_AD}
          visible={frame >= COMPLB_AT && frame < COMPSENT_AT + 4}
        />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideCreatives: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-creatives"
    title={{ title: "Ad creatives, made by asking", accent: "creatives" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
