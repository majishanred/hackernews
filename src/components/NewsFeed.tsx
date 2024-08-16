import { Divider, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { StyledFab } from '../styled/StyledFab.tsx';
import { changeNewsFeed, setIsLoading, triggerRefetch } from '../stores/slices/NewsFeedSlice.ts';
import NewsFeedElement from './NewsFeedElement.tsx';
import Loader from './Loader.tsx';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';
import axios from 'axios';
import { FeedItem } from '../types/FeedItem.ts';
import { useFetcher } from '../hooks/useFetch.ts';
import { useMemo } from 'react';

const fetchFeed = async (_args: unknown[], signal: AbortSignal) => {
  const feedData = await Promise.all(
    [1, 2, 3, 4].map((page) => axios<FeedItem[]>(`https://api.hnpwa.com/v0/newest/${page}.json`), {
      signal,
    }),
  );
  return feedData
    .map((element) => element.data)
    .flat()
    .slice(0, 100);
};

const NewsFeed = () => {
  const newsFeed = useStoresSelector((state) => state.newsFeedStore.newsFeed);
  const isLoading = useStoresSelector((state) => state.newsFeedStore.isLoading);
  const refetchIndicator = useStoresSelector((state) => state.newsFeedStore.refetchIndicator);

  const dispatch = useDispatch();

  const refetchIntereval = useMemo(() => 1000 * 60, []);
  const fetchFuncArguments = useMemo(() => [], []);

  useFetcher(fetchFeed, fetchFuncArguments, refetchIntereval, changeNewsFeed, setIsLoading, refetchIndicator);

  return (
    <Stack gap={2}>
      {isLoading && <Loader />}
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
