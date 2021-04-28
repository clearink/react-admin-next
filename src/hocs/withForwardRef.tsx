import { forwardRef } from "react";

/* 处理泛型组件 forwardRef 问题 */
export default function withForwardRef<P, R>(component: C): ReturnType<C> {
	return forwardRef(component);
}
