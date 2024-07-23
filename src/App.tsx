import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewsFeedPage from './pages/NewsFeedPage.tsx';
import NewsPage from './pages/NewsPage.tsx';
import { StyledPageHeader } from './styled/StyledHeaders.tsx';
import { Provider } from 'react-redux';
import newsDetailsStore from './stores/Store.ts';
import { Divider, Stack } from '@mui/material';

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
      <Stack alignItems="center">
        <StyledPageHeader variant="h1">Hacker News</StyledPageHeader>
      </Stack>
      <Divider />
      <Provider store={newsDetailsStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
