interface ExtendFunctionArg<Key = number, Value = string, KM = string> {
	map: Map<Key, Value>;
	list: Array<[Key, Value]>;
	match: ConstantToMapClass<Key, Value, KM>["match"];
	keyMap: Map<KM, Value>;
	keyMatch: ConstantToMapClass<Key, Value, KM>["keyMatch"];
}
type ExtendFunction<Key = number, Value = string, KM = string, Return = any> = (
	args: ExtendFunctionArg<Key, Value, KM>
) => Return;

class ConstantToMapClass<K = number, V = string, KM = string> {
	constructor(public map: Map<K, V>, public keyMap: Map<KM, V>) {}

	// 属性扩展
	public extend<Return = any>(fn: ExtendFunction<K, V, KM, Return>) {
		return fn({
			map: this.map,
			list: Array.from(this.map),
			match: this.match,
			keyMap: this.keyMap,
			keyMatch: this.keyMatch,
		});
	}

	public match<Key extends K>(key: Key) {
		// 匹配 属性
		return this.map.get(key);
	}
	public keyMatch<Key extends KM>(key: Key) {
		// 匹配 属性
		return this.keyMap.get(key);
	}
}

/** 转换成对象数组 */
export function ConvertObjectArray(list: Array<any[]>, ...nameList: string[]) {
	if (list.length !== 0 && nameList.length !== list[0].length) {
		console.error(`无法正确转换成对象数组,请检查参数:\n ${list}`);
	}
	return list.map((itemArr) => itemArr.reduce((pre, cur, index) => ({ ...pre, [nameList[index]]: cur }), {}));
}

/** 根据参数转换成map 获得正确的数据顺序与类型 */

export default function ConstantToMap<Key = number, Value = string, KM = string>(
	...constantList: Array<Key | Partial<Value>>
) {
	if (constantList.length % 2) {
		console.error(`键值对无法匹配,请检查参数\n ${constantList}`);
	}

	const map = new Map<Key, Value>();
	const keyMap = new Map<KM, Value>();
	for (let i = 0; i < constantList.length - 1; i += 2) {
		const key = constantList[i] as any;
		const value = constantList[i + 1] as any;
		map.set(key, value);

		if (value.key) keyMap.set(value.key, value);
	}
	return new ConstantToMapClass(map, keyMap);
}

export interface IValue {
	color: string;
	text: string;
	key: "in" | "out";
}
const a = ConstantToMap<number, IValue, IValue["key"]>(
	0,
	{ text: "服务内" },
	1,
	{ text: "服务内1", color: "green1", key: "in" },
	2,
	{ text: "服务内2", color: "green2", key: "in" },
	3,
	{ text: "服务内3", color: "green3", key: 'in' },
    4,{}
).extend((args) => ({ ...args, default: -1 }));

const status = 1;
console.log(a.keyMatch("in"));

/**
 * 需求
 * 1. 根据 status 映射 text done
 * 2. 根据 key 匹配 status pending
 * 3. 转换成list
 */
/**
 * 目标
 *
 */
