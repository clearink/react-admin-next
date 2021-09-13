import ProForm from "@/components/Pro/Form/ProForm";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { Button, Space } from "antd";
import { ProFormProps } from "../../../ProForm/interface";
import { StepFormContainer } from "../../utils";
import { StepFormProps, StepFormType } from "./interface";

function StepForm<V = any>(props: StepFormProps<V>) {
	const { children, renderSubmitter, loading, isFirst, isLast, title, ...rest } = props;
	const { handleNextStep, handlePreStep } = StepFormContainer.useContainer();

	type TypeRender = Required<ProFormProps>["renderSubmitter"];
	const submitter = useRefCallback<TypeRender>((dom, form) => {
		const DOM = [
			<Button key='pre' disabled={isFirst} onClick={handlePreStep}>
				上一步
			</Button>,
			<Button key='next' type='primary' onClick={() => form.submit()} loading={loading}>
				{isLast ? "提交" : "下一步"}
			</Button>,
		];
		const fieldProps = { handleNextStep, handlePreStep, loading };
		if (renderSubmitter) return renderSubmitter(DOM, form, fieldProps);
		return <Space size={4}>{DOM}</Space>;
	});
	return (
		<ProForm {...rest} renderSubmitter={submitter}>
			{children}
		</ProForm>
	);
}

StepForm.StepForm = true;
export default withDefaultProps(StepForm, {
	isFirst: true,
	isLast: false,
	loading: false,
}) as StepFormType;
