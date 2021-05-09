import React, { forwardRef, Ref } from "react";
import { Switch } from "antd";
import withFormItem from "../hocs/withFormItem";
import { ProFormSwitchProps } from "./interface";

function ProFormSwitch(props: ProFormSwitchProps, ref: Ref<HTMLElement>) {
	const { render, value, ...rest } = props;
	const DOM = <Switch ref={ref} checked={value} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default withFormItem(forwardRef(ProFormSwitch), { defaultChecked: false });
