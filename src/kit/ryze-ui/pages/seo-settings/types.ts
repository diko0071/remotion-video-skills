export type PublishingMode = "auto" | "manual";

export type PublishPlatformState = "connected" | "none";

export type PublishPlatform = {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg?: string;
  state: PublishPlatformState;
};
