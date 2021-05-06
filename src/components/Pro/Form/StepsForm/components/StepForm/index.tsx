import ProForm from "@/components/Pro/Form/ProForm";
import withDefaultProps from "@/hocs/withDefaultProps";
import { Button, Space } from "antd";
import React, { useMemo } from "react";
import { ProFormProps } from "../../../ProForm/interface";
import { StepFormContainer } from "../../utils";
import { StepFormProps, StepFormType } from "./interface";

function StepForm<V = any>(props: StepFormProps<V>) {
	const { children, renderSubmitter, loading, isFirst, isLast, stepProps, ...rest } = props;
	const { handleNextStep, handlePreStep } = StepFormContainer.useContainer();
	const submitConfig = useMemo(() => {
		if (renderSubmitter === false) return false;
		return {
			render: (_, form) => {
				const dom = [
					<Button key='pre' disabled={isFirst} onClick={handlePreStep}>
						上一步
					</Button>,
					<Button key='next' type='primary' onClick={() => form.submit()} loading={loading}>
						{isLast ? "提交" : "下一步"}
					</Button>,
				];
				if (renderSubmitter)
					return renderSubmitter(dom, form, { handleNextStep, handlePreStep, loading });
				return <Space size={4}>{dom}</Space>;
			},
		} as ProFormProps["submitConfig"];
	}, [renderSubmitter, handleNextStep, handlePreStep, isFirst, isLast, loading]);

	return (
		<ProForm {...rest} submitConfig={submitConfig}>
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
