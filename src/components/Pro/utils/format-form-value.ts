import { isArray, isObject } from "@/utils/ValidateType";
import { isMoment } from "moment";

// 去除 moment 或者未来添加的 富文本对象
export function formatFormValue(values: any, timeFormat: string = "YYYY-MM-DD"): any {
	if (isArray(values)) {
		return values.map((item) => {
			if (isMoment(item)) return item.format(timeFormat);
			if (isObject(item) || isArray(item)) return formatFormValue(item, timeFormat);
			return item;
		});
	}
	if (isObject(values)) {
		return Object.entries(values).reduce((pre, [k, v]) => {
			if (isMoment(v)) return { ...pre, [k]: v.format(timeFormat) };
			if (isObject(v) || isArray(v)) return { ...pre, [k]: formatFormValue(v, timeFormat) };
			return { ...pre, [k]: v };
		}, {});
	}
	return values;
}
