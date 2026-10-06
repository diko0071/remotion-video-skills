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
import { MuseChatPreview, MuseWorkingPreview, MuseArtifactPreview } from "./screens/muse-ui-preview";
import { MuseRyze, MUSE_RYZE_TOTAL } from "./scenarios/muse-ryze";
import { MuseTimelapse, MUSE_TIMELAPSE_TOTAL } from "./scenarios/muse-timelapse";
import { MuseChatlog, MUSE_CHATLOG_TOTAL } from "./scenarios/muse-chatlog";
import { ChatMessages } from "./screens/chat-messages";
import { ChatTools } from "./screens/chat-tools";
import { ChatCharts } from "./screens/chat-charts";
import { ChatCreativeWidget } from "./screens/chat-creative-widget";
import { ChatQuestionWidget } from "./screens/chat-question-widget";
import { ChatActionsWidget } from "./screens/chat-actions-widget";
import { ShipperAdwait, SHIPPER_ADWAIT_TOTAL } from "./scenarios/shipper-adwait";
import { BotEffect, BOT_EFFECT_TOTAL } from "./scenarios/bot-effect";
import { McpHook, MCP_HOOK_TOTAL } from "./scenarios/mcp-hook";
import { IntroducingAgent, INTRODUCING_AGENT_TOTAL } from "./scenarios/introducing-agent";
import { DuoBeforeAfter, DUO_BEFORE_AFTER_TOTAL, DuoTeam, DUO_TEAM_TOTAL, DuoTeamGen, DUO_TEAM_GEN_TOTAL } from "./scenarios/duo";
import { SuperAgent, SUPERAGENT_TOTAL } from "./scenarios/superagent";
import { VeedLaunch, VEED_LAUNCH_TOTAL } from "./scenarios/veed-launch";
import { NumbersReplica, NUMBERS_REPLICA_TOTAL } from "./scenarios/numbers-replica";
import { ClaudeDirectory, CLAUDE_DIRECTORY_TOTAL } from "./scenarios/claude-directory";
import { DoneForYou, DONE_FOR_YOU_TOTAL } from "./scenarios/done-for-you";
import { PromptToMeta, PROMPT_TO_META_TOTAL } from "./scenarios/prompt-to-meta";
import { AdLibrary, AD_LIBRARY_TOTAL } from "./scenarios/ad-library";
import { InstinctCalls, INSTINCT_TOTAL } from "./scenarios/instinct-calls";
import { OMarketing, O_TOTAL } from "./scenarios/o-marketing";
import { ONightShift, NS_TOTAL } from "./scenarios/o-night-shift";
import { OFullStop, FS_TOTAL } from "./scenarios/o-full-stop";
import { OLockedOut, LO_TOTAL } from "./scenarios/o-locked-out";
import { ManagedCampaigns, MC_TOTAL } from "./scenarios/managed-campaigns";
import { WhatIsManaged, WHAT_IS_MANAGED_TOTAL } from "./scenarios/what-is-managed";
import { WhatIsSeo, WHAT_IS_SEO_TOTAL } from "./scenarios/what-is-seo";
import { WhatIsPaidAds, WHAT_IS_PAID_ADS_TOTAL } from "./scenarios/what-is-paid-ads";
import { DitherLab, DITHER_LAB_TOTAL } from "./scenarios/dither-lab";
import { Shipper2, SHIPPER_2_TOTAL } from "./scenarios/shipper-2";
import { AndoJams, ANDO_JAMS_TOTAL } from "./scenarios/ando-jams";
import { GrokPlugins, GROK_PLUGINS_TOTAL, GrokPluginsCta, GROK_PLUGINS_CTA_TOTAL } from "./scenarios/grok-plugins";
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
import { ApprovalsFeed2, APPROVALS_FEED_2_TOTAL } from "./scenarios/approvals-feed-2";
import { GrokApprovals, GROK_APPROVALS_TOTAL, GrokApprovalsCta, GROK_APPROVALS_CTA_TOTAL } from "./scenarios/grok-approvals";
import { GrokCta, GrokCtaPillStill, GROK_CTA_LEN } from "./kit/grok-cta";
import { ChromeExt, CHROME_EXT_TOTAL } from "./scenarios/chrome-ext";
import { Opus5Marketing, OPUS5_MARKETING_TOTAL } from "./scenarios/opus5-marketing";
import { SellAgents, SELL_AGENTS_TOTAL } from "./scenarios/sell-agents";
import { CitedByAiFeed, CITED_BY_AI_FEED_TOTAL } from "./scenarios/cited-by-ai-feed";
import { CompetitorAdsFeed, COMPETITOR_ADS_FEED_TOTAL } from "./scenarios/competitor-ads-feed";
import { ScanAlgo, SCAN_ALGO_TOTAL } from "./scenarios/scan-algo";
import { YtPart1, YT_PART1_TOTAL } from "./scenarios/yt-part1";
import { YtFull, YT_FULL_TOTAL } from "./scenarios/yt-full";
import { AutopilotFounder, AUTOPILOT_FOUNDER_TOTAL } from "./scenarios/autopilot-founder";
import { StickAgencyInvoice, STICK_AGENCY_INVOICE_TOTAL } from "./scenarios/stick-agency-invoice";
import { StickChatgptCompetitor, STICK_CHATGPT_COMPETITOR_TOTAL } from "./scenarios/stick-chatgpt-competitor";
import { StickMidnightBlog, STICK_MIDNIGHT_BLOG_TOTAL } from "./scenarios/stick-midnight-blog";
import { StickOvernight, STICK_OVERNIGHT_TOTAL } from "./scenarios/stick-overnight";
import { StickClaudeAgencies, STICK_CLAUDE_AGENCIES_TOTAL } from "./scenarios/stick-claude-agencies";

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

      <Composition id="muse-chatlog" component={MuseChatlog} durationInFrames={MUSE_CHATLOG_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="muse-timelapse" component={MuseTimelapse} durationInFrames={MUSE_TIMELAPSE_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="muse-ryze" component={MuseRyze} durationInFrames={MUSE_RYZE_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="mcp-hook" component={McpHook} durationInFrames={MCP_HOOK_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="introducing-agent" component={IntroducingAgent} durationInFrames={INTRODUCING_AGENT_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="duo-team" component={DuoTeam} durationInFrames={DUO_TEAM_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="duo-team-gen" component={DuoTeamGen} durationInFrames={DUO_TEAM_GEN_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="duo-before-after" component={DuoBeforeAfter} durationInFrames={DUO_BEFORE_AFTER_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="superagent" component={SuperAgent} durationInFrames={SUPERAGENT_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="veed-launch" component={VeedLaunch} durationInFrames={VEED_LAUNCH_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="numbers-replica" component={NumbersReplica} durationInFrames={NUMBERS_REPLICA_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="claude-directory" component={ClaudeDirectory} durationInFrames={CLAUDE_DIRECTORY_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="done-for-you" component={DoneForYou} durationInFrames={DONE_FOR_YOU_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="prompt-to-meta" component={PromptToMeta} durationInFrames={PROMPT_TO_META_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="ad-library" component={AdLibrary} durationInFrames={AD_LIBRARY_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="ad-library-feed" component={AdLibrary} durationInFrames={AD_LIBRARY_TOTAL} fps={FPS} width={1080} height={1350} />
      <Composition id="ad-library-story" component={AdLibrary} durationInFrames={AD_LIBRARY_TOTAL} fps={FPS} width={1080} height={1920} />
      <Composition id="instinct-calls" component={InstinctCalls} durationInFrames={INSTINCT_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="o-marketing" component={OMarketing} durationInFrames={O_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="o-night-shift" component={ONightShift} durationInFrames={NS_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="o-full-stop" component={OFullStop} durationInFrames={FS_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="o-locked-out" component={OLockedOut} durationInFrames={LO_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="managed-campaigns" component={ManagedCampaigns} durationInFrames={MC_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="what-is-managed" component={WhatIsManaged} durationInFrames={WHAT_IS_MANAGED_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="what-is-seo" component={WhatIsSeo} durationInFrames={WHAT_IS_SEO_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="what-is-paid-ads" component={WhatIsPaidAds} durationInFrames={WHAT_IS_PAID_ADS_TOTAL} fps={FPS} {...SCREEN} />
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
        id="grok-plugins-cta"
        component={GrokPluginsCta}
        durationInFrames={GROK_PLUGINS_CTA_TOTAL}
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
        id="autopilot-founder"
        component={AutopilotFounder}
        durationInFrames={AUTOPILOT_FOUNDER_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
      />

      <Composition
        id="stick-agency-invoice"
        component={StickAgencyInvoice}
        durationInFrames={STICK_AGENCY_INVOICE_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
      />

      <Composition
        id="stick-chatgpt-competitor"
        component={StickChatgptCompetitor}
        durationInFrames={STICK_CHATGPT_COMPETITOR_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
      />

      <Composition
        id="stick-midnight-blog"
        component={StickMidnightBlog}
        durationInFrames={STICK_MIDNIGHT_BLOG_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
      />

      <Composition
        id="stick-overnight"
        component={StickOvernight}
        durationInFrames={STICK_OVERNIGHT_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
      />

      <Composition
        id="stick-claude-agencies"
        component={StickClaudeAgencies}
        durationInFrames={STICK_CLAUDE_AGENCIES_TOTAL}
        fps={FPS}
        {...PROMO_SIZES.vertical}
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
        id="approvals-feed-2"
        component={ApprovalsFeed2}
        durationInFrames={APPROVALS_FEED_2_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition id="chrome-ext" component={ChromeExt} durationInFrames={CHROME_EXT_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="opus5-marketing" component={Opus5Marketing} durationInFrames={OPUS5_MARKETING_TOTAL} fps={FPS} {...SCREEN} />
      <Composition id="sell-agents" component={SellAgents} durationInFrames={SELL_AGENTS_TOTAL} fps={FPS} {...SCREEN} />

      <Composition
        id="grok-approvals"
        component={GrokApprovals}
        durationInFrames={GROK_APPROVALS_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="grok-approvals-cta"
        component={GrokApprovalsCta}
        durationInFrames={GROK_APPROVALS_CTA_TOTAL}
        fps={FPS}
        {...SCREEN}
      />

      <Composition
        id="grok-cta"
        component={GrokCta}
        durationInFrames={GROK_CTA_LEN}
        fps={FPS}
        {...SCREEN}
        defaultProps={{ background: "#0A0A0B", ink: "#F1F1F3", size: 104, maxWidth: 1600 }}
      />

      <Still id="grok-cta-pill" component={GrokCtaPillStill} {...SCREEN} defaultProps={{ size: 32, bottom: 44 }} />
      <Still id="grok-cta-pill-square" component={GrokCtaPillStill} {...PROMO_SIZES.square} defaultProps={{ size: 30, bottom: 40 }} />

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
      <Still id="muse-chat" component={MuseChatPreview} {...SCREEN} />
      <Still id="muse-working" component={MuseWorkingPreview} {...SCREEN} />
      <Still id="muse-artifact" component={MuseArtifactPreview} {...SCREEN} />
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
