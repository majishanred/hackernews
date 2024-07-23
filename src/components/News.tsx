import { Box, Divider, Stack } from '@mui/material';
import { formatDate } from '../utils/utils.ts';
import { useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { NewsDetails } from '../types/NewsDetails.ts';
import { StyledTitle } from '../styled/StyledHeaders.tsx';
import { Commentary } from './Commentary.tsx';
import useFetchNews from '../hooks/useFetchNews.tsx';
import { useParams } from 'react-router-dom';
import Loader from './Loader.tsx';

export const News = () => {
  const newsId = useParams().id;
  if (!newsId) throw 'News id must be provided';

  useFetchNews(newsId);

  const data = useSelector<StoresState, NewsDetails | null>((state) => state.newsStore.newsDetails);

  if (!data) return <Loader />;

  const { title, url, user, time, comments_count, comments } = data;

  return (
    <>
      <Stack padding="16px" gap="8px">
        <Stack gap="8px">
          <StyledTitle variant="h2">{title}</StyledTitle>
          <span>Date published: {formatDate(time)}</span>
          <span>
            News original: <a href={url && url}>{url ? url : 'No data provided'}</a>
          </span>
          <span>By: {user ? user : 'No data provided'}</span>
        </Stack>
      </Stack>
      <Stack paddingX="16px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledTitle variant="h4">Comments: {comments_count}</StyledTitle>
        </Box>
        <Divider />
        {comments.map((comment) => (
          <Commentary key={comment.id} comment={comment} />
        ))}
      </Stack>
    </>
  );
};
