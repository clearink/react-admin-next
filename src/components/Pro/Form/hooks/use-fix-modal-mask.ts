import { useLayoutEffect } from "react";

// fix: 使用 createPortal 造成的样式闪动
export default function useFixModalMask(visible: boolean) {
	useLayoutEffect(() => {
		// 打开时立即执行 关闭时延迟动画结束
		const delay = visible ? 50 : 260;
		const timer = setTimeout(() => {
			const target = document.documentElement || document.body;
			const fixWidth = target.scrollHeight > target.clientHeight ? 17 : 0;
			if (visible) {
				target.classList.add("scroll-body-effect");
				target.style.width = `calc(100% - ${fixWidth}px)`;
			} else {
				target.classList.remove("scroll-body-effect");
				target.style.width = '';
			}
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [visible]);
}
