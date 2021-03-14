import useMethod from "./use-method";

const reducers = {
	on: () => true,
	off: () => false,
	toggle: (value: boolean) => !value,
};

export function useBoolean(init: boolean = false) {
	return useMethod(reducers, init);
}

export function useSwitch(init: boolean = false) {
	const [visible, methods] = useBoolean(init);
	return { visible, ...methods } as const;
}

export function useToggle(init: boolean = false) {
	const [visible, { toggle }] = useBoolean(init);
	return [visible, toggle] as const;
}
