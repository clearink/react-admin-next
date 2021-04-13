import React, { Children, cloneElement, useImperativeHandle, useMemo, useState } from "react";
import { ButtonProps, Form, Steps } from "antd";
import StepForm from "./StepForm";
import { StepFormType, StepsFormProps } from "./interface";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import classNames from "classnames";
import { FormProviderProps } from "antd/lib/form/context";
import { formatFormValue } from "../../utils/format-form-value";
import useMountedRef from "@/hooks/state/use-mounted-ref";
import { StepFormContainer } from "./step-form-container";

function StepsForm(props: StepsFormProps) {
	const { onFinish, children, action, ...rest } = props;

	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false);

	const handlePreStep = useRefCallback(() => {
		setCurrent((p) => p - 1);
	});
	const handleNextStep = useRefCallback(() => {
		setCurrent((p) => p + 1);
	});

	// 暴露事件
	useImperativeHandle(action, () => ({ preStep: handlePreStep, nextStep: handleNextStep, setCurrent }), [
		handleNextStep,
		handlePreStep,
	]);

	const [formChildren, stepsChildren] = useMemo(() => {
		let formChildren: JSX.Element[] = [];
		const stepsChildren: JSX.Element[] = [];
		Children.forEach(children as StepFormType[], (child, index) => {
			if (!child.type.StepForm) return;
			const { stepProps, name } = child.props;
			stepsChildren.push(<Steps.Step key={name ?? index} {...stepProps} />);
			formChildren.push(cloneElement(child, { key: name ?? index }));
		});
		formChildren = (formChildren as StepFormType[]).map((child, index, arr) => {
			const isFirst = index === 0;
			const isLast = arr.length - index === 1;
			return cloneElement(child, { isFirst, isLast });
		});
		return [formChildren, stepsChildren];
	}, [children]);

	const mountedRef = useMountedRef();
	const handleFinish: FormProviderProps["onFormFinish"] = useRefCallback(async (name, { values, forms }) => {
		// 如果是最后一个form 调用onFinish
		// 如何判断是否是最后一个 form呢?
		const nameList = Object.keys(forms);
		const isLast = nameList[nameList.length - 1] === name;
		try {
			setLoading({ delay: 50 });
			const shouldNext = await onFinish?.(formatFormValue(values), { forms, name });
			if (!isLast && shouldNext) handleNextStep();
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	});
	return (
		<div className={styles.steps_form__wrap}>
			<div className={styles.steps_form__steps_wrap}>
				<Steps {...rest} current={current}>
					{stepsChildren}
				</Steps>
			</div>
			<Form.Provider onFormFinish={handleFinish}>
				<StepFormContainer.Provider initialState={{ loading, handlePreStep, handleNextStep }}>
					<div className={styles.steps_form__form_wrap}>
						{formChildren.map((child, index) => {
							return (
								<div
									key={child.key}
									className={classNames(styles.steps_form__form, {
										[styles["steps_form__form--active"]]: index === current,
									})}
								>
									{child}
								</div>
							);
						})}
					</div>
				</StepFormContainer.Provider>
			</Form.Provider>
		</div>
	);
}
StepsForm.Step = StepForm;
StepsForm.Item = Form.Item;
export default StepsForm;
