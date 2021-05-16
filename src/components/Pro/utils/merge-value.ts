import { isArray, isObject } from "@/utils/ValidateType";

// 模仿 lodash 的 merge 去除 value = undefined
// TODO: 解决循环引用的问题
export default function mergeValue(target: any, ...sourceList: any[]) {
	if (!isObject(target)) target = sourceList[0];
	for (let i = 0; i < sourceList.length; i++) {
		const source = sourceList[i];

		if (!isObject(source) && !isArray(source)) continue;

		for (let [key, value] of Object.entries(source)) {
			// 如果 类型不同 直接覆盖
			if (Object.prototype.toString.call(target[key]) !== Object.prototype.toString.call(value)) {
				target[key] = value;
			} else if (isObject(target[key]) || isArray(target[key])) {
				// 是对象或者数组
				target[key] = mergeValue(target[key], value);
			} else if (target[key] !== value) {
				target[key] = value;
			}
		}
	}
	return target;
}
// 如果字段值不是array object 则自动放过
