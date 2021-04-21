interface ConstantItem {
	key?: string;
	status: any;
	[k: string]: any;
}
// 可选中排除一些必选项
type PartialExcludeKey<T, K extends keyof T> = Partial<T> & { [P in K]-?: T[P] };

type FunctionToArray<K, V, R = any> = (value: [K, V], index: number, array: [K, V][]) => Partial<R>;
class ConstantToMapClass<V extends ConstantItem> {
	constructor(public mapStatus: Map<V["status"], V>, public mapKey: Map<V["key"], V>) {}

	get keys() {
		return Array.from(this.mapStatus.keys());
	}

	get values() {
		return Array.from(this.mapStatus.values());
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
	const mapStatus = new Map<Value["status"], Value>();
	const mapKey = new Map<Value["key"], Value>();

	for (let i = 0; i < list.length; i++) {
		const item = list[i] as Value;
		if (item.status) mapStatus.set(item.status, item);
		if (item.key) mapKey.set(item.key, item);
	}
	return new ConstantToMapClass(mapStatus, mapKey);
}
// 根据业务的不同定义不同的 type
interface AssetConstType {
	text: string;
	status: 0 | 1 | 2 | 3;
	key: "server" | "terminal" | "unknown";
	color: string;
	icon: string;
}
type c = AssetConstType["key"] | 'all';
const ASSET_TYPE = ConstantToMap<AssetConstType>(
	{ status: 0, key: "server", text: "终端", color: "red" },
	{ status: 1, key: "terminal", text: "终端", color: "green" },
	{ status: 2, key: "unknown", text: "终端", color: "green" }
).extend({ default: 0 });

// 映射中文
console.log("映射中文,ASSET_TYPE.matchStatus(status)", ASSET_TYPE.matchStatus(0));
// 根据key 获取对应的字段
console.log('根据key 获取对应的字段,ASSET_TYPE.matchKey("terminal")', ASSET_TYPE.matchKey("terminal"));
// 默认值
console.log("默认值,ASSET_TYPE.default", ASSET_TYPE.default);

const a = ASSET_TYPE.toArray(([k, v]) => ({ value: k, label: v.name }));
// list
console.log("list,ASSET_TYPE.toArray(([k, v]) => ({ value: k, label: v.name }))", a.list[0].value);

interface I_ASSET_DETAIL {
	name: string,
	color: string,
	key: 'server' | 'endpoint' | 'net_endpoint' | 'safety_equipment'
}
const ASSET_DETAIL_TYPE = ConstantToMap<I_ASSET_DETAIL>(
	0, { name: '服务器', color: '13', key: 'server' },
	1, { name: '终端', color: '13', key: 'endpoint' },
	2, { name: '网络设备', color: '13', key: 'net_endpoint' },
	3, { name: '安全设备', color: '13', key: 'safety_equipment' },
	4, { name: '2', color: '2', key: 'safety_equipment' }
)
	.extend({ default: 0, a: 213, c: '', d: [1, 2, 3, 4, 5] })
	.toArray(([k, v]) => ({ name: k, value: v.color, t: v.key }));

const v = (v: string) => `${v}_str`;
enum A {
	服务器,
	'终端'
}
let c = A['0']
console.log(ASSET_DETAIL_TYPE.list,)
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
 * 3. 能否简单的实现全部值
 */
