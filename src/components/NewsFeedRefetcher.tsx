import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledFab } from '../styled/StyledFab.tsx';
import { Cached } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { NewsDetails } from '../types/NewsDetails.ts';
import { changeNewsFeed } from '../stores/slices/NewsFeedSlice.ts';
import { StoresState } from '../stores/Store.ts';
import { setError, triggerRefetch } from '../stores/slices/NewsFeedSlice.ts';

const queryPages = [1, 2, 3, 4];

type NewsFeedElement = NewsDetails & { comments: Comment[] };

const NewsFeedRefetcher = () => {
  const trigger = useSelector<StoresState>((state) => state.newsFeedStore.refetchTrigger);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNewsFeed = async () => {
      try {
        const data = await Promise.allSettled(
          queryPages.map((page) => axios<NewsFeedElement[]>(`https://api.hnpwa.com/v0/newest/${page}.json`), {
            signal,
          }),
        );

        const newsFeed = data
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

        dispatch(changeNewsFeed(newsFeed));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(setError(error.toJSON()));
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

  return (
    <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginLeft: 'auto' }}>
      <Cached />
    </StyledFab>
  );
};

export default NewsFeedRefetcher;
