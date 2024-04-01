import { useEffect } from "react";
import { StoreApi } from "zustand";
import { AndyStore, AppState } from "../../typing";
import { useStoreApi } from "../../hooks/useStore";

type StoreUpdaterProps = Pick<AppState, "api">;
function useDirectStoreUpdater(
  key: keyof AndyStore,
  value: unknown,
  setState: StoreApi<AppState>["setState"]
) {
  useEffect(() => {
    if (typeof value !== "undefined") {
      setState({ [key]: value });
    }
  }, [value]);
}

export default ({ api }: StoreUpdaterProps) => {
  const store = useStoreApi();

  useDirectStoreUpdater("api", api, store.setState);
  // useDirectStoreUpdater("token", token, store.setState);

  return null;
};
