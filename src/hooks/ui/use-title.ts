import { useEffect } from "react";

const BASE_TITLE = process.env.REACT_APP_SITE_NAME;
export default function useTitle(title: string) {
	useEffect(() => {
		if (BASE_TITLE) document.title = `${title} - ${BASE_TITLE}`;
		else document.title = title;
	}, [title]);
}
