import { format } from 'date-fns';

export const formatDate = (date: number) => {
  // @Note: Похоже api считает дату не в милисекундах, а в секундах
  const currentDate = new Date(date * 1000);
  return format(currentDate, 'MM.dd.yyyy');
};
