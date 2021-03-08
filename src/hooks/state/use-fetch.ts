import useSWR, { keyInterface } from "swr";
import { ConfigInterface, fetcherFn, responseInterface } from "swr/dist/types";
import useRequestMapMemo from "./use-request-map-memo";

function useFetch<Data = any, Error = any>(
  key: keyInterface,
  fn?: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> {
  const swrKey = useRequestMapMemo(() => key, [key]);
  return useSWR(swrKey, fn, config);
}
export default useFetch;
