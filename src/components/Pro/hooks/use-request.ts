import useFetch from "@/hooks/state/use-fetch";
import { fetcherFn } from "swr/dist/types";

export const defaultFetcher = () => undefined!;

export default function useRequest<Data = any>(
	params?: string | any[],
	/** 使用 ()=>undefined 防止错误的发送请求 例如没有设置params */
	request: fetcherFn<Data> = defaultFetcher,
	/** 使用 props 传入的数据 */
	useProp = false
) {
	const ret = useFetch(params!, useProp ? defaultFetcher : request, {
		revalidateOnFocus: false,
		dedupingInterval: 3600000, // 缓存数据时间 1h
	});
	if (ret.error) console.error(ret.error.message);
	return ret;
}
