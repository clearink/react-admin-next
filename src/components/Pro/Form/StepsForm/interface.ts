import React, { ReactElement, Ref } from "react";
import { ButtonProps, FormInstance, StepProps, StepsProps } from "antd";
import { ProFormProps } from "@/components/Pro/Form/ProForm";

interface FormFinishInfo {
	name: string;
	forms: FormInstance[];
}
export interface StepsFormProps extends StepsProps {
	children?: React.ReactNode;
	timeFormat?: string;
	/** 表单提交时调用 */
	onFinish?: (values: any, info: FormFinishInfo) => boolean | Promise<boolean>;
	action?: Ref<StepsFormRef>;
}
export interface StepsFormRef {
	preStep: () => void;
	nextStep: () => void;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

interface StepFormSubmitterProps {
	onSubmit?: () => void;
	onReset?: () => void;
	render?: (
		dom: ReactElement<ButtonProps>[],
		form: FormInstance,
		props: {
			loading: ButtonProps["loading"];
			handlePreStep: () => void;
			handleNextStep: () => void;
		}
	) => JSX.Element;
}
export interface StepFormProps<Values = any> extends Omit<ProFormProps<Values>, "submitConfig"> {
	name: string;
	stepProps?: StepProps;
	submitConfig?: StepFormSubmitterProps | false;
	isFirst: boolean;
	isLast: boolean;
}

export type StepFormType = React.ReactElement<StepFormProps, React.ComponentType<any> & { StepForm: boolean }>;
