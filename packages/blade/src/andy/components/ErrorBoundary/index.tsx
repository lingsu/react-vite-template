import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
} from "react-error-boundary";
import { Button, Result, message } from "antd";
import { ErrorInfo } from "react";
import { SWRConfig } from "swr";
import { Navigate } from "react-router-dom";

const ErrorBoundaryHandle = (props: React.PropsWithChildren<any>) => {
  const { showBoundary } = useErrorBoundary();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404 && error.status !== 500) {
            // 我们可以把错误发送给 Sentry，
            // 或显示一个通知 UI。
            message.error(error.message)
          }else{
            showBoundary(error);
          }
        },
      }}
    >
      {props.children}
    </SWRConfig>
  );
};
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  let subTitle = "";

  if (error.name === "ApiError") {
    if (error.status == 401) {
      return <Navigate to="/login" replace={true} />
    }
    subTitle = (error as any).info?.msg;
  }
  
  return (
    <Result
      status="error"
      title={error.message}
      subTitle={subTitle}
      extra={<Button onClick={() => resetErrorBoundary()}>重试</Button>}
    />
  );
}
const logError = (error: Error, info: ErrorInfo) => {
  // Do something with the error, e.g. log to an external API
  console.log("logError", error, info);
};

export default (props: {resetKeys: any[]} & React.PropsWithChildren<any>) => {
  return (
    <ErrorBoundary
      resetKeys={props.resetKeys}
      FallbackComponent={ErrorFallback}
      onError={logError}
    >
      <ErrorBoundaryHandle>{props.children}</ErrorBoundaryHandle>
    </ErrorBoundary>
  );
};
