import React, { useState } from "react";
import { ButtonProps, Form } from "antd";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { ProFormContainer } from "./utils";
import { formatFormValue } from "@/components/Pro/utils/format-form-value";
import withDefaultProps from "@/hocs/withDefaultProps";
import Submitter from "./Submitter";
import { ProFormProps, ProFormType } from "./interface";

function ProForm<Values = any>(props: ProFormProps<Values>) {
	const {
		form: $form,
		onFinish,
		onSubmit,
		onReset,
		renderSubmitter,
		timeFormat,
		loading: $loading,
		...rest
	} = props;
	const [form] = Form.useForm($form);

	const [_loading, setLoading] = useState<ButtonProps["loading"]>(false);
	const usePropLoading = $loading !== undefined;
	const loading = usePropLoading ? $loading : _loading;

	const handleFinish = useRefCallback(async (values: Values) => {
		try {
			!usePropLoading && setLoading({ delay: 50 });
			await onFinish?.(formatFormValue(values, timeFormat));
		} finally {
			if (!usePropLoading) setLoading(false);
		}
	});
	return (
		<ProFormContainer.Provider initialState={{ loading, form }}>
			<Form form={form} onFinish={handleFinish} {...rest}>
				{props.children}
				<Submitter onSubmit={onSubmit} onReset={onReset} render={renderSubmitter} />
				<button key='submit-btn' type='submit' hidden></button>
			</Form>
		</ProFormContainer.Provider>
	);
}

ProForm.Item = Form.Item;
export { ProFormContainer };
export default withDefaultProps(ProForm, { timeFormat: "YYYY-MM-DD" }) as ProFormType;
/**
 * 一个表单最重要的是什么?
 * 除去不可预见的各种控件外
 * 只能是提交按钮与重置按钮了
 */
