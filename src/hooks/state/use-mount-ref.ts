// 是否已经被卸载

import { useEffect, useRef } from "react";
export default function useMountRef() {
	const ref = useRef(false);
	useEffect(() => {
		ref.current = true;
		return () => {
			ref.current = false;
		};
	}, []);
	return ref;
}
