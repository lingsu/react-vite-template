import { PropsWithChildren } from "react";
import Wrapper from "./Wrapper";
// import StoreUpdater from "../StoreUpdater";
import { SWRConfig } from "swr";
import ErrorBoundary from "../ErrorBoundary";

export default ({
  children,
}: PropsWithChildren<{ api?: Record<string,string> }>) => {
  return (
    <ErrorBoundary>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <div>
          <Wrapper>
            {/* <StoreUpdater /> */}
            {children}
          </Wrapper>
        </div>
      </SWRConfig>
    </ErrorBoundary>
  );
};
