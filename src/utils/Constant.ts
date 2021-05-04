export interface ConstantItem {
	/** 名称 */
	label?: string;
	/** 值 */
	value: any;
	key?: string | number | symbol;
}
// 可选中排除一些必选项
export type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };
export type ToArrayFunction<V extends ConstantItem, R = any> = (
	value: [V["value"], V],
	index: number,
	array: Array<[V["value"], V]>
) => R;
export default class Constant<V extends ConstantItem> {
	public mapStatus: Map<V["value"], V> = new Map();
	public mapKey: Map<V["key"], V> = new Map();

	constructor(...list: PartialExcludeKey<V, "value">[]) {
		for (let i = 0; i < list.length; i++) {
			const item = list[i] as V;
			this.mapStatus.set(item.value, item);
			if (item.key) {
				this.mapKey.set(item.key, item);
			}
		}
	}

	get keys() {
		return Array.from(this.mapStatus.keys());
	}

	get values() {
		return Array.from(this.mapStatus.values());
	}

	// map添加一个
	push(value: PartialExcludeKey<V, "value">) {
		this.mapStatus.set(value["value"], value as V);
		if (value.key) {
			this.mapKey.set(value["key"], value as V);
		}
		return this;
	}

	// 属性扩展
	public extend<T = object>(value: T) {
		return Object.assign(this, value);
	}

	// 以 status 去 匹配 value
	public matchStatus<Key extends V["value"]>(key: Key) {
		// 匹配 属性
		return this.mapStatus.get(key);
	}

	// 以 key 去匹配 value + status
	public matchKey<Key extends V["key"]>(key: Key) {
		// 匹配 属性
		return this.mapKey.get(key);
	}

	// 转换成数组
	public toArray<R>(fn: ToArrayFunction<V, R>) {
		const list = Array.from(this.mapStatus).map<R>(fn);
		return Object.assign(this, { list });
	}
}
