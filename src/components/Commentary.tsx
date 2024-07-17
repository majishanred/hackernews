import { Box, Divider, Stack } from '@mui/material';
import { createRef, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoredCommentary } from '../stores/slices/NewsDetailsSlice.ts';
import { StoresState } from '../stores/Store.ts';

type CommentaryProps = {
  commentId: number;
};

export const Commentary = memo(function WrappedCommentary({ commentId }: CommentaryProps) {
  const [showChildren, setShowChildren] = useState(false);
  const comment = useSelector<StoresState, StoredCommentary>((state) => state.newsStore.comments[commentId]);
  const commentContentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (commentContentRef.current) commentContentRef.current.innerHTML = comment.content;
  }, [comment.content, commentContentRef]);

  if (!comment) return <Stack>Грузим</Stack>;
  if (comment.deleted || comment.dead)
    return (
      <Stack marginLeft="12px" paddingY="8px" paddingX="16px">
        Извините, комментарий удален
        <Divider sx={{ marginTop: '8px' }} />
      </Stack>
    );

  return (
    <Stack onClick={() => setShowChildren(true)} marginLeft="12px" paddingY="8px" paddingX="16px">
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
      {comment.comments.length > 0 && <Divider />}
    </Stack>
  );
});
