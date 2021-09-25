import React from "react";
import { SWRConfig, Middleware } from "swr";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import routes from "@/routes";
import store from "@/store";
import useRenderRoutes from "./hooks/use-render-routes";
import ErrorBoundary from "../ErrorBoundary";
import { statusColorContainer } from "../Pro/Field/FieldStatus/utils";

// 序列化 key
const serializeParams: Middleware = (next) => {
	return (key, fetcher, config) => {
		const keys = Array.isArray(key) ? JSON.stringify(key) : key;
		return next(keys, fetcher, config);
	};
};

function App() {
	const element = useRenderRoutes(routes);
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<ConfigProvider locale={zhCN}>
					<SWRConfig value={{ errorRetryCount: 0, use: [serializeParams] }}>
						<statusColorContainer.Provider>
							<Router>
								<Routes>{element}</Routes>
							</Router>
						</statusColorContainer.Provider>
					</SWRConfig>
				</ConfigProvider>
			</Provider>
		</ErrorBoundary>
	);
}

export default App;
