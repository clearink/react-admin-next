import { DrawerForm, ModalForm } from "@/components/Pro/Form";
import withDefaultProps from "@/hocs/withDefaultProps";
import { forwardRef, Ref } from "react";
import { ColumnFormProps, ColumnFormRef, ColumnFormType } from "./interface";

function ColumnForm<V = any>(props: ColumnFormProps<V>, ref: Ref<ColumnFormRef>) {
	const { type, children, ...rest } = props;

	if (type === "drawer") return <DrawerForm {...rest}>{children}</DrawerForm>;

	if (type === "modal") return <ModalForm {...rest}>{children}</ModalForm>;
	return <></>;
}

export default withDefaultProps(forwardRef(ColumnForm), {
	type: "modal",
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
}) as ColumnFormType;
