import { useLocation } from 'react-router-dom';
import { useFetchNews } from '../hooks/useFetchNews.ts';
import { changeComment, changeNewsDetails } from '../stores/slices/NewsDetailsSlice.ts';
import { useDispatch } from 'react-redux';
import { PropsWithChildren, useEffect } from 'react';
import { flattenedCommentsTree } from '../utils/utils.ts';
import { NewsDetails } from '../types/NewsDetails.ts';

const NewsRefetcherComponent = ({ children }: PropsWithChildren) => {
  const newsId = useLocation().pathname.slice(1);
  const data = useFetchNews(newsId);
  const dispatch = useDispatch();

  useEffect(() => {
    const newsDetails: NewsDetails = {
      id: data.id,
      title: data.title,
      points: data.points,
      user: data.user,
      time: data.time,
      deleted: data.deleted,
      dead: data.dead,
      url: data.url,
      comments_count: data.comments_count,
    };

    const comments = flattenedCommentsTree(data.comments);
    dispatch(changeComment(comments));
    dispatch(changeNewsDetails(newsDetails));
  }, [data, dispatch]);

  return <>{children}</>;
};

export default NewsRefetcherComponent;
