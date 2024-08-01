import { Stack, styled } from '@mui/material';

const StyledCommentaryBlock = styled(Stack)`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing(4)};

  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

export default StyledCommentaryBlock;
