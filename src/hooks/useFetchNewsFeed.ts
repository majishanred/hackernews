import { useSuspenseQueries } from '@tanstack/react-query';
import { FeedItem } from '../types/FeedItem.ts';

const queryPages = [1, 2, 3, 4];

export const useFetchNewsFeed: () => FeedItem[] = () => {
  const { data } = useSuspenseQueries({
    queries: queryPages.map((page) => ({
      queryKey: ['newsChunk', page],
      queryFn: ({ queryKey }) => fetch(`https://api.hnpwa.com/v0/newest/${queryKey[1]}.json`).then((res) => res.json()),
      refetchInterval: 1000 * 60,
    })),
    combine: (results) => {
      return {
        data: results.map((elem) => elem.data),
      };
    },
  });

  return data
    .reduce((acc, curr) => {
      return curr ? [...acc, ...curr] : acc;
    }, [])
    .slice(0, 100);
};
