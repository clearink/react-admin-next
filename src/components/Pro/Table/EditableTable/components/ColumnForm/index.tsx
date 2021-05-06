import { DrawerForm, ModalForm } from "@/components/Pro/Form";
import { TimeFormatContext } from "@/components/Pro/utils/context";
import withDefaultProps from "@/hocs/withDefaultProps";
import { forwardRef, Ref } from "react";
import { ColumnFormProps, ColumnFormRef, ColumnFormType } from "./interface";

function ColumnForm<V = any>(props: ColumnFormProps<V>, ref: Ref<ColumnFormRef>) {
	const { type, children, ...rest } = props;
	const timeFormat = TimeFormatContext.useContainer();
	if (type === "drawer")
		return (
			<DrawerForm {...rest} timeFormat={timeFormat} ref={ref}>
				{children}
			</DrawerForm>
		);

	if (type === "modal")
		return (
			<ModalForm {...rest} timeFormat={timeFormat} ref={ref}>
				{children}
			</ModalForm>
		);
	return <></>;
}

export default withDefaultProps(forwardRef(ColumnForm), {
	type: "modal",
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
}) as ColumnFormType;
