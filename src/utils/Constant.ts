import { isFunction } from "./ValidateType";

export interface ConstantItem {
	key?: string;
	status: any;
}
// 可选中排除一些必选项
export type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };
type FunctionToArray<K, V, R = any> = (value: [K, V], index: number, array: [K, V][]) => Partial<R>

export default class Constant<V extends ConstantItem> {
	public mapStatus: Map<V['status'], V> = new Map();
	public mapKey: Map<V['key'], V> = new Map();

	constructor(...list: PartialExcludeKey<V, 'status'>[]) {
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

	get all() {
		return 'all';
	}

	// map添加一个
	push(value: PartialExcludeKey<V, 'status'>) {
		this.mapStatus.set(value['status'], value as V);
		if (value.key) {
			this.mapKey.set(value['key'], value as V);
		}
		return this;
	}

	// 属性扩展
	public extend<T = object>(value: T) {
		return Object.assign(this, value);
	}

	// 以 status 去 匹配 value
	public matchStatus<Key extends V['status']>(key: Key) {
		// 匹配 属性
		return this.mapStatus.get(key);
	}

	// 以 key 去匹配 value + status
	public matchKey<Key extends V['key']>(key: Key) {
		// 匹配 属性
		return this.mapKey.get(key);
	}

	// 转换成数组
	public toArray<R>(fn: FunctionToArray<V['status'], V, R>) {
		const list = Array.from(this.mapStatus).map(fn);
		return Object.assign(this, { list });
	}
}

interface I_ASSET_DETAIL {
	name: string;
	color: string;
	status: number;
	key: 'server' | 'endpoint' | 'net_endpoint' | 'safety_equipment';
	a: number
}
const A = new Constant<I_ASSET_DETAIL>(
	{ status: 1, name: '服务器1', color: '13', key: 'endpoint', a: 2 },
	{ status: 2, name: '服务器2', color: '13', key: 'net_endpoint' },
	{ status: 3, name: '服务器3', color: '13', key: 'safety_equipment' },
	{ status: 4, name: '服务器4', color: '13', key: 'server' },
)
	.extend({ default: 1 })  // 默认值
	.toArray(([k, v]) => ({ label: k, value: v.status, ...v }))           // 根据业务不同一般变化不会太大
	;
console.log(A.list[0]);

// 适配各个业务
// 其他的可以省略 但是 status 必须要有
// 默认最后一个可以传入 function 代表 toArray(fn)
const BaseToArrayFunc = <V extends ConstantItem>([k, v]: [V['status'], V]) => ({ label: k, value: v.status, ...v })
//  | FunctionToArray<Value['status'], Value>
function GetConstant<Value extends ConstantItem>(...list: Array<PartialExcludeKey<Value, 'status'> | FunctionToArray<Value['status'],Value>>) {
	let toArrayFunc = BaseToArrayFunc;
	const constantList: Value[] = [];
	for (let i = 0; i < list.length; i++) {
	    const item = list[i];
		if(isFunction(item)) toArrayFunc = item;
		else constantList.push(item as Value)
	}
	return new Constant(...constantList)
}
const a = GetConstant<I_ASSET_DETAIL>(
	{ status: 1, name: '服务器1', color: '13', key: 'endpoint' },
	{ status: 2, name: '服务器2', color: '13', key: 'net_endpoint' },
	{ status: 3, name: '服务器3', color: '13', key: 'safety_equipment' },
	{ status: 4, name: '服务器4', color: '13', key: 'server' },
).toArray(([k, v]) => ({ label: k, value: v.status, ...v }))

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
