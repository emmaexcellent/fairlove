
export type ReactionKey = "heart" | "inLove" | "spark" | "rose";

export interface LoveMessage  {
  $id: string;
  $createdAt: string;
  message: string;
  reaction?: ReactionKey | null;
  coins?: number;
  shares?: number;
  background?: string;
}

export interface BackgroundTheme {
  id: string;
  label: string;
  css: string;
  emojis?: string[];
}
