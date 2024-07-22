import { Link } from 'react-router-dom';
import { News } from '../components/News.tsx';
import { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setError } from '../stores/slices/NewsDetailsSlice.ts';
import { ArrowBack, Cached } from '@mui/icons-material';
import { StyledFab } from '../styled/StyledFab.tsx';
import { StyledTitle } from '../styled/StyledHeaders.tsx';
import CommentaryBlock from '../components/CommentaryBlock.tsx';
import NewsRefetcher from '../components/NewsRefetcher.tsx';
import { StoresState } from '../stores/Store.ts';
import ErrorFallback from '../components/ErrorFallback.tsx';

const NewsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector<StoresState>((state) => state.newsStore.error);

  useEffect(() => {
    return () => {
      dispatch(resetStore());
    };
  }, [dispatch]);

  if (error)
    return (
      <ErrorFallback
        resetButton={
          <StyledFab onClick={() => dispatch(setError(null))}>
            <Cached />
          </StyledFab>
        }
      />
    );

  return (
    <>
      <Box marginTop="4px" paddingX="4px" display="flex" alignItems="space-between">
        <Link to="/">
          <StyledFab>
            <ArrowBack />
          </StyledFab>
        </Link>
        <NewsRefetcher />
      </Box>
      <News />
      <Stack marginLeft="16px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledTitle variant="h4">Comments:</StyledTitle>
        </Box>
        <CommentaryBlock />
      </Stack>
    </>
  );
};

export default NewsPage;
