import React from "react";
import { Input } from "antd";
import withFormItem from "../hocs/withFormItem";
import { ProFormInputProps } from "./interface";

function ProFormInput(props: ProFormInputProps) {
	const { render, ...rest } = props;
	const DOM = <Input {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default withFormItem(ProFormInput, {
	allowClear: true,
	placeholder: "请输入",
});
