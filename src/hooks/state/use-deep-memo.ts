import { DependencyList, useRef } from "react";
import { dequal } from "dequal";
export default function useDeepMemo<T = any>(callback: () => T, deps: DependencyList): T {
	const preDeps = useRef(deps);
	const preState = useRef(callback());
	if (dequal(preDeps.current, deps)) return preState.current;
	preState.current = callback();
	preDeps.current = deps;
	return preState.current;
}
