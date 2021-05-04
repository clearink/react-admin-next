import { useMemo } from "react";
import { COLOR_ENUM, defaultColor } from "../constant";
import { StatusEnumItem } from "../interface";

export default function useGetStatus(
	text?: string,
	valueEnum?: StatusEnumItem[]
): Partial<StatusEnumItem> {
	return useMemo(() => {
		const matchIndex = (valueEnum || []).findIndex((item) => item.value === text);
		if (!valueEnum || matchIndex === -1) {
			const ret = { label: text, status: text };
			return { ...ret, color: defaultColor };
		}
		const matchItem = valueEnum[matchIndex];
		const color = COLOR_ENUM[matchIndex % COLOR_ENUM.length];
		// TODO 还缺少一个字段计算颜色渐变的函数 根据 matchIndex / COLOR_ENUM.length 的值去匹配颜色
		return { ...matchItem, color: matchItem.color ?? color ?? defaultColor };
	}, [text, valueEnum]);
}
