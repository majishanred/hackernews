import { Fab, FabProps, styled } from '@mui/material';

export const StyledFab = styled(Fab)<FabProps>`
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: none;
`;
