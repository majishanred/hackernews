import { Stack, styled } from '@mui/material';

const StyledOverlapingContainer = styled(Stack)`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: ${({ theme }) => theme.zIndex.modal};
  align-items: center;
  justify-content: center;
`;

export default StyledOverlapingContainer;
