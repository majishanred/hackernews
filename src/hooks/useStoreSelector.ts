import { useSelector } from 'react-redux';
import { StoresState } from '../stores/Store.ts';

export const useStoresSelector = <T>(selector: (state: StoresState) => T) => {
  return useSelector<StoresState, T>(selector);
};
