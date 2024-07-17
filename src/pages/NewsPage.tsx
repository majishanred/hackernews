import { Link, useLocation } from 'react-router-dom';
import { News } from '../components/News.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useCallback, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { Commentary } from '../components/Commentary.tsx';
import NewsRefetcherProvider from '../components/NewsRefetcher.tsx';
import { resetStore } from '../stores/slices/NewsDetailsSlice.ts';
import { ArrowBack, Cached } from '@mui/icons-material';
import { StyledFab } from '../styled/StyledFab.tsx';
import { StyledTitle } from '../styled/StyledHeaders.tsx';
import CommentaryBlock from '../components/CommentaryBlock.tsx';

const NewsPage = () => {
  const queryClient = useQueryClient();
  const newsId = useLocation().pathname.slice(1);
  const dispatch = useDispatch();
  const revalidateQuery = useCallback(async () => {
    queryClient.invalidateQueries({
      queryKey: ['news', newsId],
    });
  }, [newsId, queryClient]);

  useEffect(() => {
    return () => {
      dispatch(resetStore());
    };
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <Stack marginLeft="16px" marginTop="16px">
          Грузим данные новости
        </Stack>
      }
    >
      <NewsRefetcherProvider>
        <Box marginTop="4px" marginLeft="4px">
          <Link to="/">
            <StyledFab>
              <ArrowBack />
            </StyledFab>
          </Link>
        </Box>
        <News />
        <Stack marginLeft="16px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledTitle variant="h4">Comments:</StyledTitle>
            <StyledFab onClick={revalidateQuery}>
              <Cached />
            </StyledFab>
          </Box>
          <CommentaryBlock />
        </Stack>
      </NewsRefetcherProvider>
    </Suspense>
  );
};

export default NewsPage;
