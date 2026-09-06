import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import { ArticleEditorBody } from "../../../kit/ryze-ui/pages/article-editor";
import { ArticlePreviewBody } from "../../../kit/ryze-ui/pages/article-preview";
import {
  ArticleRowMenu,
  ContentPlanBody,
  CONTENT_PLAN_ROWS,
  RepublishDialog,
} from "../../../kit/ryze-ui/pages/content-plan";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { SeoSettingsBody } from "../../../kit/ryze-ui/pages/seo-settings";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS, DRAFT_TITLE } from "./acts";
import { PanelThread } from "./panel-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const CMS_FILTER_AT = timeline.at("cmsFilter");
const CONNECTED_AT = timeline.at("connected");
const SEO_RAIL_AT = timeline.at("seoRail");
const PLAN_AT = timeline.at("plan");
const TAB_PLANNED_AT = timeline.at("tabPlanned");
const PL_MENU_AT = timeline.at("plMenu");
const PL_GEN_AT = timeline.at("plGenerate");
const TAB_DRAFTED_AT = timeline.at("tabDrafted");
const TAB_PUBLISHED_AT = timeline.at("tabPublished");
const TAB_DRAFTED2_AT = timeline.at("tabDrafted2");
const PREVIEW_AT = timeline.at("preview");
const IMPROVE_AT = timeline.at("improvePanel");
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const EDITOR_AT = timeline.at("editor");
const REGEN_AT = timeline.at("regen");
const SAVED_AT = timeline.at("saved");
const BACK_PREVIEW_AT = timeline.at("backToPreview");
const PUBLISHED_AT = timeline.at("published");
const BACK_PLAN_AT = timeline.at("backToPlan");
const SETTINGS_AT = timeline.at("settings");
const AUTO_AT = timeline.at("auto");
const PLAN2_AT = timeline.at("planAgain");
const MENU_AT = timeline.at("menu");
const REPUBLISH_DLG_AT = timeline.at("republishDlg");
const REPUBLISHED_AT = timeline.at("republished");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_PUBLISHING_TOTAL = OUTRO_AT + 110;

const tabAt = (frame: number): string => {
  if (frame >= BACK_PLAN_AT) return "All";
  if (frame >= TAB_DRAFTED2_AT) return "Drafted";
  if (frame >= TAB_PUBLISHED_AT) return "Published";
  if (frame >= TAB_DRAFTED_AT) return "Drafted";
  if (frame >= TAB_PLANNED_AT) return "Planned";
  return "All";
};

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const panelProgress = usePanelSlide([{ open: IMPROVE_AT, close: PANEL_CLOSED_AT }]);

  const onIntg = frame < PLAN_AT;
  const onPlan = frame >= PLAN_AT && frame < PREVIEW_AT;
  const onPreview =
    (frame >= PREVIEW_AT && frame < EDITOR_AT) ||
    (frame >= BACK_PREVIEW_AT && frame < BACK_PLAN_AT);
  const onEditor = frame >= EDITOR_AT && frame < BACK_PREVIEW_AT;
  const onPlanBack = frame >= BACK_PLAN_AT && frame < SETTINGS_AT;
  const onSettings = frame >= SETTINGS_AT && frame < PLAN2_AT;
  const onPlan2 = frame >= PLAN2_AT;
  const menuOpen = frame >= MENU_AT && frame < REPUBLISH_DLG_AT + 5;
  const plMenuOpen = frame >= PL_MENU_AT && frame < PL_GEN_AT + 5;
  const dlgOpen = frame >= REPUBLISH_DLG_AT && frame < REPUBLISHED_AT + 20;
  const nav = onIntg ? "Integrations" : onSettings ? "Settings" : "Content Plan";

  const activeTab = tabAt(frame);
  const baseRows =
    frame >= PUBLISHED_AT
      ? CONTENT_PLAN_ROWS.map((r) =>
          r.title === DRAFT_TITLE
            ? {
                ...r,
                url: "ember-and-oak.com/blogs/journal/why-candles-tunnel-how-to-fix",
              }
            : r,
        )
      : CONTENT_PLAN_ROWS;
  const planRows =
    activeTab === "All"
      ? baseRows
      : baseRows.filter((r) => r.status === activeTab);

  return (
    <ShellOverrideProvider
      value={{
        expanded: true,
        nav: onIntg && frame < SEO_RAIL_AT + 4 ? "Integrations" : nav,
        section: frame < SEO_RAIL_AT + 4 ? "dashboard" : "seo",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page={onIntg ? "Integrations" : "Content Plan"}
          nav={nav}
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Improve this article"
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <PanelThread from={IMPROVE_AT + 12} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onIntg && frame < CMS_FILTER_AT} scope="i1">
              <IntegrationsBody stateOverrides={{ Shopify: "none" }} />
            </PageLayer>
            <PageLayer visible={onIntg && frame >= CMS_FILTER_AT} scope="i2">
              <IntegrationsBody
                category="Commerce & CMS"
                stateOverrides={frame >= CONNECTED_AT ? { Shopify: "connected" } : { Shopify: "none" }}
              />
            </PageLayer>
            <PageLayer visible={onPlan || onPlanBack} scope="p1">
              <ContentPlanBody
                rows={planRows}
                activeTab={activeTab}
                statusOverrides={
                  frame >= PUBLISHED_AT ? { [DRAFT_TITLE]: "Published" } : undefined
                }
                firstDotsId="article.dots"
                firstMenu={
                  <ArticleRowMenu
                    at={PL_MENU_AT}
                    status="Planned"
                    hovered="Generate now"
                    visible={plMenuOpen}
                  />
                }
              />
            </PageLayer>
            <PageLayer visible={onPreview} scope="pv">
              <ArticlePreviewBody
                revealFrom={PREVIEW_AT - 10}
                published={frame >= PUBLISHED_AT}
                imageSrc={frame >= REGEN_AT + 34 ? "product-1.jpg" : "hero-candles.jpg"}
              />
            </PageLayer>
            <PageLayer visible={onEditor} scope="e">
              <ArticleEditorBody
                revealFrom={EDITOR_AT - 10}
                saving={frame >= SAVED_AT && frame < SAVED_AT + 30}
                imageSrc={frame >= REGEN_AT + 34 ? "product-1.jpg" : undefined}
              />
            </PageLayer>
            <PageLayer visible={onSettings} scope="s">
              <SeoSettingsBody mode={frame >= AUTO_AT ? "auto" : "manual"} publishTo="Shopify" />
            </PageLayer>
            <PageLayer visible={onPlan2} scope="p2">
              <ContentPlanBody
                rows={baseRows}
                statusOverrides={{ [DRAFT_TITLE]: "Published" }}
                firstDotsId="article.dots"
                firstMenu={<ArticleRowMenu at={MENU_AT} hovered="Republish" visible={menuOpen} />}
              />
            </PageLayer>
          </div>
        </RyzeApp>
        <RepublishDialog at={REPUBLISH_DLG_AT} visible={dlgOpen} platform="Shopify" />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuidePublishing: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-publishing"
    title={{ title: "How publishing works", accent: "publishing" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
