import { useMemo } from "react";
import configs from "@/configs";
import { StatusEnumItem } from "../interface";
import { gradientColor } from "../utils";

const defaultColorEnum = (configs as any).colorEnum;

export default function useGetStatus(
	text?: string,
	valueEnum?: StatusEnumItem[],
	colorRange?: [string, string]
): Partial<StatusEnumItem> {
	return useMemo(() => {
		const colorEnum = defaultColorEnum?.length
			? defaultColorEnum
			: gradientColor(colorRange, valueEnum?.length);

		const matchIndex = (valueEnum || []).findIndex((item) => item.value === text);
		if (!valueEnum || matchIndex === -1) {
			return { label: text, value: text };
		}

		const matchItem = valueEnum[matchIndex];
		const color = colorEnum[matchIndex % colorEnum.length];

		return { ...matchItem, color: matchItem.color ?? color };
	}, [colorRange, text, valueEnum]);
}
