
interface MapValueWithKey {
	key?: string;
	[k: string]: any;
}
type MapKey = number | string

type FunctionToArray<K, V, R = any> = (value: [K, V], index: number, array: [K, V][]) => Partial<R>
class ConstantToMapClass<V extends MapValueWithKey, K extends MapKey = number> {
	constructor(public map: Map<K, V>, public keyMap: Map<V['key'], V & { status: K }>) { }

	get keys() {
		return Array.from(this.map.keys())
	}

	get values() {
		return Array.from(this.map.values())
	}

	// map添加一个
	push(key: K, value: Partial<V>) {
		this.map.set(key, value as Required<V>)
		if (value.key) {
			this.keyMap.set(value.key, { ...(value as Required<V>), status: key })
		}
		return this;
	}

	// 属性扩展
	public extend<T = object>(value: T) {
		return Object.assign(this, value);
	}

	// 以 status 去 匹配 value
	public matchStatus<Key extends K>(key: Key) {
		// 匹配 属性
		return this.map.get(key);
	}

	// 以 key 去匹配 value + status
	public matchKey<Key extends V['key']>(key: Key) {
		// 匹配 属性
		return this.keyMap.get(key);
	}

	// 转换成数组
	public toArray<R>(fn: FunctionToArray<K, V, R>) {
		const list = Array.from(this.map).map(fn);
		return Object.assign(this, { list })
	}
}


/** 根据参数转换成map 获得正确的数据顺序与类型 */

export default function ConstantToMap<Value extends MapValueWithKey, Key extends number | string = number>(
	...constantList: Array<Key | Partial<Value>>
) {
	if (constantList.length % 2) {
		console.error(`键值对无法匹配,请检查参数\n ${constantList}`);
	}

	const map = new Map<Key, Value>();

	const keyMap = new Map<Value['key'], Value & { status: Key }>();
	for (let i = 1; i < constantList.length; i += 2) {
		const key = constantList[i - 1] as Key;
		const value = constantList[i] as Value;
		map.set(key, value);

		if (value.key) {
			keyMap.set(value.key, { ...value, status: key });
		}

	}
	return new ConstantToMapClass(map, keyMap);
}


interface IASSET_TYPE {
	name: string;
	key: 'server' | 'termial' | 'unknow';
	color: string;
}
const ASSET_TYPE = ConstantToMap<IASSET_TYPE>(
	0, { name: '终端', color: '12', key: 'termial' },
	1, { name: '服务器', color: '12', key: 'server' },
	2, { name: '其他', color: '12', key: 'unknow' },
	3, { name: window.location.href, color: 'red', }
).extend({ default: 0 });

// 映射中文
console.log('映射中文,ASSET_TYPE.matchStatus(status)', ASSET_TYPE.matchStatus(0));
// 根据key 获取对应的字段
console.log('根据key 获取对应的字段,ASSET_TYPE.matchKey("termial")', ASSET_TYPE.matchKey('termial'));
// 默认值
console.log('默认值,ASSET_TYPE.default', ASSET_TYPE.default);
// list
console.log('list,ASSET_TYPE.toArray(([k, v]) => ({ value: k, label: v.name }))', ASSET_TYPE.toArray(([k, v]) => ({ value: k, label: v.name })));

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
 * 2. 能否结合 enum
 */
