import React from "react";
import { useCurrentFrame } from "remotion";
import { RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { ARTICLE_EDITOR_BODY } from "../../../kit/ryze-ui/pages/article-editor";
import { ArticlePreviewBody } from "../../../kit/ryze-ui/pages/article-preview";
import { MentionsBody } from "../../../kit/ryze-ui/pages/backlinks";
import { SeoSettingsBody } from "../../../kit/ryze-ui/pages/seo-settings";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { useGuideScroll } from "../../scroll";
import { ACTS } from "./acts";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const MENTIONS_AT = timeline.at("mentions");
const BACKLINKS_TAB_AT = timeline.at("backlinksTab");
const SETTINGS_AT = timeline.at("settings");
const TOGGLE_OFF_AT = timeline.at("toggleOff");
const TOGGLE_ON_AT = timeline.at("toggleOn");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_BACKLINK_EXCHANGE_TOTAL = OUTRO_AT + 110;

const LINKED_BODY: typeof ARTICLE_EDITOR_BODY = [
  ...ARTICLE_EDITOR_BODY.slice(0, 2),
  {
    kind: "p",
    text: "Wax has a memory. The first burn sets the width of every burn that follows: if you blow the candle out before the melt pool reaches the edge of the jar, the wax remembers that smaller circle and keeps to it. Pair a long first burn with a slow morning ritual — the way single-origin coffee beans reward a patient pour-over — and the whole jar stays usable.",
    link: { anchor: "single-origin coffee beans", highlightId: "bkl.article.link" },
  },
  ...ARTICLE_EDITOR_BODY.slice(3),
  { kind: "h2", text: "Does wax type change how fast a candle tunnels?" },
  {
    kind: "p",
    text: "Yes — and more than most guides admit. Soy wax melts around 120°F, a full 20 degrees cooler than most paraffin blends, which means it forgives a short burn less readily: the pool spreads slowly, and an interrupted first session leaves a narrower memory ring. Coconut-apricot blends sit in between, melting evenly but holding scent oils that thicken the melt pool. If your jars are wider than three inches, treat the first burn as an appointment, not a background activity.",
  },
  { kind: "h2", text: "The container matters as much as the wax" },
  {
    kind: "p",
    text: "Thick glass pulls heat away from the edges of the pool, which is why the same wax tunnels in a heavy tumbler and burns clean in a thin-walled jar. Ceramic vessels run even cooler. If a candle you love keeps tunnelling despite long burns, set it on a cork trivet — insulating the base keeps the outer wax within reach of the flame's heat and levels the pool by the second hour.",
  },
  { kind: "h2", text: "When to give up and rescue the wax" },
  {
    kind: "p",
    text: "A tunnel deeper than two inches is past saving with foil. At that point, scrape the remaining wax into a wax warmer — you'll get every hour of fragrance you paid for without fighting the wick. The empty jar cleans up with hot water and a teaspoon of dish soap, and makes a better match-strike holder than anything you can buy.",
  },
  {
    kind: "p",
    text: "Tunnelling is not a defect — it's physics, and it rewards the same patience that good coffee does. One long first burn, a trimmed wick, and a draught-free shelf will carry any well-made candle flat to the bottom of the jar.",
  },
];

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = useGuideScroll(timeline.scrolls);

  const onArticle = frame < MENTIONS_AT;
  const onMentions = frame >= MENTIONS_AT && frame < BACKLINKS_TAB_AT;
  const onBacklinks = frame >= BACKLINKS_TAB_AT && frame < SETTINGS_AT;
  const onSettings = frame >= SETTINGS_AT;
  const nav = onArticle ? "Content Plan" : onSettings ? "Settings" : "Mentions";

  return (
    <ShellOverrideProvider value={{ expanded: true, nav, section: "seo" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp workspace="ember-and-oak" page="SEO" nav={nav} credits="4,180" stretch>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onArticle} scope="a1">
              <ArticlePreviewBody bodyBlocks={LINKED_BODY} scrollPx={scroll} />
            </PageLayer>
            <PageLayer visible={onMentions} scope="m1">
              <MentionsBody activeTab="All" />
            </PageLayer>
            <PageLayer visible={onBacklinks} scope="m2">
              <MentionsBody backlinksView />
            </PageLayer>
            <PageLayer visible={onSettings} scope="s1">
              <SeoSettingsBody
                mode="auto"
                publishTo="Shopify"
                backlinks={frame < TOGGLE_OFF_AT || frame >= TOGGLE_ON_AT}
              />
            </PageLayer>
          </div>
        </RyzeApp>
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideBacklinkExchange: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-backlink-exchange"
    title={{ title: "How the Backlink Exchange works", accent: "Backlink" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
