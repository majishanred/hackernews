import { Divider, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { Commentary as CommentType } from '../types/Commentary.ts';

type CommentaryProps = {
  comment: CommentType;
};

export const Commentary = ({ comment }: CommentaryProps) => {
  const [expanded, setExpanded] = useState(false);

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
    <Stack onClick={() => setExpanded(true)} paddingY="8px" paddingX="8px">
      <Stack gap="16px">
        <span>By: {comment.user}</span>
        <div ref={commentContentRef}></div>
      </Stack>
      <Divider sx={{ marginTop: '8px' }} />
      <Stack marginLeft="12px">
        {expanded && comment.comments.map((elem) => <Commentary key={elem.id} comment={elem} />)}
      </Stack>
      {!!comment.comments.length && <Divider />}
    </Stack>
  );
};
