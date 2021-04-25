import { useLayoutEffect, useRef } from "react";

const BASE_TITLE = process.env.REACT_APP_SITE_NAME;
export default function useTitle(title: string) {
	const initTitle = useRef(document.title);
	useLayoutEffect(() => {
		if (BASE_TITLE) document.title = `${title} - ${BASE_TITLE}`;
		else document.title = title;
		const init = initTitle.current;
		return () => {
			document.title = init;
		};
	}, [title]);
}
