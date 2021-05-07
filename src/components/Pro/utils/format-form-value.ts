import { isMoment } from "moment";
import { isArray, isObject } from "@/utils/ValidateType";

// 去除 moment 或者未来添加的其他对象 比如富文本对象
export function formatFormValue(values: any, timeFormat: string = "YYYY-MM-DD"): any {
	const result = isArray(values) ? [] : {};
	for (let key of Object.keys(values)) {
		const item = values[key];

		if (isMoment(item)) result[key] = item.format(timeFormat);
		else if (isObject(item) || isArray(item)) result[key] = formatFormValue(item, timeFormat);
		else result[key] = item;
	}
	return result;
}

// 合并值时去除 value = undefined 的情况
export function mergeValue<V, T>(obj1: V, obj2: T, noUndefined = false): V & T {
	if (!noUndefined) return { ...obj1, ...obj2 };
	const ret = { ...obj1, ...obj2 };
	const keys = Object.keys(ret);
	for (let k of keys) {
		ret[k] = obj2[k] ?? obj1[k];
	}
	return ret;
}
