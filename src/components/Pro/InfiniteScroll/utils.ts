// TODO: 未来支持水平滚动

// 判断是否滚动到最底部 element.scrollHeight === element.scrollTop + element.clientHeight
export interface ScrollBottomConfig {
	useWindow: boolean;
	scrollThreshold?: number;
}


// lodash 的 wrap
export function valueRange(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function isScrollBottom(element: HTMLElement | null, config: ScrollBottomConfig) {
	const { useWindow, scrollThreshold = 0.8 } = config;
	const target = useWindow ? document.documentElement || document.body : element!;
	return target.scrollTop + target.clientHeight + scrollThreshold >= target.scrollHeight ;
}
