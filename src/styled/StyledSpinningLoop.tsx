import { styled } from '@mui/material';
import { StyledLoopAnimation } from './StyledLoopAnimation.tsx';

const StyledSpinningLoop = styled(StyledLoopAnimation)`
  &:hover {
    animation-name: logo-spin;
    animation-duration: 5s;
    animation-timing-function: cubic-bezier(0.18, 1.01, 0.88, 0.15);
    animation-delay: 0s;
    animation-iteration-count: infinite;
  }
`;

export default StyledSpinningLoop;
