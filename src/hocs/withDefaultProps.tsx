import { ComponentType } from "react";

// 修正 D 中的类型 为 P 和 D 的 union
// type UnionProp<P, D> = {
// 	[K in keyof D]: K extends keyof P ? P[K] : D[K];
// };
type UnionProp<P, D> = Omit<P, keyof D> & Partial<D>;
export default function withDefaultProps<P extends object, D extends Partial<P>= Partial<P>>(
	WrappedComponent: ComponentType<P>,
	defaultProps?: D
) {
	WrappedComponent.defaultProps = defaultProps;

	return WrappedComponent as ComponentType<UnionProp<P, D>>;
	// return WrappedComponent as ComponentType<RequiredProps & Partial<UnionProp<P, D>>>; // defaultProps 则为可选项了
}
// Omit 未包含
// Partial 变为可选项
// Pick 取出
