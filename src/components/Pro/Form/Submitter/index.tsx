import { Button, ButtonProps, FormInstance, Space } from "antd";
import { ProFormContainer } from "../ProForm/pro-form-container";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { ReactElement } from "react";

/**
 *
 * 表单提交组件
 */
export interface SubmitterProps {
	onSubmit?: () => void;
	onReset?: () => void;
	render?: (dom: ReactElement<ButtonProps>[], form: FormInstance) => JSX.Element;
}
export default function Submitter(props: SubmitterProps) {
	const { onReset, onSubmit, render } = props;
	const { loading, form } = ProFormContainer.useContainer();

	const handleReset = useRefCallback(() => {
		form.resetFields();
		onReset?.();
	});
	const handleSubmit = useRefCallback(() => {
		form.submit();
		onSubmit?.();
	});
	const dom = [
		<Button key='reset' onClick={handleReset}>
			重置
		</Button>,
		<Button key='submit' type='primary' loading={loading} onClick={handleSubmit}>
			提交
		</Button>,
	];
	if (render) return render(dom, form);
	return <Space size={4}>{dom}</Space>;
}
