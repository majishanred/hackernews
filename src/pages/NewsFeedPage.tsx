import NewsFeed from '../components/NewsFeed.tsx';
import { Suspense } from 'react';
import { Stack } from '@mui/material';

const NewsFeedPage = () => {
  return (
    <Suspense
      fallback={
        <Stack marginLeft="16px" marginTop="16px" marginBottom="16px">
          Грузим новости
        </Stack>
      }
    >
      <NewsFeed />
    </Suspense>
  );
};

export default NewsFeedPage;
