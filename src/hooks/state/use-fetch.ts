import { useMemo } from "react";
import useSWR from "swr";
import { ValueKey, Fetcher, SWRResponse, SWRConfiguration } from "swr/dist/types";

const REQUEST = new Map();
const MAX = 1000;
// <Data = any, Error = any>(...args: readonly [Key] | readonly [Key, Fetcher<Data> | null] | readonly [Key, SWRConfiguration<Data, Error> | undefined] | readonly [Key, Fetcher<Data> | null, SWRConfiguration<Data, Error> | undefined]) => SWRResponse<Data, Error>;

function useFetch<Data = any, Error = any>(
	key: ValueKey,
	fn: Fetcher<Data> | null = null,
	config?: SWRConfiguration<Data, Error>
): SWRResponse<Data, Error> {
	// 保证调用相同的 useFetch 只会发送一次请求
	const swrKey = useMemo(() => {
		const mapKey = JSON.stringify(key);
		if (!REQUEST.has(mapKey)) {
			if (REQUEST.size > MAX) REQUEST.clear(); // 超过1000个清0
			REQUEST.set(mapKey, key);
		}
		return REQUEST.get(mapKey); // 只能从map中获取才能保证都是同一个
	}, [key]);
	return useSWR<Data, Error>(swrKey, fn, config);
}
export default useFetch;
