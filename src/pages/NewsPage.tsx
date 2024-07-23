import { Link } from 'react-router-dom';
import { News } from '../components/News.tsx';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setError, triggerRefetch } from '../stores/slices/NewsDetailsSlice.ts';
import { ArrowBack } from '@mui/icons-material';
import { StyledFab } from '../styled/StyledFab.tsx';
import { StoresState } from '../stores/Store.ts';
import ErrorFallback from '../components/ErrorFallback.tsx';
import { useEffect } from 'react';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';

const NewsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector<StoresState>((state) => state.newsStore.error);

  useEffect(() => {
    return () => {
      dispatch(resetStore());
    };
  }, []);

  if (error)
    return (
      <ErrorFallback
        resetButton={
          <StyledFab onClick={() => dispatch(setError(null))}>
            <StyledSpinningLoop />
          </StyledFab>
        }
      />
    );

  return (
    <>
      <Box marginTop="4px" paddingX="4px" display="flex" alignItems="space-between">
        <Link to="/">
          <StyledFab>
            <ArrowBack />
          </StyledFab>
        </Link>
        <StyledFab onClick={() => dispatch(triggerRefetch())} sx={{ marginLeft: 'auto' }}>
          <StyledSpinningLoop />
        </StyledFab>
      </Box>
      <News />
    </>
  );
};

export default NewsPage;
