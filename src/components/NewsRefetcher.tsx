import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { StyledFab } from '../styled/StyledFab.tsx';
import { Cached } from '@mui/icons-material';
import axios, { AxiosError, CanceledError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeComments, changeNewsDetails, setError, triggerRefetch } from '../stores/slices/NewsDetailsSlice.ts';
import { flattenedCommentsTree } from '../utils/utils.ts';
import { Item } from '../types/Item.ts';
import { StoresState } from '../stores/Store.ts';

const NewsRefetcher = () => {
  const newsId = useParams().id;
  const trigger = useSelector<StoresState>((state) => state.newsStore.refetchTrigger);
  const dispatch = useDispatch();

  if (!newsId) throw new Error('News Id must be provided');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchNews = async () => {
      try {
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

        dispatch(changeNewsDetails(newsDetails));
        dispatch(changeComments(comments));
      } catch (error: unknown) {
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

  return (
    <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginLeft: 'auto' }}>
      <Cached />
    </StyledFab>
  );
};

export default NewsRefetcher;
