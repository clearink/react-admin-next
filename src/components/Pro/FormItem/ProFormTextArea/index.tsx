import React, { forwardRef, Ref } from "react";
import { Input } from "antd";
import withFormItem from "../hocs/withFormItem";
import { ProFormTextAreaProps } from "./interface";
import { TextAreaRef } from "antd/lib/input/TextArea";

function ProFormTextArea(props: ProFormTextAreaProps, ref: Ref<TextAreaRef>) {
	const { render, ...rest } = props;
	const DOM = <Input.TextArea ref={ref} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default withFormItem(forwardRef(ProFormTextArea), {
	allowClear: true,
	placeholder: "请输入",
});
