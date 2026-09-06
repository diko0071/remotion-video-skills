export type Platform = "google_ads" | "meta_ads";

export type Card = {
  title: string;
  description: string;
  image: string;
  platforms: Platform[];
};

export type QuickAction = { key: string; label: string };
