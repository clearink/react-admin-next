import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import routes from "@/routes";
import useRenderRoutes from "./useRenderRoutes";
import ErrorBoundary from "../ErrorBoundary";
import { SWRConfig } from "swr";
function App() {
  const element = useRenderRoutes(routes);
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <SWRConfig value={{ errorRetryCount: 1 }}>
          <Router>
            <Routes>{element}</Routes>
          </Router>
        </SWRConfig>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
