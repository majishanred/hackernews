import { Divider, Stack, Typography } from '@mui/material';
import NewsFeedElement from './NewsFeedElement.tsx';
import NewsFeedRefetcher from './NewsFeedRefetcher.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { NewsDetails } from '../types/NewsDetails.ts';
import ErrorFallback from './ErrorFallback.tsx';
import { StyledFab } from '../styled/StyledFab.tsx';
import { Cached } from '@mui/icons-material';
import { setError, triggerRefetch } from '../stores/slices/NewsFeedSlice.ts';

const NewsFeed = () => {
  const news = useSelector<StoresState, NewsDetails[]>((state) => state.newsFeedStore.newsFeed);
  const error = useSelector<StoresState, unknown>((state) => state.newsFeedStore.error);
  const dispatch = useDispatch();

  if (error) {
    return (
      <ErrorFallback
        resetButton={
          <StyledFab onClick={() => dispatch(setError(null))}>
            <Cached />
          </StyledFab>
        }
      />
    );
  }

  return (
    <Stack gap="18px">
      <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginTop: '4px', marginLeft: 'auto' }}>
        <Cached />
      </StyledFab>
      <NewsFeedRefetcher>
        {!news.length && (
          <Stack>
            <Typography variant="body1">Грузим новости</Typography>
          </Stack>
        )}
        {news.map((feedItem) => (
          <Stack key={feedItem.id} gap="16px">
            <NewsFeedElement feedItem={feedItem} />
            <Divider />
          </Stack>
        ))}
      </NewsFeedRefetcher>
    </Stack>
  );
};

export default NewsFeed;
