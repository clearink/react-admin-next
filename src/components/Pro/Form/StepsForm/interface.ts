import React, { Ref } from "react";
import { FormInstance, StepsProps } from "antd";

interface FormFinishInfo {
	name: string;
	forms: FormInstance[];
}
export interface StepsFormProps<V = any> extends StepsProps {
	children?: React.ReactNode;
	timeFormat?: string;
	/** 表单提交时调用 */
	onFinish?: (values: V, info: FormFinishInfo) => boolean | Promise<boolean>;
	action?: Ref<StepsFormRef>;
}
export interface StepsFormRef {
	preStep: () => void;
	nextStep: () => void;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
