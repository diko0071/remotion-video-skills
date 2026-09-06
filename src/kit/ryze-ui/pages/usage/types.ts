export type UsageDay = { date: string; count: number };

export type UsageEntry = { id: string; label: string; count: number };

export const formatCount = (n: number) => n.toLocaleString("en-US");

export const initials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
};
