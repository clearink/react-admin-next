export interface ConstantItem {
	/** 名称 */
	label?: string;
	/** 值 */
	value: any;
	color?: string;
	key?: boolean | number | string | symbol;
}
// 可选中排除一些必选项
export type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };
export type ToArrayFunction<V extends ConstantItem, R = any> = (
	value: [V["value"], V],
	index: number,
	array: Array<[V["value"], V]>
) => R;
export default class Constant<V extends PartialExcludeKey<ConstantItem, "value">> {
	public valueMap: Map<V["value"], V> = new Map();
	public keyMap: Map<V["key"], V> = new Map();

	// 默认的list 用于 选择项
	public _list: V[] = [];

	public constructor(list: Readonly<V[]>) {
		this._list = list.concat();
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let i = 0; i < list.length; i++) {
			const item = list[i] as V;
			this.valueMap.set(item.value, item);
			if (item.hasOwnProperty("key")) {
				this.keyMap.set(item.key, item);
			}
		}
	}

	public get keys() {
		return Array.from(this.valueMap.keys());
	}

	public get values() {
		return Array.from(this.valueMap.values());
	}

	// 属性扩展
	public extend<T = object>(value: T) {
		return Object.assign(this, value);
	}

	// 匹配
	public match<T extends "key" | "value", Value = any>(
		property: T,
		value: T extends "key" ? V["key"] : Value
	) {
		if (property === "key") return this.keyMap.get(value as V["key"]);
		return this.valueMap.get(value);
	}

	// 当满足条件 以 key 做标识是为了更好的可读性
	public when<T = any>(value: T, content: V["key"][]) {
		for (const key of content) {
			const item = this.keyMap.get(key);
			if (value === item?.value) return true;
		}
		return false;
	}

	// 转换成数组
	public toArray<R>(fn: ToArrayFunction<V, R>) {
		const list = Array.from(this.valueMap).map<R>(fn);
		return Object.assign(this, { list });
	}
}

const SOME_TYPE_LIST = [
	{ label: "b", value: 2, key: "e", e: "123123", h: "123", color: "red" },
	{ label: "b", value: 2, key: "e", e: "123123", h: "123", icon: "icon" },
] as const;

const SOME_TYPE_CONSTANT = new Constant(SOME_TYPE_LIST);

const OTHER_TYPE_LIST = [
	...SOME_TYPE_LIST,
	{ label: "全部", value: 0, key: "all" },
	{ label: "项目周报", value: 1, key: "weekReport" },
] as const;

const OTHER_TYPE_CONSTANT = new Constant(OTHER_TYPE_LIST);

SOME_TYPE_CONSTANT.match("key", "e");
SOME_TYPE_CONSTANT.match("value", 2);
SOME_TYPE_CONSTANT.when(2, ["e"]);

OTHER_TYPE_CONSTANT.match("key", "all");
OTHER_TYPE_CONSTANT.match("value", 2);
OTHER_TYPE_CONSTANT.when(2, ["all", "weekReport"]);
