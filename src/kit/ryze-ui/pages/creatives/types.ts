export type CreativeStatus = "completed" | "generating" | "failed";

export type Creative = {
  id: string;
  title: string;
  size: string;
  aspect: string;
  image?: string;
  pos?: string;
  status: CreativeStatus;
};
