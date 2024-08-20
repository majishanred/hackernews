import { Divider, Stack, styled, Typography } from '@mui/material';

const Header = () => {
  return (
    <StyledHeader>
      <Stack alignItems="center">
        <Typography variant="h2">Hacker News</Typography>
      </Stack>
      <Divider />
    </StyledHeader>
  );
};

const StyledHeader = styled(Stack)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
`;

export default Header;
