import { useLayoutEffect, useState } from "react";
import useDeepMemo from "@/hooks/state/use-deep-memo";
import { colSpan, FULL_SCREEN_SPAN } from "../constant";
import { getMediaSpanMap, matchMedia } from "../utils";

//** 监听 matchMedia */
export default function useBreakpoint(_mediaQuery = colSpan) {
	const mediaQuery = useDeepMemo(() => getMediaSpanMap(_mediaQuery), [_mediaQuery]);

	const [span, setSpan] = useState(FULL_SCREEN_SPAN);

	useLayoutEffect(() => {
		const keys = Object.keys(mediaQuery);
		const queryList = keys.map((media) => window.matchMedia(media));
		function handleChange() {
			const mediaStr = matchMedia(queryList);
			if (mediaStr) setSpan(mediaQuery[mediaStr]);
		}

		handleChange();

		queryList.forEach((query) => query.addEventListener("change", handleChange));
		return () => {
			queryList.forEach((query) => query.removeEventListener("change", handleChange));
		};
	}, [mediaQuery]);

	return span;
}
