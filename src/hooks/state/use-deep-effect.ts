import { DependencyList, EffectCallback, useEffect } from "react";
import useDeepMemo from "./use-deep-memo";
import useRefCallback from "./use-ref-callback";
export default function useDeepEffect(callback: EffectCallback, deps: DependencyList): void {
	const deepDeps = useDeepMemo(() => deps, [deps]);
	const ref = useRefCallback(callback);
	useEffect(() => {
		return ref();
	}, [ref, deepDeps]);
}
