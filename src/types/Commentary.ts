export type Commentary = {
  id: number;
  user: string | null;
  content: string;
  deleted?: boolean;
  comments: Commentary[];
  dead?: boolean;
  level: number;
};
