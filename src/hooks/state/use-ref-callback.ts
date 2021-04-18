import { useCallback, useRef } from "react";

// 使用 ref 获得一个memoized 函数 该函数 引用不会变 但是永远会得到最新的数据
export default function useRefCallback<T extends Function | ArrowFunction>(callback: T): T {
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
}
