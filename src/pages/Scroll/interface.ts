import { CSSProperties, ReactNode } from "react";

export interface InfiniteScrollProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	/** height未指定时使用widow绑定元素*/
	height?: CSSProperties["height"];
	/** 使用 window 的滚动事件 */

	/** 滚动阈值 */
	scrollThreshold?: number;

	/** 加载更多事件 */
	loadMore?: () => Promise<boolean> | boolean;

	hasMore?: boolean;
	loader?: ReactNode;

	/** TODO: 支持水平无限滚动 */
}
