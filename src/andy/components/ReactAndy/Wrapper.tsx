import { FC, PropsWithChildren, useContext } from "react";
import StoreContext from "../../contexts/AndyStoreContext";
import ReactAndyProvider from "../ReactAndyProvider";


const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const isWrapped = useContext(StoreContext);
  
    if (isWrapped) {
      return <>{children}</>;
    }
  
    return <ReactAndyProvider>{children}</ReactAndyProvider>;
  };
  
  Wrapper.displayName = 'ReactAndyProvider';
  
  export default Wrapper;
  