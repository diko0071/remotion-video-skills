import React from "react";
import type { RailSection } from "../../kit/ryze-ui/app-shell";
import {
  AdTemplatesPage,
  ApprovalsListPage,
  ApprovalsPage,
  BacklinksPage,
  BlogStudioPage,
  BrandContextPage,
  BrandIdentityPage,
  BrandPage,
  ChatEmptyPage,
  ChatThreadPage,
  ChatsPage,
  CompetitorAdsPage,
  ContentPlanCalendarPage,
  ContentPlanPage,
  CreativesPage,
  GeoQueriesPage,
  IntegrationsPage,
  OrgHomePage,
  PaidAdsCampaignsPage,
  PaidAdsCreativesTabPage,
  PaidAdsDashboardPage,
  PaidAdsPortfolioPage,
  QueriesKeywordsPage,
  ReportDetailPage,
  ReportsPage,
  ScheduleDetailPage,
  SchedulesPage,
  SeoDashboardContentPage,
  SeoDashboardGeoPage,
  SeoDashboardPage,
  SeoHomePage,
  TechnicalAuditPage,
  TemplatesPage,
} from "../../kit/ryze-ui/pages";


export type Stop = {
  nav: string;
  section?: RailSection;
  Component: React.FC;
  click?: string | null;
  hold?: number;
};

export const STOPS: Stop[] = [
  { nav: "Home", Component: OrgHomePage, hold: 34 },

  { nav: "Approvals", Component: ApprovalsPage },
  { nav: "Approvals", Component: ApprovalsListPage, click: "view.approvals.list", hold: 40 },

  { nav: "New chat", Component: ChatEmptyPage, hold: 40 },
  { nav: "New chat", Component: ChatThreadPage, click: null, hold: 44 },
  { nav: "Chat History", Component: ChatsPage },

  { nav: "Schedules", Component: SchedulesPage },
  { nav: "Schedules", Component: ScheduleDetailPage, click: "schedule.Weekly performance digest", hold: 40 },

  { nav: "Templates", Component: TemplatesPage },

  { nav: "Brand", Component: BrandIdentityPage },
  { nav: "Brand", Component: BrandPage, click: "tab.brand.Visual" },
  { nav: "Brand", Component: BrandContextPage, click: "tab.brand.Context", hold: 40 },

  { nav: "Reports", Component: ReportsPage },
  { nav: "Reports", Component: ReportDetailPage, click: "report.Ember & Oak — August performance review", hold: 44 },

  { nav: "Integrations", Component: IntegrationsPage },

  { nav: "Dashboard", Component: PaidAdsDashboardPage },
  { nav: "Dashboard", Component: PaidAdsCampaignsPage, click: "tab.paid-ads.Campaigns" },
  { nav: "Dashboard", Component: PaidAdsCreativesTabPage, click: "tab.paid-ads.Creatives" },
  { nav: "Dashboard", Component: PaidAdsPortfolioPage, click: "tab.paid-ads.Portfolio View", hold: 40 },
  { nav: "Ad Creatives", Component: CreativesPage },
  { nav: "Ad Templates", Component: AdTemplatesPage },
  { nav: "Competitor Ads", Component: CompetitorAdsPage },

  { nav: "Home", section: "seo", Component: SeoHomePage, click: "nav.dashboard.SEO", hold: 40 },
  { nav: "Dashboard", section: "seo", Component: SeoDashboardPage, hold: 40 },
  {
    nav: "Dashboard",
    section: "seo",
    Component: SeoDashboardGeoPage,
    click: "tab.seo-dashboard.GEO",
    hold: 44,
  },
  {
    nav: "Dashboard",
    section: "seo",
    Component: SeoDashboardContentPage,
    click: "tab.seo-dashboard.Content",
    hold: 40,
  },
  { nav: "Technical Audit", section: "seo", Component: TechnicalAuditPage },
  { nav: "Content Plan", section: "seo", Component: ContentPlanPage },
  {
    nav: "Content Plan",
    section: "seo",
    Component: ContentPlanCalendarPage,
    click: "view.content-plan.calendar",
    hold: 44,
  },
  { nav: "Blog Studio", section: "seo", Component: BlogStudioPage, hold: 40 },
  { nav: "Queries", section: "seo", Component: QueriesKeywordsPage },
  { nav: "Queries", section: "seo", Component: GeoQueriesPage, click: "tab.queries.Prompts" },
  { nav: "Mentions", section: "seo", Component: BacklinksPage, hold: 44 },
];

export const stopClickTarget = (stop: Stop): string | null =>
  stop.click === undefined ? `nav.${stop.section ?? "dashboard"}.${stop.nav}` : stop.click;
