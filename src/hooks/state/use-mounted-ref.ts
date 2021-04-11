import { useEffect, useRef } from "react";

export default function useMountedRef() {
	const ref = useRef<boolean>(false);
	useEffect(() => {
		ref.current = true;
		return () => {
			ref.current = false;
		};
	}, []);
	return ref;
}
