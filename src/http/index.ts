// Axios 二次封装
import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { message } from "antd";
import configs from "@/configs";
import LoginUtil from "@/utils/LoginUtil";

class Http {
	private axios = Axios.create();
	private timer: undefined | number = undefined;
	private source = Axios.CancelToken.source();
	private fetchMap = new Map<string, number>();
	// private SAME_REQUEST = "SAME_REQUEST_SHOULD_CANCEL";
	private SAME_REQUEST_MIN_INTERVAL = 100; // 相同请求间隔最小时间

	constructor() {
		const { axios } = this;
		this.defaultConfig(axios);

		// 注册拦截器
		this.requestIntercept(axios);
		this.responseIntercept(axios);
	}

	// 注册默认值
	private defaultConfig(axios: AxiosInstance) {
		axios.defaults.timeout = configs.TIMEOUT;
		axios.defaults.baseURL = configs.BASE_URL;
		axios.defaults.headers = {
			"Content-Type": "application/json;charset=utf-8",
		};
	}

	// 请求拦截器
	private requestIntercept(axios: AxiosInstance) {
		axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
			const token = LoginUtil.getToken();
			// 有token 时在请求头上加上 token
			if (token) config.headers[configs.TOKEN] = token;

			const url = `${config.url}${JSON.stringify(config.params)}${JSON.stringify(config.data)}`;
			const lastTime = this.fetchMap.get(url);
			if (lastTime && lastTime + this.SAME_REQUEST_MIN_INTERVAL > Date.now()) {
				// 需要取消请求
				return Promise.reject(config);
			} else {
				this.fetchMap.set(url, Date.now());
			}

			Object.assign(config, { cancelToken: this.source.token });

			return config;
		}, Promise.reject);
	}

	// 响应logger
	private log(title: string, data: any) {
		console.group(title);
		console.log(data);
		console.groupEnd();
	}

	// 响应拦截器 根据项目不同 需要有不同的逻辑
	private responseIntercept(axios: AxiosInstance) {
		axios.interceptors.response.use(
			async (response: AxiosResponse<CommonServerData>) => {
				this.log("响应拦截器", response);
				// 后台只有返回200才算成功
				if (response.data.code === 200) return response;
				this.errorHandle(response);
				return Promise.reject(response);
			},
			(error: AxiosError) => {
				this.errorHandle(error.response);
				this.log("响应拦截器error callback", error);
				return Promise.reject(error);
			}
		);
	}

	// 错误处理函数
	private errorHandle(response?: AxiosResponse<CommonServerData>) {
		if (response?.data.code === 1001) {
			console.log("token 过期了 清除用户登录信息");
			LoginUtil.clearToken();
		}
		this.errorMessage(response?.data);
	}

	// 错误提示
	private errorMessage(error?: CommonServerData) {
		window.clearTimeout(this.timer);
		// 删除之前的 message.error
		this.timer = window.setTimeout(() => {
			message.error({
				key: "error",
				content: error?.message ? error.message : "访问出错",
			});
		}, 300);
	}

	// 集中处理取消请求逻辑
	private cancelToken(message?: string) {
		this.source.cancel(message);
	}

	// get
	public async get<R = any>(url: string, params?: Object) {
		return await (await this.axios.get<R>(url, { params })).data;
	}

	// post
	public async post<R = any>(url: string, data: Object, options?: AxiosRequestConfig) {
		return await (await this.axios.post<R>(url, data, options)).data;
	}

	// put
	public async put<R = any>(url: string, data: Object, options?: AxiosRequestConfig) {
		return await (await this.axios.put<R>(url, data, options)).data;
	}

	// delete
	public async delete<R = any>(url: string, options?: AxiosRequestConfig) {
		return await (await this.axios.delete<R>(url, options)).data;
	}
}

export default new Http();
