import { FormInstance } from "antd";
import createContainer from "@/utils/ContextUtils";
import { useEffect, useState } from "react";

interface EditContextProps {
	form: FormInstance;
	editing: boolean;
}
function useEditContext(props: EditContextProps) {
	return props
}
export const EditContainer = createContainer(useEditContext);

/**
 * 1. columns 可以传入edit对象
 */

function useSizeContext(initSize?: "small" | "large" | "middle") {
	const [size, setSize] = useState(() => initSize ?? "large");
	useEffect(() => {
		if (initSize) setSize(initSize);
	}, [initSize]);
	return [size, setSize];
}
export const SizeContainer = createContainer(useSizeContext);
