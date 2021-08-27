/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import { AxiosResponse } from "axios";

// 接口请求成功判断函数
function HttpSuccess(response: AxiosResponse<CommonServerData>) {
	return !!response.data.success;
}

export default {
	HttpSuccess,
	// 需要重定向的标识
	REDIRECT_CODE: 9999,
	// 请求基地址
	// post 请求过滤空值
	BASE_URL: "http://app.peplife.net/backend",
	TIMEOUT: 20000,
	TOKEN: "X-Access-Token",
};
