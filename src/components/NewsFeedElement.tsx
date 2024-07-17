import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FeedItem } from '../types/FeedItem.ts';
import { formatDate } from '../utils/utils.ts';

type NewsFeedElementProps = {
  feedItem: FeedItem;
};

const NewsFeedElement = ({ feedItem }: NewsFeedElementProps) => {
  const { id, title, time, points, user } = feedItem;
  return (
    <Stack gap="8px" paddingX="16px">
      <Link to={`/${id}`}>
        <Typography variant="h5">{title}</Typography>
      </Link>
      <Box display="flex" gap="16px">
        <span>By: {user ? user : 'No data'}</span>
        <span>Score: {points ? points : 'No data'}</span>
        <span>Published: {formatDate(time)}</span>
      </Box>
    </Stack>
  );
};

export default NewsFeedElement;
