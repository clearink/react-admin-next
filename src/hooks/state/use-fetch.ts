import { useMemo } from "react";
import useSWR, { keyInterface } from "swr";
import { ConfigInterface, fetcherFn, responseInterface } from "swr/dist/types";

const REQUEST_KEY_MAP = new Map();

function useFetch<Data = any, Error = any>(
  key: keyInterface,
  fn?: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> {
  const swrKey = useMemo(() => {
    const mapKey = JSON.stringify(key);
    // 如果不存在该mapKey 新增
    if (!REQUEST_KEY_MAP.has(mapKey)) {
      if (process.env.NODE_ENV !== "production")
        console.log("REQUEST_KEY_MAP.size", REQUEST_KEY_MAP.size + 1);
      if (REQUEST_KEY_MAP.size > 1000) REQUEST_KEY_MAP.clear(); // 超过1000个清0
      REQUEST_KEY_MAP.set(mapKey, key);
    }
    return REQUEST_KEY_MAP.get(mapKey); // 只能从map中获取才能保证都是同一个
  }, [key]);

  return useSWR(swrKey, fn, config);
}
export default useFetch;
