import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  COMPETITOR_ROWS,
  CompetitorAdsBody,
  CreativeLightbox,
  DiscoverCompetitorsDialog,
  EXPLORE_EXTRA_ROWS,
  NotifyConfirmDialog,
  TRACKED_BRANDS,
  TRACKED_ROWS,
} from "../../../kit/ryze-ui/pages/competitor-ads";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { useGuideScroll } from "../../scroll";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS, BRAND_FOCUS, LIGHTBOX_AD_ID } from "./acts";
import { PanelThread } from "./panel-chat";
import { TrackedEmpty } from "./tracked-empty";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const FLT_INDUSTRY_AT = timeline.at("fltIndustry");
const FLT_PLATFORM_AT = timeline.at("fltPlatform");
const FLT_FORMAT_AT = timeline.at("fltFormat");
const TRACKED_AT = timeline.at("tracked");
const DISCOVER_AT = timeline.at("discover");
const PICK1_AT = timeline.at("pick1");
const PICK2_AT = timeline.at("pick2");
const PICK3_AT = timeline.at("pick3");
const SAVED_AT = timeline.at("trackedSaved");
const BRAND_AT = timeline.at("brandOnly");
const LIGHTBOX_AT = timeline.at("lightbox");
const GEN_AT = timeline.at("genPanel");
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const BELL_DIALOG_AT = timeline.at("bellDialog");
const BELL_AT = timeline.at("bellOn");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_COMPETITOR_ADS_TOTAL = OUTRO_AT + 110;

const ALL_ROWS = EXPLORE_EXTRA_ROWS.flatMap((row, i) => {
  const own = COMPETITOR_ROWS[i];
  return own ? [row, own] : [row];
});
const HOME_BRANDS = new Set([
  "Yankee Candle",
  "Brooklyn Candle Studio",
  "P.F. Candle Co.",
  "Otherland",
  "DedCool",
  "Salt & Stone",
  "Brooklinen",
  "Blueland",
  "Caraway",
  "Eight Sleep",
  "Helix",
  "Dirty Labs",
]);
const HOME_ROWS = ALL_ROWS.filter((r) => HOME_BRANDS.has(r.brand.name));
const META_ROWS = HOME_ROWS.filter((r) => r.platform === "meta");
const META_IMAGE_ROWS = META_ROWS.filter((r) => r.format === "image");
const BRAND_ROWS = TRACKED_ROWS.filter((r) => r.brand.name === BRAND_FOCUS);
const LIGHTBOX_AD = COMPETITOR_ROWS.find((r) => r.id === LIGHTBOX_AD_ID)!;
const PICKS = ["Yankee Candle", "Brooklyn Candle Studio", "P.F. Candle Co."];
const NOTIFY_BRANDS = TRACKED_BRANDS.map((b) =>
  b.name === BRAND_FOCUS ? { ...b, notify: true } : b,
);

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const panelProgress = usePanelSlide([{ open: GEN_AT, close: PANEL_CLOSED_AT }]);

  const scroll = useGuideScroll(timeline.scrolls);
  const onE1 = frame < FLT_INDUSTRY_AT;
  const onE2 = frame >= FLT_INDUSTRY_AT && frame < FLT_PLATFORM_AT;
  const onE3 = frame >= FLT_PLATFORM_AT && frame < FLT_FORMAT_AT;
  const onE4 = frame >= FLT_FORMAT_AT && frame < TRACKED_AT;
  const onT0 = frame >= TRACKED_AT && frame < SAVED_AT;
  const onT1 = frame >= SAVED_AT && frame < BRAND_AT;
  const onT2 = frame >= BRAND_AT && frame < BELL_AT;
  const onT3 = frame >= BELL_AT;
  const bellDialogOpen = frame >= BELL_DIALOG_AT && frame < BELL_AT + 5;
  const discoverOpen = frame >= DISCOVER_AT && frame < SAVED_AT + 4;
  const lightboxOpen = frame >= LIGHTBOX_AT && frame < GEN_AT + 5;
  const picked = PICKS.filter(
    (_, i) => frame >= [PICK1_AT, PICK2_AT, PICK3_AT][i],
  );
  const syncing = frame >= SAVED_AT && frame < SAVED_AT + 240;

  return (
    <ShellOverrideProvider
      value={{ expanded: true, nav: "Competitor Ads", section: "dashboard" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page="Competitor Ads"
          nav="Competitor Ads"
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Iterate on this ad"
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <PanelThread from={GEN_AT + 12} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onE1} scope="e1">
              <CompetitorAdsBody tab="explore" rows={ALL_ROWS} scrollPx={scroll} />
            </PageLayer>
            <PageLayer visible={onE2} scope="e2">
              <CompetitorAdsBody
                tab="explore"
                rows={HOME_ROWS}
                filterValues={{ industry: "Home & garden" }}
              />
            </PageLayer>
            <PageLayer visible={onE3} scope="e3">
              <CompetitorAdsBody
                tab="explore"
                rows={META_ROWS}
                filterValues={{ industry: "Home & garden", platform: "Meta" }}
              />
            </PageLayer>
            <PageLayer visible={onE4} scope="e4">
              <CompetitorAdsBody
                tab="explore"
                rows={META_IMAGE_ROWS}
                filterValues={{ industry: "Home & garden", platform: "Meta", format: "Image" }}
              />
            </PageLayer>
            <PageLayer visible={onT0} scope="t0">
              <TrackedEmpty />
            </PageLayer>
            <PageLayer visible={onT1} scope="t1">
              <CompetitorAdsBody
                tab="tracked"
                syncingBrand={syncing ? "P.F. Candle Co." : undefined}
              />
            </PageLayer>
            <PageLayer visible={onT2} scope="t2">
              <CompetitorAdsBody
                tab="tracked"
                brandFilter={BRAND_FOCUS}
                rows={BRAND_ROWS}
              />
            </PageLayer>
            <PageLayer visible={onT3} scope="t3">
              <CompetitorAdsBody
                tab="tracked"
                brandFilter={BRAND_FOCUS}
                rows={BRAND_ROWS}
                trackedBrands={NOTIFY_BRANDS}
              />
            </PageLayer>
          </div>
        </RyzeApp>
        <DiscoverCompetitorsDialog at={DISCOVER_AT} visible={discoverOpen} picked={picked} />
        <CreativeLightbox at={LIGHTBOX_AT} visible={lightboxOpen} ad={LIGHTBOX_AD} />
        <NotifyConfirmDialog at={BELL_DIALOG_AT} visible={bellDialogOpen} brand={BRAND_FOCUS} />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideCompetitorAds: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-competitor-ads"
    title={{ title: "How Competitor Ads work", accent: "Competitor" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
