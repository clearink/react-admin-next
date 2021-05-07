import React, { forwardRef, LegacyRef } from "react";
import { Input } from "antd";
import withFormItem from "../hocs/withFormItem";
import { ProFormInputProps } from "./interface";

function ProFormInput(props: ProFormInputProps, ref: LegacyRef<Input>) {
	const { render, ...rest } = props;
	const DOM = <Input ref={ref} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default withFormItem(forwardRef(ProFormInput), {
	allowClear: true,
	placeholder: "请输入",
});
