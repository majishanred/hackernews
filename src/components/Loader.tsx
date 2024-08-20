import { styled, Typography } from '@mui/material';
import { StyledLoopAnimation } from '../styled/StyledLoopAnimation.tsx';
import StyledOverlapingContainer from '../styled/StyledOverlapingContainer.ts';

const Loader = () => {
  return (
    <StyledOverlapingContainer>
      <Typography variant="body1" marginX="auto">
        Грузим данные, подождите немного...
      </Typography>
      <StyledAnimatedLoader />
    </StyledOverlapingContainer>
  );
};

const StyledAnimatedLoader = styled(StyledLoopAnimation)`
  width: 64px;
  height: 64px;
  margin: ${({ theme }) => theme.spacing(2, 0, 2, 0)};
  animation-name: logo-spin;
  animation-duration: 5s;
  animation-timing-function: cubic-bezier(0.18, 1.01, 0.88, 0.15);
  animation-delay: 0s;
  animation-iteration-count: infinite;
`;

export default Loader;
