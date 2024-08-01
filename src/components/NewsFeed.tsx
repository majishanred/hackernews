import { Divider, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import ErrorFallback from './ErrorFallback.tsx';
import { StyledFab } from '../styled/StyledFab.tsx';
import { setError, triggerRefetch } from '../stores/slices/NewsFeedSlice.ts';
import NewsFeedElement from './NewsFeedElement.tsx';
import Loader from './Loader.tsx';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';
import useFetchFeed from '../hooks/useFetchFeed.tsx';

const NewsFeed = () => {
  const newsFeed = useStoresSelector((state) => state.newsFeedStore.newsFeed);
  const error = useStoresSelector((state) => state.newsFeedStore.error);
  const isLoading = useStoresSelector((state) => state.newsFeedStore.isLoading);
  const dispatch = useDispatch();

  useFetchFeed(60 * 1000);

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

  if (isLoading) return <Loader />;

  return (
    <Stack gap={2}>
      <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginTop: '4px', marginLeft: 'auto' }}>
        <StyledSpinningLoop />
      </StyledFab>
      <Stack paddingX={1} gap={2}>
        {newsFeed.map((feedItem) => (
          <Stack key={feedItem.id} gap={2}>
            <NewsFeedElement feedItem={feedItem} />
            <Divider />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default NewsFeed;
