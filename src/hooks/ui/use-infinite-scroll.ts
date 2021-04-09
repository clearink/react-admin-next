import { useRef } from "react";

export default function useInfiniteScroll() {
	const ref = useRef();
	return [{}, ref];
}
