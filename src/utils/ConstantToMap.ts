export interface ConstantItem {
	key?: string;
	status: any;
	[k: string]: any;
}
// 可选中排除一些必选项
export type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };

type FunctionToArray<K, V, R = any> = (value: [K, V], index: number, array: [K, V][]) => Partial<R>;
class ConstantToMapClass<V extends ConstantItem> {
	constructor(public mapStatus: Map<V["status"], V>, public mapKey: Map<V["key"], V>) { }

	get keys() {
		return Array.from(this.mapStatus.keys());
	}

	get values() {
		return Array.from(this.mapStatus.values());
	}

	get all() {
		return 'all'
	}

	// map添加一个
	push(value: PartialExcludeKey<V, "status">) {
		this.mapStatus.set(value["status"], value as V);
		if (value.key) this.mapKey.set(value["key"], value as V);
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
	public toArray<R>(fn: FunctionToArray<V["status"], V, R>) {
		const list = Array.from(this.mapStatus).map(fn);
		return Object.assign(this, { list });
	}
}


/** 根据参数转换成map 获得正确的数据顺序与类型 */

export default function ConstantToMap<Value extends ConstantItem>(
	// 其他的可以省略 但是 status 必须要有
	...list: PartialExcludeKey<Value, "status">[]
) {
	type ValueType = PartialExcludeKey<Value, "status">
	const mapStatus = new Map<ValueType["status"], ValueType>();
	const mapKey = new Map<ValueType["key"], ValueType>();
	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		mapStatus.set(item.status, item);
		if (item.key) mapKey.set(item.key, item);
	}
	return new ConstantToMapClass(mapStatus, mapKey);
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
