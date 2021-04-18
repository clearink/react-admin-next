// 过滤掉某个对象的某些属性
// 可以传入一个函数
export function FilterValue<T, K extends keyof T>(obj: T, keys: Array<K>): Omit<T, K> {
	const result = Object.assign({}, obj);
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i];
		delete result[key];
	}
	return result;
}

// 过滤掉某个对象的某些属性
// 可以传入一个函数
export function GetValue<T, K extends keyof T>(obj: T, keys: Array<K>, allowUndefined = false): Pick<T, K> {
	const result = {} as T;
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i];
		if (!allowUndefined && obj[key] === undefined) continue;
		result[key] = obj[key];
	}
	return result;
}

// lodash 的 wrap
export function valueRange(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
