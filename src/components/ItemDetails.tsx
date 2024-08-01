import { Box, Divider, Stack } from '@mui/material';
import { formatDate } from '../utils/formatDate.ts';
import { StyledTitle } from '../styled/StyledHeaders.tsx';
import { Commentary } from './Commentary.tsx';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';

export const ItemDetails = () => {
  const itemDetails = useStoresSelector((state) => state.itemStore.itemDetails);

  try {
    const { title, time, url, user, comments_count, comments } = itemDetails!;

    return (
      <>
        <Stack padding={2} gap={1}>
          <Stack gap={1}>
            <StyledTitle variant="h2">{title}</StyledTitle>
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
            <StyledTitle variant="h4">Comments: {comments_count}</StyledTitle>
          </Box>
          <Divider />
          {comments.map((comment) => (
            <Commentary key={comment.id} comment={comment} />
          ))}
        </Stack>
      </>
    );
  } catch (e) {
    return <></>;
  }
};
