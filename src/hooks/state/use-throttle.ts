import { useEffect, useMemo, useState } from "react";
import useRefCallback from "./use-ref-callback";

// 节流 函数
// TODO: 添加是否立即执行一次fn
export function throttle<Fn extends Function>(fn: Fn, delay = 100) {
	let timer: null | number = null;
	return function (this: unknown, ...args: any[]) {
		if (timer !== null) return;
		timer = window.setTimeout(() => {
			timer = null;
			fn.apply(this, args);
		}, delay);
	};
}

// 节流 hook
// 为了实时得到最新的callback
export function useThrottleCallback<Fn extends Function>(delay: number, fn: Fn) {
	const callback = useRefCallback(fn as any);
	return useMemo<Fn>(() => throttle(callback, delay) as any, [callback, delay]);
}

// 节流 value
// 可以用来实现 loading delay
export function useThrottleValue<Value = any>(delay = 100, value: Value) {
	// 不能使用 useRef 因为 useRef 视图不会自动变更
	const [state, setState] = useState(value);
	const callback = useThrottleCallback(delay, () => setState(value));
	useEffect(() => {
		callback();
	}, [callback, value]);

	return state;
}
export function useThrottleState<S = undefined>(delay: number, initialState: S | (() => S)) {
	const [state, setState] = useState(initialState);
	const throttledState = useThrottleValue(delay, state);
	return [throttledState, setState] as const;
}
