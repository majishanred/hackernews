import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.blue};

  &:visited {
    color: ${({ theme }) => theme.palette.blue};
  }
`;
