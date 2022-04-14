// 常量定义辅助函数
interface ConstantItem {
	readonly label: string /** 名称 */;
	readonly value: any /** 值 */;
	readonly key?: string | number | symbol;
	readonly [K: string]: any;
}

type ExtendCallback<C extends Constant<any>, R> = (constant: C) => R;

export type GetEnums<T extends readonly ConstantItem[]> = T extends readonly [
	infer Item,
	...infer RestItem
]
	? RestItem extends ConstantItem[]
		? GetEnums<RestItem> &
				(Item extends ConstantItem
					? "key" extends keyof Item
						? Item["key"] extends Item["value"]
							? { [P in Item["value"]]: Item["label"] | Item["value"] }
							: { [P in Item["value"]]: Item["label"] } & {
									[P in NonNullable<Item["key"]>]: Item["value"];
							  }
						: {
								[P in Item["value"]]: Item["label"];
						  }
					: never)
		: never
	: {};

export default class Constant<V extends readonly ConstantItem[]> {
	public valueMap: Map<V[number]["value"], V[number]> = new Map();
	public keyMap: Map<V[number]["key"], V[number]> = new Map();

	// 默认的list 用于 选择项
	public _list = [] as unknown as V;

	public constructor(list: V) {
		this._list = list.concat() as unknown as V;
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let i = 0; i < list.length; i++) {
			const item = list[i] as V[number];
			this.valueMap.set(item.value, item);
			if (item.hasOwnProperty("key")) {
				this.keyMap.set(item.key, item);
			}
		}
	}

	public get keys() {
		return Array.from(this.keyMap.keys());
	}

	public get values() {
		return Array.from(this.valueMap.values());
	}

	// 属性扩展
	public extend<R extends object>(fn: ExtendCallback<this, R>) {
		return Object.assign(this, fn(this));
	}

	// 匹配
	public match<T extends "key" | "value", Value = any>(
		property: T,
		value: T extends "key" ? V[number]["key"] : Value,
		dk?: V[number]["key"]
	): (V[number] & Record<string, any>) | undefined {
		const attribute = property === "key" ? "keyMap" : "valueMap";
		const matchItem = this[attribute].get(value as V[number]["key"]);
		return matchItem ?? this.keyMap.get(dk);
	}

	public findByKey(
		key: V[number]["key"],
		dk?: V[number]["key"]
	): (V[number] & Record<string, any>) | undefined {
		const matchItem = this.keyMap.get(key);
		return matchItem ?? this.keyMap.get(dk);
	}
	public findByValue<Value = any>(
		value: Value,
		dk?: V[number]["key"]
	): (V[number] & Record<string, any>) | undefined {
		const matchItem = this.valueMap.get(value);
		return matchItem ?? this.keyMap.get(dk);
	}

	// 当满足条件 以 key 做标识是为了更好的可读性
	public when<T = any>(
		value: T,
		content: V[number]["key"] | V[number]["key"][],
		attribute = "value"
	) {
		const contentList = ([] as V[number]["key"][]).concat(content);
		for (const key of contentList) {
			const item = this.keyMap.get(key);
			// eslint-disable-next-line curly
			if (item && value === item[attribute]) return true;
		}
		return false;
	}

	// 数据校验
	private validator(item: V[number]) {
		const { key, value } = item;
		if (process.env.NODE_ENV === "development") {
			const text = "字段名重复, 原有值将被覆盖!";
			if (value in this) {
				console.warn(`value = [${String(value)}]：${text}`);
			}
			if (key && key in this) {
				console.warn(`key = [${String(key)}]: ${text}`);
			}
			if (value === key) {
				console.warn(`key = value = '${String(key)}': ${text}`);
			}
		}
	}

	// key value label 转成映射
	public injectEnums() {
		const inject = this.values.reduce((res, cur) => {
			const { label, value, key } = cur;
			this.validator(cur);
			const vl = { [value]: label };
			const kv = key !== undefined && { [key]: value };
			return Object.assign(res, vl, kv);
		}, {}) as GetEnums<V>;
		return Object.assign(this, inject);
	}
}
