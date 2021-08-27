// Axios 二次封装
import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { message } from "antd";
import type { ProAxiosRequestConfig as ProConfig } from "./interface";
import HttpFetchCancelPlugin from "./plugin/fetch_cancel";
import config from "./config";
import LoginUtil from "@/utils/LoginUtil";

class Http {
	private axios = Axios.create();
	private timer: undefined | number = undefined;
	private toastInstance: any;

	public constructor() {
		const { axios } = this;
		this.defaultConfig(axios);

		// 注册拦截器
		this.requestIntercept(axios);
		this.responseIntercept(axios);
	}

	// 注册 plugin
	public use(...pluginList: (new (A: AxiosInstance) => any)[]) {
		pluginList.forEach((Plugin) => {
			// eslint-disable-next-line no-new
			new Plugin(this.axios);
		});
		return this;
	}

	// 注册默认值
	private defaultConfig(axios: AxiosInstance) {
		axios.defaults.timeout = config.TIMEOUT;
		axios.defaults.baseURL = config.BASE_URL;
		axios.defaults.headers = {
			"Content-Type": "application/json;charset=utf-8",
		};
	}

	// 请求拦截器
	private requestIntercept(axios: AxiosInstance) {
		axios.interceptors.request.use(async (requestConfig: AxiosRequestConfig) => {
			const token = LoginUtil.getToken();
			// 有token 时在请求头上加上 token
			if (token) requestConfig.headers[config.TOKEN] = token;
			return requestConfig;
		}, Promise.reject);
	}

	// 响应拦截器 根据项目不同 需要有不同的逻辑
	private responseIntercept(axios: AxiosInstance) {
		axios.interceptors.response.use(
			(response: AxiosResponse<CommonServerData>) => {
				this.log("响应拦截器", response.data);

				const requestConfig = { errorHandle: true, ...response.config } as ProConfig;

				// 当状态码是成功标识
				if (config.HttpSuccess(response)) return response;
				else if (!requestConfig.errorHandle) return response;

				this.errorHandle(response);

				return Promise.reject(response);
			},
			(error: AxiosError) => {
				// this.errorHandle(error.response);
				// this.log("响应拦截器error callback", error);
				// return Promise.reject(error);
				if (!Axios.isCancel(error)) {
					this.log("响应拦截器", error.response?.data);
					// http code !== 200 的错误
					const response = error.response ?? {
						data: { code: error.code!, message: httpErrorMap(error.code!) },
					};
					this.errorHandle(response as AxiosResponse<CommonServerData>);
				}
				return Promise.reject(error);
			}
		);
	}

	// 错误处理函数
	private errorHandle(response?: AxiosResponse<CommonServerData>) {
		// 根据不同的code 处理逻辑
		// if (response?.data.code === 1001) {
		// 	console.log("token 过期了 清除用户登录信息");
		// 	LoginUtil.clearToken();
		// }
		this.errorToast(response?.data);
	}

	// 错误提示
	private errorToast(error?: CommonServerData) {
		window.clearTimeout(this.timer);
		this.toastInstance?.();
		this.timer = window.setTimeout(() => {
			const content = error?.message || "访问出错";
			this.toastInstance = message.error({ key: "error", content });
		}, 300);
	}

	// logger
	private log(title: string, data: any) {
		if (process.env.NODE_ENV === "development") {
			window.console?.group(title);
			window.console?.log(data);
			window.console?.groupEnd();
		}
	}
	// get
	public async get<R = any>(url: string, params?: Object) {
		return (await this.axios.get<R>(url, { params })).data;
	}

	// post
	public async post<R = any>(url: string, data: Object, options?: AxiosRequestConfig) {
		return (await this.axios.post<R>(url, data, options)).data;
	}

	// put
	public async put<R = any>(url: string, data: Object, options?: AxiosRequestConfig) {
		return (await this.axios.put<R>(url, data, options)).data;
	}

	// delete
	public async delete<R = any>(url: string, options?: AxiosRequestConfig) {
		return (await this.axios.delete<R>(url, options)).data;
	}
}

// http code map
function httpErrorMap(httpCode: number | string) {
	const STATUS_MAP = {
		400: "请求错误",
		403: "拒绝访问",
		408: "请求超时",
		500: "服务器内部错误",
		501: "服务未实现",
		502: "系统繁忙，请稍候再试",
		503: "服务不可用",
		504: "网关超时",
		505: "HTTP版本不受支持",
		ECONNABORTED: "请求超时",
	};
	return STATUS_MAP[httpCode];
}

export default new Http().use(HttpFetchCancelPlugin);
