import { Divider, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { NewsDetails } from '../types/NewsDetails.ts';
import ErrorFallback from './ErrorFallback.tsx';
import { StyledFab } from '../styled/StyledFab.tsx';
import { setError, triggerRefetch } from '../stores/slices/NewsFeedSlice.ts';
import useFetchFeed from '../hooks/useFetchFeed.tsx';
import NewsFeedElement from './NewsFeedElement.tsx';
import Loader from './Loader.tsx';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';

const NewsFeed = () => {
  const news = useSelector<StoresState, NewsDetails[]>((state) => state.newsFeedStore.newsFeed);
  const error = useSelector<StoresState, unknown>((state) => state.newsFeedStore.error);
  const dispatch = useDispatch();

  useFetchFeed();

  if (error) {
    return (
      <ErrorFallback
        resetButton={
          <StyledFab onClick={() => dispatch(setError(null))}>
            <StyledSpinningLoop />
          </StyledFab>
        }
      />
    );
  }

  if (!news.length) return <Loader />;

  return (
    <Stack gap="18px">
      <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginTop: '4px', marginLeft: 'auto' }}>
        <StyledSpinningLoop />
      </StyledFab>
      <Stack paddingX="4px" gap="16px">
        {news.map((feedItem) => (
          <Stack key={feedItem.id} gap="16px">
            <NewsFeedElement feedItem={feedItem} />
            <Divider />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default NewsFeed;
