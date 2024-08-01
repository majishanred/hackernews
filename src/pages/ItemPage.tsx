import { Link, useParams } from 'react-router-dom';
import { ItemDetails } from '../components/ItemDetails.tsx';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setError, triggerRefetch } from '../stores/slices/ItemDetailsSlice.ts';
import { ArrowBack } from '@mui/icons-material';
import { StyledFab } from '../styled/StyledFab.tsx';
import ErrorFallback from '../components/ErrorFallback.tsx';
import StyledSpinningLoop from '../styled/StyledSpinningLoop.tsx';
import { useStoresSelector } from '../hooks/useStoreSelector.ts';
import Loader from '../components/Loader.tsx';
import useFetchItem from '../hooks/useFetchItem.tsx';

const ItemPage = () => {
  const dispatch = useDispatch();
  const error = useStoresSelector((state) => state.itemStore.error);
  const isLoading = useStoresSelector((state) => state.itemStore.isLoading);
  const { itemId } = useParams();
  if (!itemId) throw new Error('NewsId must be provided');

  useFetchItem(itemId, 1000 * 60);

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

  if (isLoading) return <Loader />;

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
      <ItemDetails />
    </>
  );
};

export default ItemPage;
