import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import { BlogStudioBody } from "../../../kit/ryze-ui/pages/blog-studio";
import { SeoDashboardSections, SeoDashboardContentPage, DashboardShell } from "../../../kit/ryze-ui/pages/seo-dashboard";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import { MatchThread } from "./match-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const NIGHT_AT = timeline.at("night");
const MATCH_AT = timeline.at("matchPanel");
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const DOMAIN_POP_AT = timeline.at("domainPop");
const SEO_TAB_AT = timeline.at("seoTab");
const CHECKED_AT = timeline.at("checked");
const DASH_AT = timeline.at("dash");
const CONTENT_TAB_AT = timeline.at("contentTab");
const MATCH_DONE_AT = MATCH_AT + 150;
const OUTRO_AT = timeline.total - 4;

export const GUIDE_BLOG_STUDIO_TOTAL = OUTRO_AT + 110;

const DOMAIN = "ember-and-oak.ryze.blog";

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const panelProgress = usePanelSlide([{ open: MATCH_AT, close: PANEL_CLOSED_AT }]);

  const onS1 = frame < NIGHT_AT;
  const onS2 = frame >= NIGHT_AT && frame < MATCH_DONE_AT;
  const onS3 = frame >= MATCH_DONE_AT && frame < SEO_TAB_AT;
  const onS4 = frame >= SEO_TAB_AT && frame < DASH_AT;
  const onD1 = frame >= DASH_AT && frame < CONTENT_TAB_AT;
  const onD2 = frame >= CONTENT_TAB_AT;
  const panelHidden = frame >= MATCH_AT && frame < PANEL_CLOSED_AT;
  const checking = frame >= CHECKED_AT && frame < CHECKED_AT + 40;
  const verified = frame >= CHECKED_AT + 40;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav: "Blog Studio", section: "seo" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page="Blog Studio"
          nav="Blog Studio"
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Match website style"
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <MatchThread from={MATCH_AT + 10} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onS1} scope="s1">
              <BlogStudioBody activeTheme="warm" domain={DOMAIN} />
            </PageLayer>
            <PageLayer visible={onS2} scope="s2">
              <BlogStudioBody
                activeTheme="night"
                dark={frame < MATCH_AT + 110}
                matched={frame >= MATCH_AT + 110}
                domain={DOMAIN}
                panelHidden={panelHidden}
              />
            </PageLayer>
            <PageLayer visible={onS3} scope="s3">
              <BlogStudioBody
                activeTheme="warm"
                matched
                domain={DOMAIN}
                panelHidden={panelHidden}
                domainPopover={frame >= DOMAIN_POP_AT}
              />
            </PageLayer>
            <PageLayer visible={onS4} scope="s4">
              <BlogStudioBody
                mode="SEO"
                matched
                domain={DOMAIN}
                seoChecking={checking}
                seoVerified={verified}
              />
            </PageLayer>
            <PageLayer visible={onD1} scope="d1">
              <DashboardShell tab="SEO" sub="Live SEO performance across Search, Analytics, and connected stores." bare>
                <SeoDashboardSections />
              </DashboardShell>
            </PageLayer>
            <PageLayer visible={onD2} scope="d2">
              <SeoDashboardContentPage bare />
            </PageLayer>
          </div>
        </RyzeApp>
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideBlogStudio: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-blog-studio"
    title={{ title: "How the Blog Studio works", accent: "Blog" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
