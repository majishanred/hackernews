import { Commentary } from '../types/Commentary.ts';

export const formatDate = (date: number) => {
  // @Note: Похоже api считает дату не в милисекундах, а в секундах
  const currentDate = new Date(date * 1000);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return day + '.' + month + '.' + year;
};

export const flattenedCommentsTree = (commentsTree: Commentary[]) => {
  const flatteredComments: Commentary[] = [];

  commentsTree.forEach((comment) => {
    flatteredComments.push(comment);
    const nestedFlatteredComments = flattenedCommentsTree(comment.comments);
    flatteredComments.push(...nestedFlatteredComments);
  });

  return flatteredComments;
};
