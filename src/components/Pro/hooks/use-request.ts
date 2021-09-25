import useSWR, { Middleware, Fetcher, SWRResponse, Key } from "swr";

export const defaultFetcher = () => undefined!;

// 序列化key
const serializeParams: Middleware = (next) => {
	return (key, fetcher, config) => {
		const keys = Array.isArray(key) ? JSON.stringify(key) : key;
		return next(keys, fetcher, config);
	};
};

export default function useRequest<Data = any, Error = any>(
	params?: Key,
	/** 使用 ()=>undefined 防止错误的发送请求 例如没有设置params */
	request: Fetcher<Data> = defaultFetcher,
	/** 使用 props 传入的数据 */
	useProp = false
): SWRResponse<Data, Error> {
	const ret = useSWR<Data, Error>(params!, useProp ? defaultFetcher : request, {
		revalidateOnFocus: false,
		dedupingInterval: 3600000, // 缓存数据时间 1h
		use: [serializeParams],
	});
	if (ret.error) console.error(ret.error);
	return ret;
}
