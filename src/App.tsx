import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewsFeedPage from './pages/NewsFeedPage.tsx';
import ItemPage from './pages/ItemPage.tsx';
import { Provider } from 'react-redux';
import { newsStore } from './stores/Store.ts';
import { Stack } from '@mui/material';
import Header from './components/Header.tsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <NewsFeedPage />,
  },
  {
    path: ':itemId',
    element: <ItemPage />,
  },
]);

function App() {
  return (
    <Stack>
      <Header />
      <Provider store={newsStore}>
        <RouterProvider router={router} />
      </Provider>
    </Stack>
  );
}

export default App;
