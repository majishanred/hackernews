import { useDispatch } from 'react-redux';
import { useErrorBoundary } from 'react-error-boundary';
import { useEffect } from 'react';
import { CanceledError } from 'axios';

//@Note: вот это надо типизировать покруче, я знаю что эта штука в Суте есть, но туда за ней лезть не хочу, хочу свою.
export const useFetcher = <T, U extends unknown[]>(
  fetchFunc: (args: U, signal: AbortSignal) => Promise<T>,
  fetchFuncArgs: U,
  refetchInterval: number,
  saveData: any,
  toggleLoading: any,
  refetchIndicator: any,
) => {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const controller = new AbortController();

    const wrapper = async () => {
      dispatch(toggleLoading(true));
      try {
        const data = await fetchFunc(fetchFuncArgs, controller.signal);
        console.log(data);
        dispatch(saveData(data));
        dispatch(toggleLoading(false));
      } catch (error) {
        if (!(error instanceof CanceledError)) {
          showBoundary(error);
        }
      }
    };

    wrapper();

    const intervalId = setInterval(wrapper, refetchInterval);

    return () => {
      clearInterval(intervalId);
      controller.abort();
      dispatch(toggleLoading(false));
    };
  }, [dispatch, fetchFunc, fetchFuncArgs, refetchInterval, saveData, showBoundary, toggleLoading, refetchIndicator]);
};
