import { Divider, Stack } from '@mui/material';
import { useCallback } from 'react';
import { Commentary as CommentType } from '../types/Commentary.ts';
import DOMPurify from 'dompurify';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';
import { useDispatch } from 'react-redux';
import { expandComment } from '../stores/slices/ItemDetailsSlice.ts';

type CommentaryProps = {
  comment: CommentType;
};

export const Commentary = ({ comment }: CommentaryProps) => {
  const expanded = useStoresSelector((state) => state.itemStore.expandedComments.includes(comment.id));

  const commentContentRef = useCallback(
    (element: HTMLDivElement) => {
      if (element) element.innerHTML = DOMPurify.sanitize(comment.content);
    },
    [comment.content],
  );

  const dispatch = useDispatch();

  if (comment.deleted || comment.dead)
    return (
      <Stack padding={1}>
        Извините, комментарий удален
        <Divider sx={{ mt: 1 }} />
      </Stack>
    );

  return (
    <Stack onClick={() => dispatch(expandComment(comment))} padding={1}>
      <Stack gap={2}>
        <span>By: {comment.user}</span>
        <div ref={commentContentRef}></div>
      </Stack>
      <Divider sx={{ mt: 1 }} />
      <Stack marginLeft={2}>
        {expanded && comment.comments.map((elem) => <Commentary key={elem.id} comment={elem} />)}
      </Stack>
      {comment.level == 0 && <Divider />}
    </Stack>
  );
};
