import { styled } from '@mui/material';
import { Loop } from '@mui/icons-material';

export const StyledLoopAnimation = styled(Loop)`
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-360deg);
    }
  }
`;
