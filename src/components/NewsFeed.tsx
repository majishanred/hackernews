import { useQueryClient } from '@tanstack/react-query';
import { useFetchNewsFeed } from '../hooks/useFetchNewsFeed.ts';
import { Button, Divider, Stack } from '@mui/material';
import NewsFeedElement from './NewsFeedElement.tsx';

const NewsFeed = () => {
  const queryClient = useQueryClient();
  const news = useFetchNewsFeed();
  const revalidateListQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ['newsChunk'],
    });
  };
  return (
    <Stack gap="18px">
      <Button onClick={revalidateListQuery}>Reload news</Button>
      {news.map((feedItem) => (
        <Stack key={feedItem.id} gap="16px">
          <NewsFeedElement feedItem={feedItem} />
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};

export default NewsFeed;
