import React, { useState } from "react";
import { ButtonProps, Form } from "antd";
import Submitter from "../Submitter";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { ProFormContainer } from "./utils";
import useMountedRef from "@/hooks/state/use-mounted-ref";
import { formatFormValue } from "@/components/Pro/utils/format-form-value";
import { ProFormProps, ProFormType } from "./interface";
import withDefaultProps from "@/hocs/withDefaultProps";

function ProForm<Values = any>(props: ProFormProps<Values>) {
	const { children, form: $form, onFinish, submitConfig, timeFormat, ...rest } = props;
	const [form] = Form.useForm($form);
	const mountedRef = useMountedRef();
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false);

	const handleFinish = useRefCallback(async (values: Values) => {
		try {
			setLoading({ delay: 50 });
			await onFinish?.(formatFormValue(values, timeFormat));
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	});
	return (
		<ProFormContainer.Provider initialState={{ loading, form }}>
			<Form form={form} onFinish={handleFinish} {...rest}>
				{props.children}
				{submitConfig !== false && (
					<>
						<Submitter {...submitConfig} />
						<button key='submit-btn' type='submit' hidden></button>,
					</>
				)}
			</Form>
		</ProFormContainer.Provider>
	);
}

ProForm.Item = Form.Item;
export default withDefaultProps(ProForm, { timeFormat: "YYYY-MM-DD" }) as ProFormType;
/**
 * 一个表单最重要的是什么?
 * 除去不可预见的各种控件外
 * 只能是提交按钮与重置按钮了
 */
