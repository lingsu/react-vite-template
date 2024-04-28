import { FC, PropsWithChildren, useRef } from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { Provider } from "../../contexts/AndyStoreContext";
import { useBearStore } from "../../store";
import { AppState } from "../../typing";



const ReactAndyProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const storeRef = useRef<UseBoundStore<StoreApi<AppState>> | null>(null);
  
    if (!storeRef.current) {
      storeRef.current = useBearStore;
    }
  
    return <Provider value={storeRef.current as  any}>{children}</Provider>;
  };
  
  ReactAndyProvider.displayName = 'ReactAndyProvider';
  
  export default ReactAndyProvider;
  