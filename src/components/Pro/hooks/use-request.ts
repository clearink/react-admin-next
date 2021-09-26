import useSWR, { Fetcher, SWRResponse, Key } from "swr";

export const defaultFetcher = () => undefined!;

export default function useRequest<Data = any, Error = any>(
	params?: Key,
	/** 使用 ()=>undefined 防止错误的发送请求 例如没有设置params */
	request: Fetcher<Data> = defaultFetcher,
	/** 使用 props 传入的数据 */
	useProp = false
): SWRResponse<Data, Error> {
	const ret = useSWR<Data, Error>(params!, useProp ? defaultFetcher : request, {
		revalidateOnFocus: false,
		dedupingInterval: 1800000, // 缓存数据时间 30min
	});
	if (ret.error) console.error(ret.error);
	return ret;
}
