import Axios, { Canceler, AxiosInstance } from "axios";
import { ProAxiosRequestConfig } from "../interface";

/**
 * 提供请求取消功能
 * 默认的 cancel 只能传入 message:string
 * 在这里处理一下
 * 最好将该 plugin 第一个注册
 * */
export default class FetchCancelPlugin {
	private map = new Map<string, { cancel: Canceler; config: ProAxiosRequestConfig }>();

	public constructor(axios: AxiosInstance) {
		axios.interceptors.request.use((config: ProAxiosRequestConfig) => {
			this.addFetchCancel(config);
			return config;
		});

		axios.interceptors.response.use(undefined, (error) => {
			if (Axios.isCancel(error)) {
				// 提供 config 以供 mask plugin 使用
				error.config = error.message;
				error.message = "request was cancelled";
				return Promise.reject(error);
			}
			return Promise.reject(error);
		});

		// 注册取消
		this.handleClearFetch();
	}

	private addFetchCancel(config: ProAxiosRequestConfig) {
		const { needCancel = true, url, params, data } = config;
		// 不需要取消 或者 选择自行取消
		if (!needCancel || config.cancelToken) return;

		// 唯一标识
		const key = `${url}${JSON.stringify(params)}${JSON.stringify(data)}`;

		config.cancelToken = new Axios.CancelToken((cancel) => {
			this.map.set(key, { cancel, config });
		});
	}

	// 清空需要取消的请求
	private handleClearFetch() {
		// router.beforeEach((to, from, next) => {
		// 	this.map.forEach(({ cancel, config }, key) => {
		// 		if (to.path !== from.path) {
		// 			cancel(config as string);
		// 			this.map.delete(key);
		// 		}
		// 	});
		// 	next();
		// });
	}
}
