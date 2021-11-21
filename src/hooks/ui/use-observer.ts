import { useCallback, useRef } from "react";

export default function useObserver<T extends HTMLElement>() {
	const domRef = useRef<T>(null);
	const ref = useRef<{ id: number; fn: () => void }>({ id: 0, fn: () => {} });
	// 开始监听
	const observe = useCallback(() => {
		const fn = () => {
			const dom = domRef.current;
			if (dom) {
				const rect = dom.getBoundingClientRect();
			}
			ref.current.id = requestAnimationFrame(fn);
		};
		fn();
		window.addEventListener("resize", fn, { capture: false, passive: true });
	}, []);
	// 取消监听
	const unobserve = useCallback(() => {}, []);

	return { ref: domRef, observe, unobserve };
}
