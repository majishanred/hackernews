import { Box, Divider, Stack, Typography } from '@mui/material';
import { formatDate } from '../utils/formatDate.ts';
import { Commentary } from './Commentary.tsx';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';
import Loader from './Loader.tsx';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFetcher } from '../hooks/useFetch.ts';
import { changeItem, setIsLoading, triggerRefetch } from '../stores/slices/ItemDetailsSlice.ts';
import { ItemDetails as ItemDetailsType } from '../types/ItemDetails.ts';
import { useCallback, useMemo } from 'react';
import { StyledFab } from '../styled/StyledFab.tsx';
import { ArrowBack } from '@mui/icons-material';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';
import { useDispatch } from 'react-redux';

const fetchItem = async (args: [string], signal: AbortSignal) => {
  const { data: itemData } = await axios<ItemDetailsType>(`https://api.hnpwa.com/v0/item/${args[0]}.json`, {
    signal,
  });

  return itemData;
};

export const ItemDetails = () => {
  const { itemId } = useParams();

  if (!itemId) throw new Error('NewsId must be provided');

  const itemDetails = useStoresSelector((state) => state.itemStore.itemDetails);
  const isLoading = useStoresSelector((state) => state.itemStore.isLoading);
  const refetchIndicator = useStoresSelector((state) => state.itemStore.refetchIndicator);

  const refetchIntereval = useMemo(() => 1000 * 60, []);
  const fetchFuncArguments: [string] = useMemo(() => [itemId], [itemId]);

  const dispatch = useDispatch();

  const onRefetchClick = useCallback(() => {
    dispatch(triggerRefetch());
  }, [dispatch]);

  useFetcher(fetchItem, fetchFuncArguments, refetchIntereval, changeItem, setIsLoading, refetchIndicator);

  const { title, time, url, user, comments_count, comments } = itemDetails;

  return (
    <Stack>
      {isLoading && <Loader />}
      <Box marginTop="4px" paddingX="4px" display="flex" alignItems="space-between">
        <Link to="/">
          <StyledFab>
            <ArrowBack />
          </StyledFab>
        </Link>
        <StyledFab onClick={onRefetchClick} sx={{ marginLeft: 'auto' }} disabled={isLoading}>
          <StyledSpinningLoop />
        </StyledFab>
      </Box>
      <Stack padding={2} gap={1}>
        <Stack gap={1}>
          <Typography variant="h4">{title}</Typography>
          <span>Date published: {formatDate(time)}</span>
          <span>
            News original:{' '}
            <a href={url && url} target="_blank" rel="noreferrer">
              {url ? url : 'No data provided'}
            </a>
          </span>
          <span>By: {user ? user : 'No data provided'}</span>
        </Stack>
      </Stack>
      <Stack paddingX={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Comments: {comments_count}</Typography>
        </Box>
        <Divider />
        {comments.map((comment) => (
          <Commentary key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Stack>
  );
};
