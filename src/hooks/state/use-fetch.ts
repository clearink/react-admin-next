import { dequal } from "dequal";
import { useEffect, useRef } from "react";
import useSWR, { keyInterface } from "swr";
import { ConfigInterface, fetcherFn, responseInterface } from "swr/dist/types";
import useDeepMemo from "./use-deep-memo";
// declare function useSWR<Data = any, Error = any>(key: keyInterface, fn?: fetcherFn<Data>, config?: ConfigInterface<Data, Error>): responseInterface<Data, Error>;
function useFetch<Data = any, Error = any>(
  key: keyInterface,
  fn?: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> {
  const swrKey = useDeepMemo(() => key, [key]); // 深比较 key 是否改变
  return useSWR(swrKey, fn, config);
}
export default useFetch;
