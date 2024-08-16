import { Typography } from '@mui/material';
import { StyledFab } from '../styled/StyledFab.tsx';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';
import { useErrorBoundary } from 'react-error-boundary';
import { useCallback } from 'react';
import StyledOverlapingContainer from '../styled/StyledOverlapingContainer.ts';

const ErrorFallback = () => {
  const { resetBoundary } = useErrorBoundary();

  const resetError = useCallback(() => {
    resetBoundary();
  }, [resetBoundary]);

  return (
    <StyledOverlapingContainer>
      <Typography variant="body1">
        Похоже, произошла какая-то проблема когда мы пытались загрузить данные.
        <br />
        Чтобы повторить нажмите на кнопку ниже.
      </Typography>
      <StyledFab onClick={resetError}>
        <StyledSpinningLoop />
      </StyledFab>
    </StyledOverlapingContainer>
  );
};

export default ErrorFallback;
