import { useMemo } from "react";
import configs from "@/configs";
import { StatusEnumItem } from "../interface";
import { BadgeProps } from "antd";

const defaultColorEnum = (configs as any).colorEnum;

export default function useGetStatus(
	text?: string,
	valueEnum?: StatusEnumItem[],
	$color?: BadgeProps["color"][]
): Partial<StatusEnumItem> {
	return useMemo(() => {
		const colorEnum = defaultColorEnum?.length ? defaultColorEnum : $color;

		const matchIndex = (valueEnum || []).findIndex((item) => item.value === text);
		if (!valueEnum || matchIndex === -1) {
			return { label: text, value: text };
		}

		const matchItem = valueEnum[matchIndex];
		const color = colorEnum[matchIndex % colorEnum.length];

		return { ...matchItem, color: matchItem.color ?? color };
	}, [$color, text, valueEnum]);
}
