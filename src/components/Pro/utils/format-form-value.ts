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