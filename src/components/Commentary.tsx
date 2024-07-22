import { Box, Divider, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoredCommentary } from '../stores/slices/NewsDetailsSlice.ts';
import { StoresState } from '../stores/Store.ts';

type CommentaryProps = {
  commentId: number;
};

export const Commentary = ({ commentId }: CommentaryProps) => {
  const comment = useSelector<StoresState, StoredCommentary>((state) => state.newsStore.comments[commentId]);
  const [showChildren, setShowChildren] = useState(false);
  const commentContentRef = useCallback(
    (element: HTMLDivElement) => {
      if (element) element.innerHTML = comment.content;
    },
    [comment.content],
  );

  if (comment.deleted || comment.dead)
    return (
      <Stack paddingY="8px" paddingX="8px">
        Извините, комментарий удален
        <Divider sx={{ marginTop: '8px' }} />
      </Stack>
    );

  return (
    <Stack onClick={() => setShowChildren(true)} paddingY="8px" paddingX="8px">
      <Box>
        <span>By: {comment.user}</span>
        <div ref={commentContentRef}></div>
      </Box>
      <Divider />
      <Stack marginLeft="12px">
        {showChildren &&
          comment.comments.map((elem) => (
            <Box key={elem}>
              <Commentary commentId={elem} />
            </Box>
          ))}
      </Stack>
      {!!comment.comments.length && <Divider />}
    </Stack>
  );
};
