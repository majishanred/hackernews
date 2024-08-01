import { Stack, Typography } from '@mui/material';

type ErrorFallbackProps = {
  resetButton: React.ReactElement;
};

const ErrorFallback = ({ resetButton }: ErrorFallbackProps) => {
  return (
    <Stack alignItems="center" marginTop={3} textAlign="center">
      <Typography variant="body1">
        Похоже, произошла какая-то проблема когда мы пытались загрузить данные.
        <br />
        Чтобы повторить нажмите на кнопку ниже.
      </Typography>
      {resetButton}
    </Stack>
  );
};

export default ErrorFallback;
