import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { useEffect } from 'react';
import axios, { AxiosError, CanceledError } from 'axios';
import { changeNewsFeed, setError } from '../stores/slices/NewsFeedSlice.ts';
import { FeedItem } from '../types/FeedItem.ts';

const queryPages = [1, 2, 3, 4];

const useFetchFeed = () => {
  const dispatch = useDispatch();
  const refetching = useSelector<StoresState, number>((state) => state.newsFeedStore.refetchTrigger);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFeed = async () => {
      try {
        const data = await Promise.all(
          queryPages.map((page) => axios<FeedItem[]>(`https://api.hnpwa.com/v0/newest/${page}.json`), {
            signal,
          }),
        );

        const formatedData = data
          .map((element) => element.data)
          .flat()
          .slice(0, 100);

        dispatch(changeNewsFeed(formatedData));
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        if (error instanceof AxiosError) {
          dispatch(setError(error.toJSON()));
        }
      }
    };

    fetchFeed();

    const intervalId = setInterval(fetchFeed, 1000 * 60);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [refetching, dispatch]);
};

export default useFetchFeed;
