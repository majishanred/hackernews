import axios, { AxiosError, CanceledError } from 'axios';
import { useEffect } from 'react';
import { setError } from '../stores/slices/NewsFeedSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { changeNews } from '../stores/slices/NewsDetailsSlice.ts';
import { StoresState } from '../stores/Store.ts';
import { NewsDetails } from '../types/NewsDetails.ts';

const useFetchNews = (newsId: string) => {
  const dispatch = useDispatch();
  const isRefetching = useSelector<StoresState, number>((state) => state.newsStore.refetchTrigger);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      try {
        const { data } = await axios<NewsDetails>(`https://api.hnpwa.com/v0/item/${newsId}.json`, {
          signal,
        });

        dispatch(changeNews(data));
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        if (error instanceof AxiosError) {
          dispatch(setError(error.toJSON()));
        }
      }
    };

    fetchNews();

    const intervalId = setInterval(fetchNews, 1000 * 60);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [newsId, isRefetching, dispatch]);
};

export default useFetchNews;
