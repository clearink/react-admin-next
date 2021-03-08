import { isUndefined } from "../../utils/ValidateType";
import { DependencyList, useRef } from "react";
import { dequal } from "dequal";
// import { REQUEST_KEY_MAP } from "@/http";

const REQUEST_KEY_MAP = new Map();
// 为了适配 useSwr
export default function useRequestMapMemo<T = any>(
  callback: () => T,
  deps: DependencyList
): T {
  const preDeps = useRef(deps);
  const preState = useRef(callback());
  if (dequal(preDeps.current, deps)) {
    // 两次依赖相同 说明要从 map 中获取数据
    const key = JSON.stringify(deps);
    const value = REQUEST_KEY_MAP.get(key);
    if (isUndefined(value)) REQUEST_KEY_MAP.set(key, preState.current);
    return REQUEST_KEY_MAP.get(key); // 只能从map中获取
  }

  preState.current = callback();
  preDeps.current = deps;
  REQUEST_KEY_MAP.set(JSON.stringify(deps), preState.current);
  return preState.current;
}
