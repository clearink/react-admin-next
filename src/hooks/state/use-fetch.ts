import useSWR, { Middleware } from "swr";
import { ValueKey, Fetcher, SWRResponse, SWRConfiguration } from "swr/dist/types";

// 序列化key
const serializeParams: Middleware = (next) => {
	return (key, fetcher, config) => {
		const keys = Array.isArray(key) ? JSON.stringify(key) : key;
		return next(keys, fetcher, config);
	};
};
/** @deprecated 已弃用 可配置 middleware  */
function useFetch<Data = any, Error = any>(
	key: ValueKey,
	fn: Fetcher<Data> | null = null,
	config?: SWRConfiguration<Data, Error>
): SWRResponse<Data, Error> {
	return useSWR<Data, Error>(key, fn, { ...config, use: [serializeParams, ...config?.use!] });
}
export default useFetch;
