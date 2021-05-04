import Constant, { ConstantItem as Item } from "@/utils/Constant";
import { BadgeProps } from "antd/lib/badge";
export type { PartialExcludeKey } from "@/utils/Constant";

// class MyConstant<V extends Item> extends Constant<V> {
// 	// 以 key 去匹配 value + status
// 	// 重写 增加 all 选项
// 	public matchKey<Key extends V["key"] | "all">(key: Key) {
// 		// 匹配 属性
// 		return this.mapKey.get(key);
// 	}

// 	// 新增 方法
// 	// 1. 快速获取全部

// 	public setAll(value: PartialExcludeKey<V, "value">) {
// 		return Object.assign(this, { all: { ...defaultAll, ...value } });
// 	}
// 	// 2. 获取全部的list
// 	/**
// 	 *
// 	 * @param first 是否放到队首
// 	 * @returns array
// 	 */
// 	public getFullList(first = true) {
// 		if (first) return [this["all"]].concat(this["list"]);
// 		return this["list"].concat(this["all"]);
// 	}
// }

// 适配各个业务
// const defaultAll = {
// 	text: "全部",
// 	key: "all",
// };
export type ConstantItem = Omit<Item, "color"> & { color: BadgeProps["color"] };
export default Constant;
