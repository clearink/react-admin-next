import React from "react";
import { SWRConfig } from "swr";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import routes from "@/routes";
import store from "@/store";
import useRenderRoutes from "./useRenderRoutes";
import ErrorBoundary from "../ErrorBoundary";
function App() {
	const element = useRenderRoutes(routes);
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<ConfigProvider locale={zhCN}>
					<SWRConfig value={{ errorRetryCount: 1 }}>
						<Router>
							<Routes>{element}</Routes>
						</Router>
					</SWRConfig>
				</ConfigProvider>
			</Provider>
		</ErrorBoundary>
	);
}

export default App;
