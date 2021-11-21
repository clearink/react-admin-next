/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import { AxiosResponse, AxiosRequestConfig } from "axios";
import { BaseSchema } from "yup";
export interface CommonServerData<T = any> {
	message?: string;
	msg?: string;
	data: T;
	code: number | string;
}

export interface ProAxiosRequestConfig extends AxiosRequestConfig {
	/** 路由改变时取消请求 默认true */
	needCancel?: boolean;

	/** 是否需要执行 预设的 errorHandle 函数 默认为true */
	errorHandle?: boolean;

	/** 类型校验 使用 yup */
	schema?: BaseSchema;
}

export default {
	// 接口请求成功判断函数
	HttpSuccess: (response: AxiosResponse<CommonServerData>) => response.data.code === 0,
	// 请求基地址
	BASE_URL: "http://localhost:4000",
	TIME_OUT: 20000,
};
