export type CompetitorsTab = "explore" | "tracked";

export type AdBrand = { name: string; domain: string; favicon: string };

export type TrackedBrand = AdBrand & { notify?: boolean; syncing?: boolean };

export type AdCard = {
  id: string;
  brand: AdBrand;
  format: "image" | "text";
  image?: string;
  mediaAspect?: number;
  headline?: string;
  body?: string;
  cta?: string;
  landingHost?: string;
  platform: "meta" | "google";
  runningDays: number;
  active?: boolean;
  tracked?: boolean;
};

export type DiscoveredBrand = AdBrand & { picked?: boolean };
