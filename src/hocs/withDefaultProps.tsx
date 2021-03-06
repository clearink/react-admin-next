import { ComponentType } from "react";

// 修正 D 中的类型 为 P 和 D 的 union
type UnionProp<P, D> = {
  [K in keyof D]: K extends keyof P ? P[K] : D[K];
};
// P 中都是必须
// D 是P中的默认值
export default function withDefaultProps<P extends object, D = object>(
  WrappedComponent: ComponentType<P>,
  defaultProps = {} as D
) {
  WrappedComponent.defaultProps = defaultProps;
  type Props = Omit<P, keyof D>; // P中没有包含D的参数 则为必须的参数

  return WrappedComponent as ComponentType<Props & Partial<UnionProp<P, D>>>; // defaultProps 则为可选项了
}
// Omit 未包含
// Partial 变为可选项
// Pick 取出
