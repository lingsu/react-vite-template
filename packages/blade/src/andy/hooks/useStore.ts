import { useContext, useMemo } from "react";
import StoreContext from "../contexts/AndyStoreContext";
import { errorMessages } from "../contants";
import { StoreApi } from "zustand";
import { AppState } from "../typing";

const zustandErrorMessage = errorMessages["error001"]();
type ExtractState = StoreApi<AppState> extends { getState: () => infer T }
  ? T
  : never;

function useStore<StateSlice = ExtractState>(
  selector: (state: AppState) => StateSlice
  // equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(zustandErrorMessage);
  }
  return store(selector);
}

const useStoreApi = () => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(zustandErrorMessage);
  }

  return useMemo(
    () => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
      // destroy: store.destroy,
    }),
    [store]
  );
};
export { useStoreApi, useStore };
