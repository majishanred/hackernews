import { ItemDetails } from '../components/ItemDetails.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback.tsx';

const ItemPage = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ItemDetails />
    </ErrorBoundary>
  );
};

export default ItemPage;
