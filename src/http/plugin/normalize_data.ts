import { AxiosInstance, AxiosResponse } from "axios";
import { BaseSchema } from "yup";
import { ProAxiosRequestConfig as ProConfig } from "../config";

/**
 * 提供校验返回数据类型的功能
 * */
export default class NormalizeDataPlugin {
	private map = new Map<string, BaseSchema>();

	public constructor(axios: AxiosInstance) {
		axios.interceptors.request.use((config: ProConfig) => {
			this.addNormalizeData(config);
			return config;
		});

		axios.interceptors.response.use((response: AxiosResponse) => {
			const { url, params, data } = response.config;
			const key = `${url}${JSON.stringify(params)}${JSON.stringify(data)}`;
			const schema = this.map.get(key);
			if (schema) {
				const data = schema.cast(response.data, { assert: false });
				return Object.assign(response, { data });
			}
			return response;
		});
	}

	private addNormalizeData(config: ProConfig) {
		const { schema, url, params, data } = config;
		if (schema) {
			const key = `${url}${JSON.stringify(params)}${JSON.stringify(data)}`;
			this.map.set(key, schema);
		}
	}
}

// const getValueType = (value: any) =>
// 	Object.prototype.toString
// 		.call(value)
// 		.replace(/^\[object\s(.*)\]$/g, "$1")
// 		.toLocaleLowerCase();
// function normalizeData(value: any, _: any, schema: any) {
// 	const type = getValueType(value);
// 	if (schema.type === type) return value;
// 	return { object: {}, array: [] }[schema.type];
// }
// console.log(schema.cast({ a: 1 }, { assert: false }));
