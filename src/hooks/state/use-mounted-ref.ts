import { useEffect, useRef } from "react";
/** @deprecated  该操作是不必要的  https://github.com/reactwg/react-18/discussions/82 */
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
