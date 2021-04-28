import { forwardRef, ForwardRefRenderFunction, Ref } from "react";

/* 处理泛型组件 forwardRef 问题 */
export default function withForwardRef<T, P = {}>(
	WrappedComponent: ForwardRefRenderFunction<T, P>
) {
	return forwardRef(WrappedComponent) as any as ForwardRefRenderFunction<T, P & { ref: Ref<T> }>;
	// return forwardRef(component);
}
