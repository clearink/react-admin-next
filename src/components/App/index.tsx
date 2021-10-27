import React from "react";
import { Middleware, SWRConfig } from "swr";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import dayjs from 'dayjs';
import routes from "@/routes";
import store from "@/store";
import useRenderRoutes from "./hooks/use-render-routes";
import ErrorBoundary from "../ErrorBoundary";
import { statusColorContainer } from "../Pro/Field/FieldStatus/utils";
dayjs.locale('zh-cn')

const serialize: Middleware = (useSWRNext) => {
	return (key, fetcher, config) => {
		// 序列化 key。
		const serializedKey = Array.isArray(key) ? JSON.stringify(key) : key;

		// 传递序列化的 key，并在 fetcher 中将其反序列化。
		return useSWRNext(serializedKey, (k) => fetcher!(...JSON.parse(k)), config);
	};
};

function App() {
	const element = useRenderRoutes(routes);
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<ConfigProvider locale={zhCN}>
					<SWRConfig value={{ errorRetryCount: 0, use: [serialize] }}>
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
