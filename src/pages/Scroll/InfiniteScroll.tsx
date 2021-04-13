import { InfiniteScrollProps } from "./interface";

// 无限滚动组件
export default function InfiniteScroll(props: InfiniteScrollProps) {
	const { children } = props;
	return <div>{children}</div>;
}
