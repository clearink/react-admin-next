import DevLog from "@/utils/DevLog";
import { useMemo } from "react";
import useSWR, { keyInterface } from "swr";
import { ConfigInterface, fetcherFn, responseInterface } from "swr/dist/types";

const REQUEST_KEY_MAP = new Map();
const MAP_MAX = 1000;

function useFetch<Data = any, Error = any>(
  key: keyInterface,
  fn?: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> {

  // 保证调用相同的 useFetch 只会发送一次请求
  const swrKey = useMemo(() => {
    const mapKey = JSON.stringify(key);
    if (!REQUEST_KEY_MAP.has(mapKey)) {
      DevLog("REQUEST_KEY_MAP.size", REQUEST_KEY_MAP.size + 1);
      if (REQUEST_KEY_MAP.size > MAP_MAX) REQUEST_KEY_MAP.clear(); // 超过1000个清0
      REQUEST_KEY_MAP.set(mapKey, key);
    }
    return REQUEST_KEY_MAP.get(mapKey); // 只能从map中获取才能保证都是同一个
  }, [key]);

  return useSWR(swrKey, fn, config);
}
export default useFetch;
