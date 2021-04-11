import { Children, cloneElement, useImperativeHandle, useMemo, useState } from "react";
import { Button, Form, Steps } from "antd";
import StepForm from "./StepForm";
import { ProFormProps } from "@/components/Pro/Form/ProForm";
import { StepFormType, StepsFormProps } from "./interface";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import StepFormContainer from "./step-form-container";
import classNames from "classnames";
import { FormProviderProps } from "antd/lib/form/context";

function StepsForm(props: StepsFormProps) {
	const { withFormName, onFinish, children, action, ...rest } = props;

	const [current, setCurrent] = useState(0);

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
			formChildren.push(child);
		});
		formChildren = formChildren.map((child: StepFormType, index, arr) => {
			const { name, submitConfig: __submitConfig } = child.props;
			const isFirst = index === 0;
			const isLast = index === arr.length - 1;
			const submitConfig: ProFormProps["submitConfig"] = __submitConfig ?? {
				render: (dom) => (
					<div className={styles.steps_form__submitter_wrap}>
						{/* 是第一个时需要禁用 */}
						<Button disabled={isFirst} onClick={handlePreStep}>
							上一步
						</Button>
						{cloneElement(dom[1], { children: isLast ? "提交" : "下一步" })}
					</div>
				),
			};
			return cloneElement(child, { key: name ?? index, submitConfig });
		});
		return [formChildren, stepsChildren];
	}, [children, handlePreStep]);

	const handleFinish: FormProviderProps["onFormFinish"] = useRefCallback(async (name, { values: __values, forms }) => {
		// 如果是最后一个form 调用onFinish
		// 如何判断是否是最后一个 form呢?
		const nameList = Object.keys(forms);
		if (nameList[nameList.length - 1] !== name) {
			console.log(forms[name]);
			await formChildren[0].props.onFinish(__values)
			handleNextStep()
		} else {
			const values = nameList.reduce((pre, name) => {
				const formValue = forms[name].getFieldsValue();
				return withFormName ? { ...pre, [name]: formValue } : { ...pre, ...formValue };
			}, {});
			onFinish?.(values);
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
				<StepFormContainer.Provider initialState={handleNextStep}>
					<div className={styles.steps_form__form_wrap}>
						{(formChildren as StepFormType[]).map((child, index, arr) => (
							<div
								key={child.key}
								className={classNames(styles.steps_form__form, {
									[styles["steps_form__form--active"]]: index === current,
								})}
							>
								{cloneElement(child, { isLast: arr.length - index === 1, onFinish: undefined })}
							</div>
						))}
					</div>
				</StepFormContainer.Provider>
			</Form.Provider>
		</div>
	);
}
StepsForm.Step = StepForm;
StepsForm.Item = Form.Item;
export default StepsForm;
