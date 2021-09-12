import { useEffect, useMemo, useRef, useState } from "react";
import useMountRef from "./use-mount-ref";
import useRefCallback from "./use-ref-callback";

// 防抖 函数
export function debounce<Fn extends Function | ArrowFunction>(fn: Fn, delay = 100) {
	let timer: null | number = null;
	return function (this: unknown, ...args: any[]) {
		if (timer !== null) clearTimeout(timer);
		timer = window.setTimeout(() => {
			(fn as Function).apply(this, args);
			timer = null;
		}, delay);
	} as Fn;
}
// 防抖 hook
export function useDebounceCallback<Fn extends Function>(delay: number, fn: Fn) {
	const callback = useRefCallback(fn as any);
	return useMemo<Fn>(() => debounce(callback, delay), [callback, delay]);
}

// 防抖 value
export function useDebounceValue<Value = any>(delay: number, value: Value) {
	// 不能使用 useRef 因为 useRef 视图不会自动变更
	const [state, setState] = useState(value);
	// 是否已经被卸载
	const ref = useMountRef();
	const callback = useDebounceCallback(delay, () => {
		if (!ref.current) return value;
		return setState(value);
	});
	useEffect(() => {
		callback();
	}, [callback, value]);
	return state;
}
export function useDebounceState<S = undefined>(delay: number, initialState: S | (() => S)) {
	const [state, setState] = useState(initialState);
	const throttledState = useDebounceValue(delay, state);
	return [throttledState, setState] as const;
}
/**
 * 这个hook尽量少用
 * const [debounceState, setState] = useDebounceState(1000, false)
 */
