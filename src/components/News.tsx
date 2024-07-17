import { Stack } from '@mui/material';
import { formatDate } from '../utils/utils.ts';
import { useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { NewsDetails } from '../types/NewsDetails.ts';
import { StyledTitle } from '../styled/StyledHeaders.tsx';

export const News = () => {
  const data = useSelector<StoresState, NewsDetails | null>((state) => state.newsStore.newsDetails);

  if (!data)
    return (
      <Stack marginLeft="16px" marginTop="16px" marginBottom="16px">
        Грузим данные новости
      </Stack>
    );

  const { title, url, user, time, comments_count } = data;

  return (
    <Stack padding="16px" gap="8px">
      <Stack gap="8px">
        <StyledTitle variant="h2">{title}</StyledTitle>
        <span>Date published: {formatDate(time)}</span>
        <span>
          News original: <a href={url && url}>{url ? url : 'No data provided'}</a>
        </span>
      </Stack>
      <Stack>
        <span>By: {user ? user : 'No data provided'}</span>
      </Stack>
      <Stack gap="8px">
        <span>Total comments: {comments_count}</span>
      </Stack>
    </Stack>
  );
};
