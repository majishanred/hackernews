import { useParams } from 'react-router-dom';
import { PropsWithChildren, useEffect } from 'react';
import axios, { AxiosError, CanceledError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeComments, changeNewsDetails, setError } from '../stores/slices/NewsDetailsSlice.ts';
import { flattenedCommentsTree } from '../utils/utils.ts';
import { Item } from '../types/Item.ts';
import { StoresState } from '../stores/Store.ts';

const NewsRefetcher = ({ children }: PropsWithChildren) => {
  const newsId = useParams().id;
  const trigger = useSelector<StoresState>((state) => state.newsStore.refetchTrigger);
  const dispatch = useDispatch();

  if (!newsId) throw new Error('News Id must be provided');

  useEffect(() => {
    const { controller, fetchFunc } = NewsFetcher(newsId);

    const fetchNews = async () => {
      try {
        const { newsDetails, comments } = await fetchFunc();

        dispatch(changeNewsDetails(newsDetails));
        dispatch(changeComments(comments));
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

    const intervalId = setInterval(async () => {
      await fetchNews();
    }, 1000 * 60);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [newsId, trigger, dispatch]);

  return <>{children}</>;
};

const NewsFetcher = (newsId: string) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const fetchNews = async () => {
    const { data } = await axios<Item>(`https://api.hnpwa.com/v0/item/${newsId}.json`, {
      signal: signal,
    });

    const comments = flattenedCommentsTree(data.comments);
    const newsDetails = {
      id: data.id,
      title: data.title,
      points: data.points,
      user: data.user,
      time: data.time,
      deleted: data.deleted,
      dead: data.dead,
      url: data.url,
      comments_count: data.comments_count,
    };

    return {
      newsDetails: newsDetails,
      comments: comments,
    };
  };

  return {
    controller: controller,
    fetchFunc: fetchNews,
  };
};

export default NewsRefetcher;
