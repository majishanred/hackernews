import { styled, Typography } from '@mui/material';

export const StyledPageHeader = styled(Typography)`
  ${({ theme }) => theme.typography.h2}
`;

export const StyledTitle = styled(Typography)`
  ${({ theme }) => theme.typography.h4}
`;
