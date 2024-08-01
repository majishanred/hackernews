import axios, { AxiosError, CanceledError } from 'axios';
import { useEffect } from 'react';
import { setError, setIsLoading } from '../stores/slices/ItemDetailsSlice.ts';
import { useDispatch } from 'react-redux';
import { changeItem } from '../stores/slices/ItemDetailsSlice.ts';
import { ItemDetails } from '../types/ItemDetails.ts';
import { useStoresSelector } from './useStoreSelector.ts';

const fetchItem = (id: string, signal: AbortSignal) => {
  return axios<ItemDetails>(`https://api.hnpwa.com/v0/item/${id}.json`, {
    signal,
  });
};

const useFetchItem = (newsId: string, refetchInterval: number) => {
  const dispatch = useDispatch();
  const refetchIndicator = useStoresSelector((state) => state.itemStore.refetchIndicator);
  const error = useStoresSelector((state) => state.itemStore.error);

  useEffect(() => {
    const controller = new AbortController();
    const wrapper = async () => {
      dispatch(setIsLoading(true));
      try {
        const { data: item } = await fetchItem(newsId, controller.signal);
        dispatch(changeItem(item));
        dispatch(setIsLoading(false));
      } catch (e: unknown) {
        if (!(e instanceof CanceledError) && e instanceof AxiosError) {
          dispatch(setError(true));
          dispatch(setIsLoading(false));
        }
      }
    };

    wrapper();

    const intervalId = setInterval(wrapper, refetchInterval);

    return () => {
      controller.abort();
      clearInterval(intervalId);
      dispatch(setIsLoading(true));
    };
  }, [newsId, refetchIndicator, refetchInterval, dispatch, error]);
};

export default useFetchItem;
