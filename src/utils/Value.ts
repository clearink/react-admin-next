// 过滤掉某个对象的某些属性

import { isUndefined } from "./ValidateType";

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
export function GetValue<T, K extends keyof T>(
	obj: T,
	keys: Array<K>,
	allowUndefined = false
): Pick<T, K> {
	const result = {} as T;
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i];
		if (!allowUndefined && obj[key] === undefined) continue;
		result[key] = obj[key];
	}
	return result;
}

// lodash 的 wrap
export function valueRange(value: number, _min: number, _max: number) {
	const min = Math.min(_min, _max);
	const max = Math.max(_min, _max);
	return Math.min(Math.max(value, min), max);
}

// 对象重命名
// TODO: Record<K, string> 使用  infer 
export function RenameValue<T, K extends keyof T>(obj: T, rename: Record<K, string>) {
	for (let [key, value] of Object.entries(obj)) {
		const newKey = rename[key];
		if (isUndefined(newKey)) continue;
		obj[newKey] = value;
		delete obj[key];
	}
	return obj;
}
