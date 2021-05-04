import { isUndefined } from "@/utils/ValidateType";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export interface ExtensionReducer<S> {
	[key: string]: (state: S, ...args: any[]) => S;
}
type OmitState<T> = T extends (state: any, ...args: infer P) => any ? (...args: P) => void : never;
export type Methods<R extends ExtensionReducer<S>, S> = {
	[K in keyof R]: OmitState<R[K]>;
};

export function useExtendReducer<R extends ExtensionReducer<S>, S>(
	reducers: R,
	setState: Dispatch<SetStateAction<S>>
) {
	const ref = useRef<Methods<R, S> | undefined>(undefined);
	if (isUndefined(ref.current)) {
		ref.current = Object.entries(reducers).reduce((methods, [key, fn]) => {
			const bound = (...args: any[]) => setState((p) => fn(p, ...args));
			Object.assign(methods, { [key]: bound });
			return methods;
		}, {} as Methods<R, S>);
	}
	return ref.current;
}

export default function useMethods<R extends ExtensionReducer<S>, S>(
	reducers: R,
	initialState: S | (() => S)
) {
	const [state, setState] = useState(initialState);
	const methods = useExtendReducer(reducers, setState);
	return [state, methods, setState] as const;
}
// TODO: 模仿 redux/toolkit
export function createReducer() {}
