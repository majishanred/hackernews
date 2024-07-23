import { Loop } from '@mui/icons-material';
import { styled } from '@mui/material';

const StyledSpinningLoop = styled(Loop)`
  &:hover {
    animation-name: logo-spin;
    animation-duration: 5s;
    animation-timing-function: cubic-bezier(0.18, 1.01, 0.88, 0.15); //cubic-bezier(0.2, 0.88, 0.68, 0.19);
    animation-delay: 0s;
    animation-iteration-count: infinite;
  }
`;

export default StyledSpinningLoop;
