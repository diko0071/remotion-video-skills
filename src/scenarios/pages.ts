import React from "react";
import {
  ChatArtifactDashboardPage,
  ChatArtifactDeckPage,
  ChatArtifactBrowserPage,
} from "../kit/ryze-ui/pages/chat-artifact";
import {
  ApprovalsPage,
  ApprovalsListPage,
  ArticleEditorPage,
  SeoSettingsPage,
  BacklinksPage,
  ChatsPage,
  ContentPlanPage,
  CreativesPage,
  IntegrationsPage,
  PaidAdsDashboardPage,
  ReportsPage,
  ScheduleDetailPage,
  SchedulesPage,
  SeoHomePage,
  TechnicalAuditPage,
  AdTemplatesPage,
  BrandPage,
  CompetitorAdsPage,
  ContentPlanCalendarPage,
  GeoQueriesPage,
  OrgHomePage,
  TemplatesPage,
  UsagePage,
  BlogStudioPage,
  ReportDetailPage,
  BrandIdentityPage,
  BrandContextPage,
  QueriesKeywordsPage,
} from "../kit/ryze-ui/pages";
import {
  PaidAdsCampaignsPage,
  PaidAdsCreativesTabPage,
  PaidAdsPortfolioPage,
} from "../kit/ryze-ui/pages/paid-ads-dashboard";


export type ProductPage = {
  scenario: string;
  slug: string;
  title: string;
  Component: React.FC;
};

import {
  SeoDashboardPage,
  SeoDashboardGeoPage,
  SeoDashboardContentPage,
} from "../kit/ryze-ui/pages/seo-dashboard";
import { ChatEmptyPage } from "../kit/ryze-ui/pages/chat-empty";
import { ChatThreadPage } from "../kit/ryze-ui/pages/chat-thread";
import {
  ChatKitArtifactTurn,
  ChatKitTurn1,
  ChatKitTurn2,
  ChatKitTyping,
  ChatKitTypingFirst,
  ChatKitArtifactOpening,
  ChatKitFirstSent,
} from "./chat-kit-demo";

export const PAGES: ProductPage[] = [


  { scenario: "ryze", slug: "seo-home", title: "SEO — Home (setup + projection)", Component: SeoHomePage },
  { scenario: "ryze", slug: "approvals", title: "Approvals — board", Component: ApprovalsPage },
  { scenario: "ryze", slug: "integrations", title: "Integrations", Component: IntegrationsPage },
  { scenario: "ryze", slug: "content-plan", title: "SEO — Content Plan", Component: ContentPlanPage },
  { scenario: "ryze", slug: "article-editor", title: "SEO — Article editor", Component: ArticleEditorPage },
  { scenario: "ryze", slug: "seo-settings", title: "SEO — Settings (Publishing)", Component: SeoSettingsPage },
  { scenario: "ryze", slug: "technical-audit", title: "SEO — Technical Audit", Component: TechnicalAuditPage },
  { scenario: "ryze", slug: "backlinks", title: "SEO — Backlinks & Mentions", Component: BacklinksPage },
  { scenario: "ryze", slug: "reports", title: "Reports", Component: ReportsPage },
  { scenario: "ryze", slug: "paid-ads", title: "Paid Ads — Dashboard", Component: PaidAdsDashboardPage },
  { scenario: "ryze", slug: "creatives", title: "Ad Creatives", Component: CreativesPage },
  { scenario: "ryze", slug: "schedules", title: "Scheduled tasks", Component: SchedulesPage },
  { scenario: "ryze", slug: "schedule-detail", title: "Scheduled task — detail", Component: ScheduleDetailPage },
  { scenario: "ryze", slug: "chats", title: "Chat History", Component: ChatsPage },
  { scenario: "ryze", slug: "org-home", title: "Home (Connect Claude)", Component: OrgHomePage },
  { scenario: "ryze", slug: "content-plan-calendar", title: "SEO — Content Plan (calendar)", Component: ContentPlanCalendarPage },
  { scenario: "ryze", slug: "geo-queries", title: "SEO — AI Search prompts", Component: GeoQueriesPage },
  { scenario: "ryze", slug: "competitor-ads", title: "Competitor Ads", Component: CompetitorAdsPage },
  { scenario: "ryze", slug: "ad-templates", title: "Ad Templates", Component: AdTemplatesPage },
  { scenario: "ryze", slug: "templates", title: "Templates", Component: TemplatesPage },
  { scenario: "ryze", slug: "brand", title: "Brand", Component: BrandPage },
  { scenario: "ryze", slug: "usage", title: "Usage", Component: UsagePage },
  { scenario: "ryze", slug: "blog-studio", title: "SEO — Blog Studio", Component: BlogStudioPage },
  { scenario: "ryze", slug: "report-detail", title: "Reports — report detail", Component: ReportDetailPage },
  { scenario: "ryze", slug: "brand-identity", title: "Brand — Identity", Component: BrandIdentityPage },
  { scenario: "ryze", slug: "brand-context", title: "Brand — Context", Component: BrandContextPage },
  { scenario: "ryze", slug: "queries-keywords", title: "Queries — Keywords", Component: QueriesKeywordsPage },
  { scenario: "ryze", slug: "paid-ads-campaigns", title: "Paid Ads — Campaigns", Component: PaidAdsCampaignsPage },
  { scenario: "ryze", slug: "paid-ads-creatives", title: "Paid Ads — Creatives", Component: PaidAdsCreativesTabPage },
  { scenario: "ryze", slug: "paid-ads-portfolio", title: "Paid Ads — Portfolio View", Component: PaidAdsPortfolioPage },
  { scenario: "ryze", slug: "chat-empty", title: "Chat — new chat (empty state)", Component: ChatEmptyPage },
  { scenario: "ryze", slug: "chat-thread", title: "Chat — conversation", Component: ChatThreadPage },
  { scenario: "ryze", slug: "seo-dashboard", title: "SEO — Dashboard", Component: SeoDashboardPage },
  { scenario: "ryze", slug: "seo-dashboard-geo", title: "SEO — Dashboard (GEO)", Component: SeoDashboardGeoPage },
  { scenario: "ryze", slug: "seo-dashboard-content", title: "SEO — Dashboard (Content)", Component: SeoDashboardContentPage },
  { scenario: "ryze", slug: "approvals-list", title: "Approvals — list", Component: ApprovalsListPage },
  { scenario: "ryze", slug: "chat-artifact-dashboard", title: "Chat — artifact panel (dashboard)", Component: ChatArtifactDashboardPage },
  { scenario: "ryze", slug: "chat-artifact-deck", title: "Chat — artifact panel (deck)", Component: ChatArtifactDeckPage },
  { scenario: "ryze", slug: "chat-artifact-browser", title: "Chat — artifact panel (live site)", Component: ChatArtifactBrowserPage },
  { scenario: "ryze", slug: "chat-kit-turn-1", title: "Chat kit — turn 1 (creatives)", Component: ChatKitTurn1 },
  { scenario: "ryze", slug: "chat-kit-turn-2", title: "Chat kit — turn 2 (chart)", Component: ChatKitTurn2 },
  { scenario: "ryze", slug: "chat-kit-typing", title: "Chat kit — typing turn 3", Component: ChatKitTyping },
  { scenario: "ryze", slug: "chat-kit-typing-first", title: "Chat kit — typing turn 1", Component: ChatKitTypingFirst },
  { scenario: "ryze", slug: "chat-kit-first-sent", title: "Chat kit — turn 1 just sent", Component: ChatKitFirstSent },
  { scenario: "ryze", slug: "chat-kit-artifact", title: "Chat kit — artifact turn (live site)", Component: ChatKitArtifactTurn },
  { scenario: "ryze", slug: "chat-kit-artifact-opening", title: "Chat kit — artifact opening", Component: ChatKitArtifactOpening },
];
