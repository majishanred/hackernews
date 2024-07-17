import { useSuspenseQuery } from '@tanstack/react-query';
import { Item } from '../types/Item.ts';

export const useFetchNews: (newId: string) => Item = (newsId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ['news', newsId],
    queryFn: ({ queryKey }) => fetch(`https://api.hnpwa.com/v0/item/${queryKey[1]}.json`).then((res) => res.json()),
    refetchInterval: 1000 * 60,
  });

  return data;
};
