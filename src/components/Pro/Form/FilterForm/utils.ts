import { FULL_SCREEN_SPAN } from "./constant";
import { ColSpan } from "./interface";

export function getMediaSpanMap(colSpan: ColSpan) {
	const ret: { [point: string]: number } = {};
	// 根据 size 排序
	colSpan.sort((a, b) => a.size - b.size);
	for (let i = 0; i < colSpan.length; i++) {
		const { type = "min", span = FULL_SCREEN_SPAN, size } = colSpan[i];
		const mediaStr = `(${type}-width: ${size}px)`;
		ret[mediaStr] = span;
	}
	return ret;
}
export function matchMedia(list: MediaQueryList[]) {
	for (let i = list.length - 1; i >= 0; i--) {
		const item = list[i];
		if (item.matches) {
			return item.media;
		}
	}
}
