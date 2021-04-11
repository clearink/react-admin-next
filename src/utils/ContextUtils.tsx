import React, { ReactNode, useContext } from "react";

export function CreateServiceContext<T = any>(useHook: (...args: any[]) => T, defaultValue?: T) {
	return React.createContext(defaultValue as T);
}
interface ProviderProps<S = any> {
	children?: ReactNode;
	initialState?: S;
}
function createContainer<Return = any>(useHook: (...args: any[]) => Return) {
	const Context = CreateServiceContext(useHook);

	function Provider(props: ProviderProps<Return>) {
		const { initialState, children } = props;
		return <Context.Provider value={useHook(initialState)}>{children}</Context.Provider>;
	}
	function useContainer() {
		return useContext(Context);
	}
	return { Provider, useContainer };
}
export default createContainer;
