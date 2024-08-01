import { Stack, Typography } from '@mui/material';
import StyledAnimatedLoader from '../styled/StyledAnimatedLoader.tsx';

const Loader = () => {
  return (
    <Stack textAlign="center" marginY={3}>
      <Typography variant="body1" marginX="auto">
        Грузим данные, подождите немного...
      </Typography>
      <StyledAnimatedLoader />
    </Stack>
  );
};

export default Loader;
