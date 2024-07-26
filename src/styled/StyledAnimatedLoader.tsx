import { styled } from '@mui/material';
import { Loop } from '@mui/icons-material';

const StyledAnimatedLoader = styled(Loop)`
  width: 64px;
  height: 64px;
  margin: 12px auto;
  animation-name: logo-spin;
  animation-duration: 5s;
  animation-timing-function: cubic-bezier(0.18, 1.01, 0.88, 0.15);
  animation-delay: 0s;
  animation-iteration-count: infinite;
`;

export default StyledAnimatedLoader;
