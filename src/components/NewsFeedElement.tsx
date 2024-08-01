import { Box, Stack, Typography } from '@mui/material';
import { formatDate } from '../utils/formatDate.ts';
import { FeedItem } from '../types/FeedItem.ts';
import { StyledLink } from '../styled/StyledLink.ts';

type NewsFeedElementProps = {
  feedItem: FeedItem;
};

const NewsFeedElement = ({ feedItem }: NewsFeedElementProps) => {
  const { id, title, time, points, user } = feedItem;
  return (
    <Stack gap={1} paddingX={2}>
      <StyledLink to={`/${id}`}>
        <Typography variant="h5">{title}</Typography>
      </StyledLink>
      <Box display="flex" gap={2}>
        <span>By: {user ? user : 'No data'}</span>
        <span>Score: {points ? points : 'No data'}</span>
        <span>Published: {formatDate(time)}</span>
      </Box>
    </Stack>
  );
};

export default NewsFeedElement;
