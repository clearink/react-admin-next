import withDefaultProps from "@/hocs/withDefaultProps";
import { FormLayout } from "antd/lib/form/Form";
import { createElement, forwardRef, Ref } from "react";
import DrawerForm, { DrawerFormProps, DrawerFormRef } from "../DrawerForm";
import ModalForm from "../ModalForm";
import { TitleTipProps } from "../TitleTip";
import { TimeFormatContext } from "../utils/context";
import { renderColumnForm } from "./render-column-form";

export interface ColumnFormProps {
	type: "cell" | "modal" | "drawer";
	title?: TitleTipProps["title"];
	columns: any[];
	onFinish: DrawerFormProps["onFinish"];
	labelCol: DrawerFormProps["labelCol"];
	wrapperCol: DrawerFormProps["wrapperCol"];
}
export interface ColumnFormRef extends DrawerFormRef {}
function ColumnForm(props: ColumnFormProps, ref: Ref<ColumnFormRef>) {
	const { type, columns, ...rest } = props;
	const timeFormat = TimeFormatContext.useContainer();
	if (type === "drawer") return createElement(DrawerForm, { ...rest, timeFormat, ref }, renderColumnForm(columns));

	if (type === "modal") return createElement(ModalForm, { ...rest, timeFormat, ref }, renderColumnForm(columns));
	return <></>;
}

export default withDefaultProps(forwardRef(ColumnForm), {
	type: "modal",
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
});
