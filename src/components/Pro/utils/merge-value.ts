import { isNullUndefined, isPlainObject } from "@/utils/ValidateType";
import merge from "lodash/merge";
// 模仿 lodash 的 merge 去除 value = undefined
export default function mergeValue<R = any>(target: any, ...sourceList: any[]): R {
	if (isNullUndefined(target)) target = sourceList[0];
	for (let source of sourceList) {
		// 如果字段值是 null object 则自动放过
		if (isNullUndefined(source)) continue;

		for (let [key, value] of Object.entries(source)) {
			const validate = Object.prototype.toString;
			// 如果 类型不同 直接覆盖
			if (validate.call(target[key]) !== validate.call(value)) {
				console.log("target[key]", target[key], value);
				target[key] = value;
			} else if (isPlainObject(value)) {
				// 是对象或者数组
				target[key] = mergeValue(target[key], value);
			} else if (target[key] !== value) {
				target[key] = value;
			}
		}
	}
	return target;
}

// var names = {
// 	characters: [{ name: "barney" }, { name: "fred" }],
// };

// var ages = {
// 	characters: [{ age: 36 }, { age: 40 }],
// };

// var heights = {
// 	characters: [{ height: "5'4\"" }, { height: "5'5\"" }],
// };
// var expected = {
// 	'characters': [
// 		{ 'name': 'barney', 'age': 36, 'height': '5\'4"' },
// 		{ 'name': 'fred', 'age': 40, 'height': '5\'5"' }
// 	]
// };

// console.log(mergeValue(names, ages, heights), expected);
const args = (function toArgs(array: any[]) {
	return function () {
		return arguments;
	}.apply(undefined, array as any);
})([1, 2, 3]);

var object1 = { value: args },
	object2 = { value: { 3: 4 } },
	expected = { 0: 1, 1: 2, 2: 3, 3: 4 },
	actual = mergeValue(object1, object2);

console.log(actual.value, expected);
// object1.value = args;

// actual = mergeValue(object2, object1);
// console.log(actual.value, expected);

// expected = { 0: 1, 1: 2, 2: 3 } as any;

// actual = mergeValue({}, object1);
// console.log(actual.value, expected);
