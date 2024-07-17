import { useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';
import { Box } from '@mui/material';
import { Commentary } from './Commentary.tsx';

const CommentaryBlock = () => {
  const firstComments = useSelector<StoresState, number[]>((state) => state.newsStore.firstLevelComments);

  return (
    <>
      {firstComments.map((comment) => (
        <Box key={comment}>
          <Commentary commentId={comment} />
        </Box>
      ))}
    </>
  );
};

export default CommentaryBlock;
