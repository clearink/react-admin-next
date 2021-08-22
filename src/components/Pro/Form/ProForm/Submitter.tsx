import { Button, Space } from "antd";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { ProFormContainer } from "./utils";
import { SubmitterProps } from "./interface";

/**
 *
 * 表单提交组件
 */
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
		<Button key='reset' onClick={handleReset} disabled={!!loading}>
			重置
		</Button>,
		<Button key='submit' type='primary' loading={loading} onClick={handleSubmit}>
			提交
		</Button>,
	];
	if (render) return <>{render(dom, form)}</>;
	return <Space size={8}>{dom}</Space>;
}
