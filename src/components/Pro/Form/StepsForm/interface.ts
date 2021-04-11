import React, { Ref } from "react";
import { StepProps, StepsProps } from "antd";
import { ProFormProps } from "@/components/Pro/Form/ProForm";

export interface StepsFormProps extends StepsProps {
	children?: React.ReactNode;
	withFormName?: boolean;
	timeFormat?: string;
	/** 最后一个 step 提交时调用 */
	onFinish?: (values: any) => void;
	action?: Ref<StepsFormRef>;
}
export interface StepsFormRef {
	preStep: () => void;
	nextStep: () => void;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

export interface StepFormProps<Values = any> extends Omit<ProFormProps<Values>, "onFinish"> {
	name: string;
	onFinish?: (values: Values) => Promise<boolean> | boolean;
	stepProps?: StepProps;
	isLast?: boolean;
}

export type StepFormType = React.ReactElement<StepFormProps, React.ComponentType<any> & { StepForm: boolean }>;
