import ProForm, { ProFormProps } from "@/components/Pro/Form/ProForm";
import { Button, Space } from "antd";
import React, { useMemo } from "react";
import { StepFormProps } from "./interface";
import { StepFormContainer } from "./step-form-container";

function StepForm(props: StepFormProps) {
	const { children, renderSubmitter, loading, isFirst, isLast, ...rest } = props;
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
				if (renderSubmitter) return renderSubmitter(dom, form, { handleNextStep, handlePreStep, loading });
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
StepForm.defaultProps = {
	isFirst: true,
	isLast: false,
	loading: false,
};
export default StepForm;
/**
 * 	const submitConfig: ProFormProps["submitConfig"] = __submitConfig ?? {
				render: (dom, form) => (
					<div className={styles.steps_form__submitter_wrap}>
						// 是第一个时需要禁用 
						<Button disabled={isFirst} onClick={handlePreStep}>
							上一步
						</Button>
						<Button type='primary' onClick={() => form.submit()} loading={loading}>
							{isLast ? "提交" : "下一步"}
						</Button>
					</div>
				),
			};
 */
