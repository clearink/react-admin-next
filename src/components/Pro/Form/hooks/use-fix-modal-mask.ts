import { useLayoutEffect } from "react";

// fix: 使用 createPortal 造成的样式闪动
export default function useFixModalMask(visible: boolean) {
	useLayoutEffect(() => {
		// 打开时立即执行 关闭时延迟动画结束
		const delay = visible ? 50 : 300;
		const timer = setTimeout(() => {
			const body = document.querySelector("body")!;
			if (visible) body.classList.add("ant-drawer-body-effect");
			else body.classList.remove("ant-drawer-body-effect");
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [visible]);
}
