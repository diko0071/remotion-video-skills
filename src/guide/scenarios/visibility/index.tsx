import React from "react";
import { useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { MentionsBody, PlacementsDialog } from "../../../kit/ryze-ui/pages/backlinks";
import {
  KEYWORD_TABS,
  KEYWORDS,
  KeywordsTable,
  QueriesShell,
  RunPromptsDialog,
  TABS,
  TopicsTable,
  TOPICS,
  TrackPromptsDialog,
} from "../../../kit/ryze-ui/pages/geo-queries";
import {
  DashboardShell,
  GeoDashboardSections,
  SeoDashboardSections,
} from "../../../kit/ryze-ui/pages/seo-dashboard";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS, PROMPT_LINES } from "./acts";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const PL_DLG_AT = timeline.at("plDialog");
const BL_TAB_AT = timeline.at("blTab");
const QUERIES_AT = timeline.at("queries");
const PROMPTS_TAB_AT = timeline.at("promptsTab");
const TRACK_DLG_AT = timeline.at("trackDlg");
const ADDED_AT = timeline.at("added");
const RUN_DLG_AT = timeline.at("runDlg");
const RAN_AT = timeline.at("ran");
const DASH_AT = timeline.at("dash");
const GEO_TAB_AT = timeline.at("geoTab");
const S1_AT = timeline.at("s1");
const S2_AT = timeline.at("s2");
const S3_AT = timeline.at("s3");
const S4_AT = timeline.at("s4");
const S5_AT = timeline.at("s5");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_VISIBILITY_TOTAL = OUTRO_AT + 110;

const SCROLL_STOPS: [number, number][] = [
  [S1_AT, 380],
  [S2_AT, 700],
  [S3_AT, 1250],
  [S4_AT, 1680],
  [S5_AT, 2400],
];

const useDashScroll = (): number => {
  const s0 = useSpringAt(SCROLL_STOPS[0][0], SPRINGS.smooth, 46);
  const s1 = useSpringAt(SCROLL_STOPS[1][0], SPRINGS.smooth, 46);
  const s2 = useSpringAt(SCROLL_STOPS[2][0], SPRINGS.smooth, 46);
  const s3 = useSpringAt(SCROLL_STOPS[3][0], SPRINGS.smooth, 46);
  const s4 = useSpringAt(SCROLL_STOPS[4][0], SPRINGS.smooth, 46);
  const springs = [s0, s1, s2, s3, s4];
  let px = 0;
  for (let i = 0; i < SCROLL_STOPS.length; i++) {
    const prev = i === 0 ? 0 : SCROLL_STOPS[i - 1][1];
    px += springs[i] * (SCROLL_STOPS[i][1] - prev);
  }
  return px;
};

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollPx = useDashScroll();

  const onMentions = frame < BL_TAB_AT;
  const onBacklinks = frame >= BL_TAB_AT && frame < QUERIES_AT;
  const onKeywords = frame >= QUERIES_AT && frame < PROMPTS_TAB_AT;
  const onPrompts = frame >= PROMPTS_TAB_AT && frame < DASH_AT;
  const onDash = frame >= DASH_AT;
  const nav = onDash ? "Dashboard" : onKeywords || onPrompts ? "Queries" : "Mentions";
  const page = onDash ? "Dashboard" : onKeywords || onPrompts ? "Queries" : "Mentions";

  const plDlgOpen = frame >= PL_DLG_AT && frame < BL_TAB_AT + 3;
  const trackOpen = frame >= TRACK_DLG_AT && frame < ADDED_AT + 4;
  const runOpen = frame >= RUN_DLG_AT && frame < RAN_AT + 4;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav, section: "seo" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp workspace="ember-and-oak" page={page} nav={nav} credits="4,180" stretch>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onMentions} scope="m1">
              <MentionsBody activeTab="All" firstLinksId="mention.links" />
            </PageLayer>
            <PageLayer visible={onBacklinks} scope="bl">
              <MentionsBody backlinksView />
            </PageLayer>
            <PageLayer visible={onKeywords} scope="q1">
              <QueriesShell bare tabs={KEYWORD_TABS}>
                <KeywordsTable keywords={KEYWORDS} />
              </QueriesShell>
            </PageLayer>
            <PageLayer visible={onPrompts} scope="q2">
              <QueriesShell bare tabs={TABS}>
                <TopicsTable topics={TOPICS} />
              </QueriesShell>
            </PageLayer>
            <PageLayer visible={onDash} scope="d1">
              <DashboardShell
                bare
                tab={frame >= GEO_TAB_AT ? "GEO" : "SEO"}
                sub="How your site performs in search and AI answers"
                scrollPx={scrollPx}
              >
                {frame >= GEO_TAB_AT ? <GeoDashboardSections /> : <SeoDashboardSections />}
              </DashboardShell>
            </PageLayer>
          </div>
        </RyzeApp>
        <PlacementsDialog at={PL_DLG_AT} visible={plDlgOpen} />
        <TrackPromptsDialog
          at={TRACK_DLG_AT}
          visible={trackOpen}
          lines={PROMPT_LINES}
          typeAt={TRACK_DLG_AT + 18}
          cursorOn
        />
        <RunPromptsDialog at={RUN_DLG_AT} visible={runOpen} count={22} />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideVisibility: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-visibility"
    title={{ title: "How AI visibility works", accent: "visibility" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
