import "./ryze-base.css";
import "./kit/ryze-ui/screens.css";
import React from "react";
import { Composition, Still } from "remotion";
import { scenarioDuration } from "./engine/demo/player";
import { promoDuration, PROMO_SIZES } from "./engine/promo/scenario";
import { demoComps, promoComps } from "./scenarios";
import { PAGES } from "./scenarios/pages";
import "./kit/ryze-ui/pages.css";
import { ChatEmptyState } from "./screens/chat-empty-state";
import {
  ClaudeChatPreview,
  ClaudeEmptyPreview,
  McpPopupPreview,
  McpSettingsPreview,
} from "./screens/claude-ui-preview";
import {
  SlackChannelPreview,
  SlackPdfThreadPreview,
  SlackThreadPreview,
} from "./screens/slack-ui-preview";
import { ChatMessages } from "./screens/chat-messages";
import { ChatTools } from "./screens/chat-tools";
import { ChatCharts } from "./screens/chat-charts";
import { ChatCreativeWidget } from "./screens/chat-creative-widget";
import { ChatQuestionWidget } from "./screens/chat-question-widget";
import { ChatActionsWidget } from "./screens/chat-actions-widget";
import { ShipperAdwait, SHIPPER_ADWAIT_TOTAL } from "./scenarios/shipper-adwait";
import { BotEffect, BOT_EFFECT_TOTAL } from "./scenarios/bot-effect";
import { McpHook, MCP_HOOK_TOTAL } from "./scenarios/mcp-hook";
import { SuperAgent, SUPERAGENT_TOTAL } from "./scenarios/superagent";
import { DitherLab, DITHER_LAB_TOTAL } from "./scenarios/dither-lab";
import { Shipper2, SHIPPER_2_TOTAL } from "./scenarios/shipper-2";
import { AndoJams, ANDO_JAMS_TOTAL } from "./scenarios/ando-jams";
import { GrokPlugins, GROK_PLUGINS_TOTAL } from "./scenarios/grok-plugins";
import { KitLabGemini, KIT_LAB_GEMINI_TOTAL } from "./scenarios/kit-lab-gemini";
import { AmplitudeAgents, AMPLITUDE_AGENTS_TOTAL } from "./scenarios/amplitude-agents";
import { PlatformTour, PLATFORM_TOUR_TOTAL } from "./scenarios/platform-tour";
import { WalkthroughPaidAds, WALKTHROUGH_PAID_ADS_TOTAL } from "./scenarios/walkthrough-paid-ads";
import { WalkthroughSeo, WALKTHROUGH_SEO_TOTAL } from "./scenarios/walkthrough-seo";
import { GuideSchedules, GUIDE_SCHEDULES_TOTAL } from "./guide/scenarios/schedules";
import { GuideTemplates, GUIDE_TEMPLATES_TOTAL } from "./guide/scenarios/templates";
import { GuideVisibility, GUIDE_VISIBILITY_TOTAL } from "./guide/scenarios/visibility";
import { GuideApprovals, GUIDE_APPROVALS_TOTAL } from "./guide/scenarios/approvals";
import { GuideTechnicalAudit, GUIDE_TECHNICAL_AUDIT_TOTAL } from "./guide/scenarios/technical-audit";
import { GuideBrand, GUIDE_BRAND_TOTAL } from "./guide/scenarios/brand";
import { GuideBacklinkExchange, GUIDE_BACKLINK_EXCHANGE_TOTAL } from "./guide/scenarios/backlink-exchange";
import { GuideBlogStudio, GUIDE_BLOG_STUDIO_TOTAL } from "./guide/scenarios/blog-studio";
import { GuideSeoSetup, GUIDE_SEO_SETUP_TOTAL } from "./guide/scenarios/seo-setup";
import { GuideWritingArticles, GUIDE_WRITING_ARTICLES_TOTAL } from "./guide/scenarios/writing-articles";
import { GuideCreatives, GUIDE_CREATIVES_TOTAL } from "./guide/scenarios/creatives";
import { GuideCompetitorAds, GUIDE_COMPETITOR_ADS_TOTAL } from "./guide/scenarios/competitor-ads";
import { GuidePublishing, GUIDE_PUBLISHING_TOTAL } from "./guide/scenarios/publishing";
import { GuideReports, GUIDE_REPORTS_TOTAL } from "./guide/scenarios/reports";
import { GuideThumb } from "./guide/thumb";
import { GuideAgent, GUIDE_AGENT_TOTAL } from "./guide/scenarios/agent";
import { GuidePlatformOverview, GUIDE_PLATFORM_OVERVIEW_TOTAL } from "./guide/scenarios/platform-overview";
import { GuidePaidAdsOverview, GUIDE_PAID_ADS_OVERVIEW_TOTAL } from "./guide/scenarios/paid-ads-overview";
import { GuideMcp, GUIDE_MCP_TOTAL } from "./guide/scenarios/mcp";
import { AskAndChart, ASK_AND_CHART_TOTAL } from "./scenarios/ask-and-chart";
import { AskOpen, ASK_OPEN_TOTAL } from "./scenarios/ask-and-chart/scene-open";
import { AskChat, ASK_CHAT_TOTAL } from "./scenarios/ask-and-chart/scene-chat";
import { GuideCam, GUIDE_CAM_TOTAL } from "./scenarios/guide-cam";
import { AskCreatives, ASK_CREATIVES_TOTAL } from "./scenarios/ask-creatives";
import { FixSeo, FIX_SEO_TOTAL } from "./scenarios/fix-seo";
import { AdsChatgpt, ADS_CHATGPT_TOTAL } from "./scenarios/ads-chatgpt";
import { GrokBot, GROK_BOT_TOTAL, GrokBotCta, GROK_BOT_CTA_TOTAL } from "./scenarios/grok-bot";
import { LaunchAds, LAUNCH_ADS_TOTAL } from "./scenarios/launch-ads";
import { SlackAutopilot, SLACK_AUTOPILOT_TOTAL } from "./scenarios/slack-autopilot";
import { CreativeLibrary, CREATIVE_LIBRARY_TOTAL } from "./scenarios/creative-library";
import { BadSite } from "./scenarios/fix-seo/bad-site";
import { BeforeSite } from "./scenarios/fix-seo-2/before-site";
import { AfterSite } from "./scenarios/fix-seo-2/after-site";
import { CreativesInput, CREATIVES_INPUT_TOTAL } from "./scenarios/ask-creatives/scene-input";
import { PanesPreview } from "./scenarios/cited-by-ai/panes-preview";
import { CitedByAi, CITED_BY_AI_TOTAL } from "./scenarios/cited-by-ai";
import { BacklinkExchange, BACKLINK_EXCHANGE_TOTAL } from "./scenarios/backlink-exchange";
import { CompetitorAds, COMPETITOR_ADS_TOTAL } from "./scenarios/competitor-ads";
import { Approvals, APPROVALS_TOTAL } from "./scenarios/approvals";
import { DeckGen, DECK_GEN_TOTAL } from "./scenarios/deck-gen";
import { CreativeLibraryFeed, CREATIVE_LIBRARY_FEED_TOTAL } from "./scenarios/creative-library-feed";
import { CreativeLibraryGlobe, CREATIVE_LIBRARY_GLOBE_TOTAL } from "./scenarios/creative-library-globe";
import {
  CreativeLibraryGlobeAvalanche,
  CREATIVE_LIBRARY_GLOBE_AVALANCHE_TOTAL,
} from "./scenarios/creative-library-globe-avalanche";
import { ApprovalsFeed, APPROVALS_FEED_TOTAL } from "./scenarios/approvals-feed";
import { CitedByAiFeed, CITED_BY_AI_FEED_TOTAL } from "./scenarios/cited-by-ai-feed";
import { CompetitorAdsFeed, COMPETITOR_ADS_FEED_TOTAL } from "./scenarios/competitor-ads-feed";
import { ScanAlgo, SCAN_ALGO_TOTAL } from "./scenarios/scan-algo";
import { YtPart1, YT_PART1_TOTAL } from "./scenarios/yt-part1";
import { YtFull, YT_FULL_TOTAL } from "./scenarios/yt-full";

const SCREEN = { width: 1920, height: 1080 } as const;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {demoComps.map(({ scenario, Component }) => (
        <Composition
          key={scenario.id}
          id={scenario.id}
          component={Component}
          durationInFrames={scenarioDuration(scenario)}
          fps={FPS}
          {...SCREEN}
        />
      ))}

      {promoComps.map(({ scenario, Component }) => (
        <Composition
          key={scenario.id}
          id={scenario.id}
          component={Component}
          durationInFrames={promoDuration(scenario)}
          fps={FPS}
          {...PROMO_SIZES[scenario.format]}
        />
      ))}

      <Composition
        id="amplitude-agents"
        component={AmplitudeAgents}
        durationInFrames={AMPLITUDE_AGENTS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="shipper-adwait"
        component={ShipperAdwait}
        durationInFrames={SHIPPER_ADWAIT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition id="mcp-hook" component={McpHook} durationInFrames={MCP_HOOK_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="superagent" component={SuperAgent} durationInFrames={SUPERAGENT_TOTAL} fps={FPS} {...SCREEN} />
      <Composition
        id="bot-effect"
        component={BotEffect}
        durationInFrames={BOT_EFFECT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="dither-lab"
        component={DitherLab}
        durationInFrames={DITHER_LAB_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="shipper-2"
        component={Shipper2}
        durationInFrames={SHIPPER_2_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition id="ando-jams" component={AndoJams} durationInFrames={ANDO_JAMS_TOTAL} fps={FPS} {...SCREEN} />
      <Composition
        id="grok-plugins"
        component={GrokPlugins}
        durationInFrames={GROK_PLUGINS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="kit-lab-gemini"
        component={KitLabGemini}
        durationInFrames={KIT_LAB_GEMINI_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="platform-tour"
        component={PlatformTour}
        durationInFrames={PLATFORM_TOUR_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="walkthrough-paid-ads"
        component={WalkthroughPaidAds}
        durationInFrames={WALKTHROUGH_PAID_ADS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-schedules"
        component={GuideSchedules}
        durationInFrames={GUIDE_SCHEDULES_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-templates"
        component={GuideTemplates}
        durationInFrames={GUIDE_TEMPLATES_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-mcp"
        component={GuideMcp}
        durationInFrames={GUIDE_MCP_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-paid-ads-overview"
        component={GuidePaidAdsOverview}
        durationInFrames={GUIDE_PAID_ADS_OVERVIEW_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-platform-overview"
        component={GuidePlatformOverview}
        durationInFrames={GUIDE_PLATFORM_OVERVIEW_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-agent"
        component={GuideAgent}
        durationInFrames={GUIDE_AGENT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-reports"
        component={GuideReports}
        durationInFrames={GUIDE_REPORTS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-publishing"
        component={GuidePublishing}
        durationInFrames={GUIDE_PUBLISHING_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-visibility"
        component={GuideVisibility}
        durationInFrames={GUIDE_VISIBILITY_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-creatives"
        component={GuideCreatives}
        durationInFrames={GUIDE_CREATIVES_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-writing-articles"
        component={GuideWritingArticles}
        durationInFrames={GUIDE_WRITING_ARTICLES_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-seo-setup"
        component={GuideSeoSetup}
        durationInFrames={GUIDE_SEO_SETUP_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-blog-studio"
        component={GuideBlogStudio}
        durationInFrames={GUIDE_BLOG_STUDIO_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-backlink-exchange"
        component={GuideBacklinkExchange}
        durationInFrames={GUIDE_BACKLINK_EXCHANGE_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-brand"
        component={GuideBrand}
        durationInFrames={GUIDE_BRAND_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-technical-audit"
        component={GuideTechnicalAudit}
        durationInFrames={GUIDE_TECHNICAL_AUDIT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-approvals"
        component={GuideApprovals}
        durationInFrames={GUIDE_APPROVALS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="guide-competitor-ads"
        component={GuideCompetitorAds}
        durationInFrames={GUIDE_COMPETITOR_ADS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="walkthrough-seo"
        component={WalkthroughSeo}
        durationInFrames={WALKTHROUGH_SEO_TOTAL}
        fps={FPS}
        {...SCREEN}
      />


      <Composition
        id="ask-and-chart"
        component={AskAndChart}
        durationInFrames={ASK_AND_CHART_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="ask-open"
        component={AskOpen}
        durationInFrames={ASK_OPEN_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="ask-chat"
        component={AskChat}
        durationInFrames={ASK_CHAT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="guide-cam"
        component={GuideCam}
        durationInFrames={GUIDE_CAM_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="ask-creatives"
        component={AskCreatives}
        durationInFrames={ASK_CREATIVES_TOTAL}
        fps={FPS}
        {...SCREEN}
      />


      <Composition
        id="backlink-exchange"
        component={BacklinkExchange}
        durationInFrames={BACKLINK_EXCHANGE_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="approvals"
        component={Approvals}
        durationInFrames={APPROVALS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="competitor-ads"
        component={CompetitorAds}
        durationInFrames={COMPETITOR_ADS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="cited-by-ai"
        component={CitedByAi}
        durationInFrames={CITED_BY_AI_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="creative-library"
        component={CreativeLibrary}
        durationInFrames={CREATIVE_LIBRARY_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="creative-library-feed"
        component={CreativeLibraryFeed}
        durationInFrames={CREATIVE_LIBRARY_FEED_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="creative-library-globe"
        component={CreativeLibraryGlobe}
        durationInFrames={CREATIVE_LIBRARY_GLOBE_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="creative-library-globe-avalanche"
        component={CreativeLibraryGlobeAvalanche}
        durationInFrames={CREATIVE_LIBRARY_GLOBE_AVALANCHE_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="approvals-feed"
        component={ApprovalsFeed}
        durationInFrames={APPROVALS_FEED_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="cited-by-ai-feed"
        component={CitedByAiFeed}
        durationInFrames={CITED_BY_AI_FEED_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="competitor-ads-feed"
        component={CompetitorAdsFeed}
        durationInFrames={COMPETITOR_ADS_FEED_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="yt-full"
        component={YtFull}
        durationInFrames={YT_FULL_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="yt-part1"
        component={YtPart1}
        durationInFrames={YT_PART1_TOTAL}
        fps={FPS}
        {...SCREEN}
      />
      <Composition
        id="scan-algo"
        component={ScanAlgo}
        durationInFrames={SCAN_ALGO_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="deck-gen"
        component={DeckGen}
        durationInFrames={DECK_GEN_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="fix-seo"
        component={FixSeo}
        durationInFrames={FIX_SEO_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="grok-bot"
        component={GrokBot}
        durationInFrames={GROK_BOT_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.square}
      />

      <Composition
        id="grok-bot-cta"
        component={GrokBotCta}
        durationInFrames={GROK_BOT_CTA_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.square}
      />

      <Composition
        id="ads-chatgpt"
        component={AdsChatgpt}
        durationInFrames={ADS_CHATGPT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="launch-ads"
        component={LaunchAds}
        durationInFrames={LAUNCH_ADS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="slack-autopilot"
        component={SlackAutopilot}
        durationInFrames={SLACK_AUTOPILOT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="creatives-input"
        component={CreativesInput}
        durationInFrames={CREATIVES_INPUT_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      {PAGES.map((p) => (
        <Still key={`${p.scenario}-${p.slug}`} id={`page-${p.scenario}-${p.slug}`} component={p.Component} {...SCREEN} />
      ))}
      <Still id="cited-panes" component={PanesPreview} {...SCREEN} />
      <Still
        id="guide-thumb"
        component={GuideThumb}
        {...SCREEN}
        defaultProps={{ title: "How to use templates", accent: "templates" }}
      />
      <Still id="fix-seo-bad-site" component={BadSite} width={1040} height={1016} />
      <Still id="fix-seo-2-before" component={BeforeSite} width={1040} height={1016} />
      <Still id="fix-seo-2-after" component={AfterSite} width={1040} height={1016} />
      <Still id="slack-channel" component={SlackChannelPreview} {...SCREEN} />
      <Still id="slack-thread" component={SlackThreadPreview} {...SCREEN} />
      <Still id="slack-thread-pdf" component={SlackPdfThreadPreview} {...SCREEN} />
      <Still id="claude-empty" component={ClaudeEmptyPreview} {...SCREEN} />
      <Still id="claude-chat" component={ClaudeChatPreview} {...SCREEN} />
      <Still id="claude-mcp-settings" component={McpSettingsPreview} {...SCREEN} />
      <Still id="claude-mcp-popup" component={McpPopupPreview} {...SCREEN} />
      <Still id="chat-empty-state" component={ChatEmptyState} {...SCREEN} defaultProps={{ agentPanelOpen: false }} />
      <Still id="chat-empty-state-agent-panel" component={ChatEmptyState} {...SCREEN} defaultProps={{ agentPanelOpen: true }} />
      <Composition id="chat-messages" component={ChatMessages} durationInFrames={120} fps={FPS} {...SCREEN} />
      <Composition id="chat-tools" component={ChatTools} durationInFrames={120} fps={FPS} {...SCREEN} />
      <Still id="chat-charts" component={ChatCharts} {...SCREEN} />
      <Composition id="chat-creative-widget" component={ChatCreativeWidget} durationInFrames={120} fps={FPS} {...SCREEN} />
      <Still id="chat-question-widget" component={ChatQuestionWidget} {...SCREEN} />
      <Still id="chat-actions-widget" component={ChatActionsWidget} {...SCREEN} />
    </>
  );
};
