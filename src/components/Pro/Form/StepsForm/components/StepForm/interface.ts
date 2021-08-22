import { ButtonProps, FormInstance, StepProps } from "antd";
import { ComponentType, ReactElement } from "react";
import { ProFormProps } from "../../../ProForm/interface";

type TRenderSubmitter = (
	dom: ReactElement<ButtonProps>[],
	form: FormInstance,
	props: {
		loading: ButtonProps["loading"];
		handlePreStep: () => void;
		handleNextStep: () => void;
	}
) => JSX.Element;
export interface StepFormProps<Values = any> extends Omit<ProFormProps<Values>, "renderSubmitter"> {
	name: string;
	loading?: ButtonProps["loading"];
	/** 不在 StepForm中起作用 */
	stepProps?: StepProps;
	renderSubmitter?: TRenderSubmitter;
	isFirst?: boolean;
	isLast?: boolean;
}

export type StepFormType = <V = any>(
	props: StepFormProps<V>
) => ReactElement<StepFormProps<V>, ComponentType<any> & { StepForm: boolean }>;
