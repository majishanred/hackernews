import NewsFeed from '../components/NewsFeed.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback.tsx';

const NewsFeedPage = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <NewsFeed></NewsFeed>
    </ErrorBoundary>
  );
};

export default NewsFeedPage;
