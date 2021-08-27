import { useMemo } from "react";
import { StatusEnumItem } from "../interface";
import { BadgeProps } from "antd";
import { statusColorContainer } from "../utils";

export default function useGetStatus(
	text?: string,
	valueEnum?: StatusEnumItem[],
	$color?: BadgeProps["color"][]
): Partial<StatusEnumItem> {
	return useMemo(() => {
		const colorEnum = statusColorContainer.useContainer() ?? $color; // pro component 一些配置属性

		const matchIndex = (valueEnum || []).findIndex((item) => item.value === text);
		if (!valueEnum || matchIndex === -1) {
			return { label: text, value: text };
		}

		const matchItem = valueEnum[matchIndex];
		const color = colorEnum[matchIndex % colorEnum.length];

		return { ...matchItem, color: matchItem.color ?? color };
	}, [$color, text, valueEnum]);
}
