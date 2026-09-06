export type PaidAdsKpi = {
  label: string;
  value: string;
  sub: string;
  delta?: number;
  goodWhenDown?: boolean;
};

export type Channel = {
  name: string;
  logo: string;
  spend: string;
  spendShare: number;
  roas: string;
  roasShare: number;
  convRate: string;
  convRateShare: number;
  conversions: string;
  conversionsShare: number;
};

export type Mover = {
  campaign: string;
  logo: string;
  spend: string;
  dSpend: number | null;
  isNew?: boolean;
  conversions: number;
  dCpa: number | null;
};

export type CampaignRow = {
  campaign: string;
  logo: string;
  account: string;
  active: boolean;
  spend: string;
  spendShare: number;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  conversions: number;
  cpa: string;
};

export type Creative = {
  id: string;
  image: string;
  platform: string;
  title: string;
  body: string;
  active: boolean;
  spend: string;
  ctr: string;
  cpc: string;
  results: string;
};

export type AccountRow = {
  account: string;
  logo: string;
  spend: string;
  spendValue: number;
  impressions: number;
  impressionsLabel: string;
  clicks: number;
  clicksLabel: string;
  conversions: number;
  cpa: string;
  cpaValue: number | null;
  roas: string;
  roasValue: number | null;
};

export type PlatformLegendItem = { label: string; color: string };

export type BarsCardRow = { label: string; value: number; text: string };
