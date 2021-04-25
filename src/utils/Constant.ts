import { isArray } from "./ValidateType";

export interface ConstantItem {
	status: any;
	key?: string | number | symbol;
	text?: string;
}
// 可选中排除一些必选项
export type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };
export type ToArrayFunction<V extends ConstantItem, R = any> = (
	value: [V["status"], V],
	index: number,
	array: Array<[V["status"], V]>
) => R;
export default class Constant<V extends ConstantItem> {
	public mapStatus: Map<V["status"], V> = new Map();
	public mapKey: Map<V["key"], V> = new Map();

	constructor(...list: PartialExcludeKey<V, "status">[]) {
		for (let i = 0; i < list.length; i++) {
			const item = list[i] as V;
			this.mapStatus.set(item.status, item);
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
	push(value: PartialExcludeKey<V, "status">) {
		this.mapStatus.set(value["status"], value as V);
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
	public matchStatus<Key extends V["status"]>(key: Key) {
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
		const list = Array.from(this.mapStatus).map<Partial<R>>(fn);
		return Object.assign(this, { list });
	}
}

/**
 *
 * 需求
 * 1. 根据 status 映射 text done
 * 2. 根据 key 匹配 status done
 * 3. 转换成list done
 */
/**
 * 目标
 * 1. 期望只传入value的类型即可 key的类型可以省略 done
 *
 * 2. 能否结合 enum no
 *
 * 3. 能否简单的实现全部值 pending
 */
