import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError, CanceledError } from 'axios';
import { NewsDetails } from '../types/NewsDetails.ts';
import { changeNewsFeed } from '../stores/slices/NewsFeedSlice.ts';
import { StoresState } from '../stores/Store.ts';
import { setError } from '../stores/slices/NewsFeedSlice.ts';

const queryPages = [1, 2, 3, 4];

type NewsFeedElement = NewsDetails & { comments: Comment[] };

const NewsFeedRefetcher = ({ children }: PropsWithChildren) => {
  const trigger = useSelector<StoresState>((state) => state.newsFeedStore.refetchTrigger);
  const dispatch = useDispatch();

  useEffect(() => {
    const { controller, fetchFunc } = NewsFeedFetcher();

    const fetchNewsFeed = async () => {
      try {
        const newsFeed = await fetchFunc();

        dispatch(changeNewsFeed(newsFeed));
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        if (error instanceof AxiosError) {
          setError(error.toJSON());
        }
      }
    };

    fetchNewsFeed();

    const interval = setInterval(fetchNewsFeed, 1000 * 60);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [trigger, dispatch]);

  return <>{children}</>;
};

const NewsFeedFetcher = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchNewsFeed = async () => {
    const data = await Promise.allSettled(
      queryPages.map((page) => axios<NewsFeedElement[]>(`https://api.hnpwa.com/v0/newest/${page}.json`), {
        signal,
      }),
    );

    return data
      .map((promiseResult) => {
        if (promiseResult.status === 'rejected') throw new Error('Error loading news, please reload page');
        return promiseResult.value.data;
      })
      .flat()
      .slice(0, 100)
      .map((element) => {
        const details: NewsDetails = {
          id: element.id,
          title: element.title,
          points: element.points,
          user: element.user,
          time: element.time,
          comments_count: element.comments_count,
        };

        return details;
      });
  };

  return {
    controller: controller,
    fetchFunc: fetchNewsFeed,
  };
};

export default NewsFeedRefetcher;
