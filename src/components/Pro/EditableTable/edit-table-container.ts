import { Form, FormInstance } from "antd";
import createContainer from "@/utils/ContextUtils";
import { useEffect, useState } from "react";

function useEditContext(initForm: FormInstance) {
	const [form] = Form.useForm(initForm);
	return form;
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
