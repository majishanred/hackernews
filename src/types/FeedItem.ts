export type FeedItem = {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  type: string;
  url?: string;
  domain?: string;
};
