export type IntegrationState = "connected" | "accounts" | "reconnect" | "setup" | "none";

export type IntegrationItem = {
  name: string;
  icon: string;
  iconBg?: string;
  description: string;
  state: IntegrationState;
  accountsCount?: number;
};

export type IntegrationGroup = { category: string; items: IntegrationItem[] };
