import { lazy, Suspense } from "react";

import ReactDOM from 'react-dom/client'
import './index.css'
import ReactAndy from "./andy/components/ReactAndy/index.tsx";

const Router = lazy(() => import("./router.tsx"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div>加载中...</div>
        </div>
      }
    >
      <Router />
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactAndy
  // api={{
  //   default: (url: string, init?: RequestOption) => request(url, {baseUrl : import.meta.env.VITE_API_BASE_URL, ...init}) ,
  //   blade: (url: string, init?: RequestOption) => requestBlade(url, {baseUrl : import.meta.env.VITE_BLADE_API_BASE_URL, ...init}),
  // }}
  >
    <App />
  </ReactAndy>
)
