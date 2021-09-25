import { useEffect, useRef, useState } from "react";
import useRefCallback from "./use-ref-callback";

export type PromiseStatus = "pending" | "resolved" | "rejected";
export interface LoadingWrapConfig {
	/** 是否立即执行该函数 */
	immediate: boolean;
}
export default function useLoadingWrap<F extends (...args: any[]) => Promise<any>>(
	config: LoadingWrapConfig,
	fn: F
) {
	const { immediate } = config;
	const [type, setType] = useState<PromiseStatus>("pending");
	// 返回值

	const memorized = useRefCallback(fn);
	const ref = useRef(null);
	useEffect(() => {
		if (!immediate) return;
		memorized();
	}, [immediate, memorized]);

	return ref.current;
}
