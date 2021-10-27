import React, { Children, cloneElement, useImperativeHandle, useMemo, useState } from "react";
import { ButtonProps, Form, Steps } from "antd";
import StepForm from "./components/StepForm";
import { StepsFormProps } from "./interface";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import cls from "classnames";
import { FormProviderProps } from "antd/lib/form/context";
import { formatFormValue } from "../../utils/format-form-value";
import { StepFormContainer } from "./utils";
import { StepFormType } from "./components/StepForm/interface";

function StepsForm<V = any>(props: StepsFormProps<V>) {
	const { onFinish, children, action, ...rest } = props;

	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false);
	const [nameList, setNameList] = useState<string[]>([]); // 根据顺序存储 form 的name 属性

	const handlePreStep = useRefCallback(() => {
		setCurrent((p) => p - 1);
	});
	const handleNextStep = useRefCallback(() => {
		setCurrent((p) => p + 1);
	});

	// 暴露事件
	useImperativeHandle(
		action,
		() => ({ preStep: handlePreStep, nextStep: handleNextStep, setCurrent }),
		[handleNextStep, handlePreStep]
	);

	const [formChildren, stepsChildren] = useMemo(() => {
		let formChildren: JSX.Element[] = [];
		const stepsChildren: JSX.Element[] = [];
		const newNameList = Children.map(
			children as ReturnType<StepFormType>[],
			(child) => child.props.name
		).filter((name) => !!name);
		setNameList(newNameList); // 一定要根据顺序存放

		Children.forEach(children as ReturnType<StepFormType>[], (child, index) => {
			if (!child.type.StepForm) return;
			const { stepProps, name, title } = child.props;
			stepsChildren.push(<Steps.Step key={name ?? index} title={title} {...stepProps} />);
			formChildren.push(cloneElement(child, { key: name ?? index }));
		});
		formChildren = (formChildren as ReturnType<StepFormType>[]).map((child, index, arr) => {
			const isFirst = index === 0;
			const isLast = arr.length - index === 1;
			return cloneElement(child, { isFirst, isLast });
		});
		return [formChildren, stepsChildren];
	}, [children]);

	const handleFinish: FormProviderProps["onFormFinish"] = useRefCallback(
		async (name, { values, forms }) => {
			// 如果是最后一个form 调用onFinish
			// 如何判断是否是最后一个 form呢?
			const isLast = nameList[nameList.length - 1] === name;
			try {
				setLoading({ delay: 50 });
				const shouldNext = await onFinish?.(formatFormValue(values), { name, forms: forms as any });
				if (!isLast && shouldNext) handleNextStep();
			} finally {
				setLoading(false);
			}
		}
	);
	return (
		<div className={styles.steps_form__wrap}>
			<div className={styles.steps_form__steps_wrap}>
				<Steps {...rest} current={current}>
					{stepsChildren}
				</Steps>
			</div>
			<Form.Provider onFormFinish={handleFinish}>
				<StepFormContainer.Provider initialState={{ handlePreStep, handleNextStep }}>
					<div className={styles.steps_form__form_wrap}>
						{formChildren.map((child: ReturnType<StepFormType>, index) => {
							const active = index === current;
							return (
								<div
									key={child.key}
									className={cls(
										styles.steps_form__form,
										index === current && styles["steps_form__form--active"]
									)}
								>
									{cloneElement(child, { loading: active ? loading : false })}
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
