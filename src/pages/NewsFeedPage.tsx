import NewsFeed from '../components/NewsFeed.tsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeNewsFeed } from '../stores/slices/NewsFeedSlice.ts';

const NewsFeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeNewsFeed([]));
    };
  }, [dispatch]);

  return <NewsFeed />;
};

export default NewsFeedPage;
