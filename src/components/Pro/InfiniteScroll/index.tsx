import { useEffect, useMemo, useRef } from "react";
import { useThrottleCallback } from "@/hooks/state/use-throttle";
import { useDebounceState } from "@/hooks/state/use-debounce";
import styles from "./style.module.scss";
import { InfiniteScrollProps } from "./interface";
import { isScrollBottom } from "./utils";

// 无限滚动组件
function InfiniteScroll(props: InfiniteScrollProps) {
	const { children, className, style, loadMore, scrollThreshold, height, hasMore, loader } = props;
	const ref = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useDebounceState(100, false);//延迟 loading 的变更

	// TODO: loadMore 失败处理
	const handleThrottledLoadMore = useThrottleCallback(150, async (e: Event) => {
		if (loading || !hasMore) return;
		// 判断是否滚到了最低部
		const isAtBottom = isScrollBottom(ref.current, { useWindow: !height, scrollThreshold });
		if (!isAtBottom) return;
		setLoading(true);
		await loadMore?.();
		setLoading(false);
	});
	// 是否 将事件绑定到 window 上
	const useWindow = useMemo(() => !height, [height]);
	useEffect(() => {
		// 不是直接使用height是为了不重复绑定事件
		const element = useWindow ? window : ref?.current;
		element?.addEventListener("scroll", handleThrottledLoadMore);
		return () => {
			element?.removeEventListener("scroll", handleThrottledLoadMore);
		};
	}, [handleThrottledLoadMore, useWindow]);
	return (
		<div ref={ref} className={`${styles.infinite_scroll__wrap} ${className}`} style={{ ...style, height }}>
			{children}
			{loading && <div className={styles.infinite_scroll__loader}>{loader}</div>}
		</div>
	);
}
InfiniteScroll.defaultProps = {};
export default InfiniteScroll;
