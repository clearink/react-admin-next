import { AxiosRequestConfig } from "axios";

export interface CommonServerData<T = any> {
	message?: string;
	msg?: string;
	data: T;
	code: number | string;
}

export interface ProAxiosRequestConfig extends AxiosRequestConfig {
	/** loading 遮罩 */
	// mask?: HTMLElement;
	/** 路由改变时取消请求 默认true */
	needCancel?: boolean;
	/** 是否需要调用 qs 格式化参数 */
	// stringify?: boolean;
	/** 是否需要执行 预设的 errorHandle 函数 默认为true */
	errorHandle?: boolean;
}
