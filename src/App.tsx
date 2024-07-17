import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewsFeedPage from './pages/NewsFeedPage.tsx';
import NewsPage from './pages/NewsPage.tsx';
import { StyledPageHeader } from './styled/StyledHeaders.tsx';
import { Provider } from 'react-redux';
import newsDetailsStore from './stores/Store.ts';
import { Divider } from '@mui/material';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '',
    element: <NewsFeedPage />,
  },
  {
    path: ':id',
    element: <NewsPage />,
  },
]);

function App() {
  return (
    <>
      <StyledPageHeader variant="h1">Hacker News</StyledPageHeader>
      <Divider></Divider>
      <QueryClientProvider client={queryClient}>
        <Provider store={newsDetailsStore}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
