export type NewsDetails = {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  deleted?: boolean;
  dead?: boolean;
  url?: string;
  comments_count: number;
};
