
export type BaseItem = {
    id: number;
    deleted: boolean;
    type: 'story' | 'comment';
    by: 'string';
    time: number;
    text: string;
    dead: boolean;
    kids: number[];
    url: string;
    score: number;
    title: string;
};