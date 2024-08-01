import axios, { AxiosError, CanceledError } from 'axios';
import { FeedItem } from '../types/FeedItem.ts';
import { useDispatch } from 'react-redux';
import { useStoresSelector } from './useStoreSelector.ts';
import { useEffect } from 'react';
import { changeNewsFeed, setError, setIsLoading } from '../stores/slices/NewsFeedSlice.ts';

const fetchFeed = (signal: AbortSignal) => {
  return Promise.all(
    [1, 2, 3, 4].map((page) => axios<FeedItem[]>(`https://api.hnpwa.com/v0/newest/${page}.json`), {
      signal,
    }),
  );
};

const useFetchFeed = (refetchInterval: number) => {
  const dispatch = useDispatch();
  const refetchIndicator = useStoresSelector((state) => state.newsFeedStore.refetchIndicator);
  const error = useStoresSelector((state) => state.newsFeedStore.error);

  useEffect(() => {
    const controller = new AbortController();

    const wrapper = async () => {
      dispatch(setIsLoading(true));

      try {
        const rawData = await fetchFeed(controller.signal);
        const feed = rawData
          .map((element) => element.data)
          .flat()
          .slice(0, 100);

        dispatch(changeNewsFeed(feed));
      } catch (e: unknown) {
        if (!(e instanceof CanceledError) && e instanceof AxiosError) {
          dispatch(setError(true));
        }
      }

      dispatch(setIsLoading(false));
    };

    wrapper();

    const intervalId = setInterval(wrapper, refetchInterval);

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, [refetchIndicator, refetchInterval, dispatch, error]);
};

export default useFetchFeed;
