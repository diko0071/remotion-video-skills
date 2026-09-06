import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { ChatPage } from "../../../kit/ryze-ui/chat-page";
import { Composer } from "../../../kit/ryze-ui/composer";
import { BrandIdentityBody } from "../../../kit/ryze-ui/pages/brand";
import { ChatEmptyStage } from "../../../kit/ryze-ui/pages/chat-empty";
import { ContentPlanBody } from "../../../kit/ryze-ui/pages/content-plan";
import {
  ArticleBody,
  ArticleDetailsCard,
  ArticleTitleInput,
  FeaturedImagePanel,
  SaveButton,
} from "../../../kit/ryze-ui/pages/article-editor";
import {
  ARTICLE_EDITOR_FIELDS,
  ARTICLE_EDITOR_SAVE,
} from "../../../kit/ryze-ui/pages/article-editor/data";
import "../../../kit/ryze-ui/pages/article-editor/article-editor.css";
import {
  CREATIVES,
  CREATIVES_COLUMN_COUNT,
  CreativesMasonry,
  CreativesPageHead,
  CreativesSearchBar,
} from "../../../kit/ryze-ui/pages/creatives";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { SCHEDULES, SchedulesPage } from "../../../kit/ryze-ui/pages/schedules";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { GuideScrollArea, useScrollStops } from "../../scroll-area";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { GuideThread, type ThreadEntry } from "../../thread";
import { ACTS } from "./acts";
import {
  ARTICLE_TURN,
  BRAND_TURN,
  CREATIVE_TURN,
  NEW_VOICE,
  Q_ARTICLE,
  Q_BRAND,
  Q_CREATIVE,
  Q_REVENUE,
  Q_SCHEDULE,
  REVENUE_TURN,
  SCHEDULE_TURN,
  SHORT_INTRO,
} from "./turns";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_AGENT_TOTAL = OUTRO_AT + 110;

const FOCUS1_AT = timeline.at("focus1");
const SENT1_AT = timeline.at("sent1");
const BRAND_AT = timeline.at("brandPage");
const PANEL_AT = timeline.at("panelOpen");
const FOCUS2_AT = timeline.at("focus2");
const SENT2_AT = timeline.at("sent2");
const VOICE_AT = SENT2_AT + 150;
const SEO_AT = timeline.at("seoRail");
const CP_AT = timeline.at("contentPlan");
const ROW_AT = timeline.at("articlePage");
const FOCUS3_AT = timeline.at("focus3");
const SENT3_AT = timeline.at("sent3");
const INTRO_AT = SENT3_AT + 130;
const RAILBACK_AT = timeline.at("railBack");
const CRV_AT = timeline.at("crvPage");
const FOCUS4_AT = timeline.at("focus4");
const SENT4_AT = timeline.at("sent4");
const TILE_AT = SENT4_AT + 170;
const FOCUS5_AT = timeline.at("focus5");
const SENT5_AT = timeline.at("sent5");
const SCHED_AT = timeline.at("schedulesPage");
const NEW_SCHED_AT = timeline.at("sent5") + 110;
const INTEGRATIONS_AT = timeline.at("integrations");

const CHAT_THREAD: ThreadEntry[] = [{ turn: REVENUE_TURN, at: SENT1_AT }];

const PANEL_THREAD: ThreadEntry[] = [
  { turn: BRAND_TURN, at: SENT2_AT },
  { turn: ARTICLE_TURN, at: SENT3_AT },
  { turn: CREATIVE_TURN, at: SENT4_AT },
  { turn: SCHEDULE_TURN, at: SENT5_AT },
];

const NEW_CREATIVE = {
  id: "nw1",
  title: "The autumn set",
  size: "1024x1280",
  aspect: "4 / 5",
  image: "creatives/autumn-02.jpg",
  pos: "50% 50%",
  status: "completed" as const,
};

const NEW_SCHEDULE = {
  name: "Weekly performance recap",
  cadence: "Weekly on Monday at 09:00 America/Los_Angeles",
  enabled: true,
};

const BottomThread: React.FC<{ entries: ThreadEntry[] }> = ({ entries }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
    }}
  >
    <GuideThread entries={entries} />
  </div>
);

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onChat = frame < BRAND_AT + 4;
  const onBrand = frame >= BRAND_AT + 4 && frame < CP_AT + 4;
  const onContentPlan = frame >= CP_AT + 4 && frame < ROW_AT + 4;
  const onArticle = frame >= ROW_AT + 4 && frame < CRV_AT + 4;
  const onCrv = frame >= CRV_AT + 4 && frame < SCHED_AT + 4;
  const onSchedules = frame >= SCHED_AT + 4 && frame < INTEGRATIONS_AT + 4;
  const onIntegrations = frame >= INTEGRATIONS_AT + 4;

  const panelProgress = usePanelSlide([{ open: PANEL_AT, close: OUTRO_AT + 40 }]);

  const typed1 = frame < SENT1_AT ? typing(frame, Q_REVENUE, FOCUS1_AT + 4, SENT1_AT - 8) : "";
  const typed2 =
    frame >= SENT1_AT && frame < SENT2_AT
      ? typing(frame, Q_BRAND, FOCUS2_AT + 4, SENT2_AT - 8)
      : "";
  const typed3 =
    frame >= SENT2_AT && frame < SENT3_AT
      ? typing(frame, Q_ARTICLE, FOCUS3_AT + 4, SENT3_AT - 8)
      : "";
  const typed4 =
    frame >= SENT3_AT && frame < SENT4_AT
      ? typing(frame, Q_CREATIVE, FOCUS4_AT + 4, SENT4_AT - 8)
      : "";
  const typed5 =
    frame >= SENT4_AT && frame < SENT5_AT
      ? typing(frame, Q_SCHEDULE, FOCUS5_AT + 4, SENT5_AT - 8)
      : "";
  const panelTyped =
    frame < SENT2_AT ? typed2 : frame < SENT3_AT ? typed3 : frame < SENT4_AT ? typed4 : typed5;
  const panelCursor =
    (frame >= FOCUS2_AT && frame < SENT2_AT) ||
    (frame >= FOCUS3_AT && frame < SENT3_AT) ||
    (frame >= FOCUS4_AT && frame < SENT4_AT) ||
    (frame >= FOCUS5_AT && frame < SENT5_AT);

  const editorStops = useScrollStops(timeline.scrollStops, { from: ROW_AT, until: CRV_AT });

  const agentPanel = (
    <AgentPanel
      width={GUIDE_PANEL_WIDTH}
      progress={panelProgress}
      title="New chat"
      composer={
        <Composer fill placeholder="Message Agent…" typed={panelTyped} cursor={panelCursor} />
      }
    >
      {frame < SENT2_AT ? undefined : <BottomThread entries={PANEL_THREAD} />}
    </AgentPanel>
  );

  const seoSection = frame >= SEO_AT + 2 && frame < RAILBACK_AT + 2;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <PageLayer visible={onChat} scope="c1">
        <RyzeApp workspace="ember-and-oak" page="Chat" nav="New chat" stretch>
          {frame < SENT1_AT + 2 ? (
            <ChatEmptyStage
              composer={
                <Composer
                  typed={typed1}
                  cursor={frame >= FOCUS1_AT && frame < SENT1_AT}
                  approval="Skip"
                  flatRing
                />
              }
            />
          ) : (
            <ChatPage title="New chat" composer={<Composer fill placeholder="Message Agent…" />}>
              <GuideThread entries={CHAT_THREAD} />
            </ChatPage>
          )}
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onBrand} scope="b1">
        <ShellOverrideProvider
          value={seoSection ? { section: "seo", nav: "" } : { section: "dashboard", nav: "Brand" }}
        >
          <RyzeApp workspace="ember-and-oak" page="Brand" nav="Brand" stretch panel={agentPanel}>
            <BrandIdentityBody voice={frame >= VOICE_AT ? NEW_VOICE : undefined} />
          </RyzeApp>
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onContentPlan} scope="cp1">
        <ShellOverrideProvider value={{ section: "seo", nav: "Content Plan" }}>
          <RyzeApp
            workspace="ember-and-oak"
            page="Content Plan"
            nav="Content Plan"
            stretch
            panel={agentPanel}
          >
            <ContentPlanBody />
          </RyzeApp>
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onArticle} scope="a1">
        <ShellOverrideProvider
          value={
            frame >= RAILBACK_AT + 2
              ? { section: "dashboard", nav: "" }
              : { section: "seo", nav: "Content Plan" }
          }
        >
          <RyzeApp
            workspace="ember-and-oak"
            page="Content Plan"
            nav="Content Plan"
            stretch
            panel={agentPanel}
          >
            <div className="pg">
              <GuideScrollArea
                id="editor"
                stops={editorStops}
                className="pg-scroll"
                contentClassName="pg-inner wide"
                style={{ flex: 1 }}
              >
                <ArticleTitleInput title={ARTICLE_EDITOR_FIELDS.title} />
                <div className="ae-layout stacked">
                  <div className="ae-main">
                    <FeaturedImagePanel />
                    <div data-click="ae.body">
                      <ArticleBody blocks={frame >= INTRO_AT ? SHORT_INTRO : undefined} />
                    </div>
                  </div>
                  <div className="ae-side">
                    <ArticleDetailsCard fields={ARTICLE_EDITOR_FIELDS} />
                    <SaveButton label={ARTICLE_EDITOR_SAVE} />
                  </div>
                </div>
              </GuideScrollArea>
            </div>
          </RyzeApp>
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onCrv} scope="v1">
        <RyzeApp
          workspace="ember-and-oak"
          page="Ad Creatives"
          nav="Ad Creatives"
          stretch
          panel={agentPanel}
        >
          <div className="pg">
            <div className="pg-scroll" style={{ overflow: "hidden" }}>
              <div className="pg-inner wide">
                <CreativesPageHead />
                <CreativesSearchBar />
                <CreativesMasonry
                  creatives={frame >= TILE_AT ? [NEW_CREATIVE, ...CREATIVES] : CREATIVES}
                  columnCount={CREATIVES_COLUMN_COUNT}
                />
              </div>
            </div>
          </div>
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onSchedules} scope="s1">
        <SchedulesPage rows={frame >= NEW_SCHED_AT ? [NEW_SCHEDULE, ...SCHEDULES] : SCHEDULES} panel={agentPanel} />
      </PageLayer>
      <PageLayer visible={onIntegrations} scope="i1">
        <RyzeApp
          workspace="ember-and-oak"
          page="Integrations"
          nav="Integrations"
          stretch
          panel={agentPanel}
        >
          <IntegrationsBody />
        </RyzeApp>
      </PageLayer>
    </div>
  );
};

export const GuideAgent: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-agent"
    title={{ title: "One agent. Your whole marketing.", accent: "agent" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
