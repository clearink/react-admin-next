import React, { ReactElement, Ref } from "react";
import { RefSelectProps, SelectProps } from "antd/lib/select";
import { ProComponentRender, ProComponentRequest, ValueEnum } from "../../interface";
import { WithFormItemProps } from "../interface";

export interface ProFormSelectProps<VT>
	extends ProComponentRequest,
		Omit<SelectProps<VT>, "options"> {
	render?: ProComponentRender<ProFormSelectProps<ProSelectValue>>;
	ref?: Ref<RefSelectProps>;
}

declare type ProRawValue = ValueEnum["value"];
export interface ProLabeledValue {
	label: React.ReactNode;
	value: ProRawValue;

	color?: string;
	key?: string;
}
// export declare type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;
export declare type ProSelectValue =
	| ProRawValue
	| ProRawValue[]
	| ProLabeledValue
	| ProLabeledValue[];

export type ProFormSelectType = <V extends ProSelectValue = ProSelectValue>(
	props: WithFormItemProps<ProFormSelectProps<V>>
) => ReactElement;
