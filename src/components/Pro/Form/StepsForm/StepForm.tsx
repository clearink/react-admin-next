import ProForm, { ProFormProps } from "@/components/Pro/Form/ProForm";
import { Button, Space } from "antd";
import React, { useMemo } from "react";
import { StepFormProps } from "./interface";
import { StepFormContainer } from "./step-form-container";

function StepForm(props: StepFormProps) {
	const { children, submitConfig: __submitConfig, isFirst, isLast, ...rest } = props;
	const { loading, handleNextStep, handlePreStep } = StepFormContainer.useContainer();

	const submitConfig = useMemo(() => {
		if (__submitConfig === false) return false;
		return {
			...__submitConfig,
			render: (_, form) => {
				const dom = [
					<Button key='pre' disabled={isFirst} onClick={handlePreStep}>
						上一步
					</Button>,
					<Button key='next' type='primary' onClick={() => form.submit()} loading={loading}>
						{isLast ? "提交" : "下一步"}
					</Button>,
				];
				if (__submitConfig?.render) return __submitConfig.render(dom, form, { handleNextStep, handlePreStep, loading });
				return <Space size={4}>{dom}</Space>;
			},
		} as ProFormProps["submitConfig"];
	}, [__submitConfig, handleNextStep, handlePreStep, isFirst, isLast, loading]);

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
