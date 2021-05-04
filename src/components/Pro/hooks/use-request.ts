import useFetch from "@/hooks/state/use-fetch";
import { fetcherFn } from "swr/dist/types";

export const defaultFetcher = () => Promise.resolve(null);

export default function useRequest<Data = any>(params: string | any[], request?: fetcherFn<Data>) {
	const ret = useFetch(params, request, {
		revalidateOnFocus: false,
		dedupingInterval: 3600000, // 缓存数据时间 1h
	});
	if (ret.error) console.error(ret.error.message);
	return ret;
}
