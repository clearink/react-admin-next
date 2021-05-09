import { DrawerForm, ModalForm } from "@/components/Pro/Form";
import withDefaultProps from "@/hocs/withDefaultProps";
import { forwardRef, Ref } from "react";
import { ColumnFormProps, ColumnFormRef, ColumnFormType } from "./interface";

function ColumnForm<V = any>(props: ColumnFormProps<V>, ref: Ref<ColumnFormRef>) {
	const { type, ...rest } = props;
	if (type === "drawer") return <DrawerForm {...rest} ref={ref} />;
	if (type === "modal") return <ModalForm {...rest} ref={ref} />;
	return <></>;
}

export default withDefaultProps(forwardRef(ColumnForm), {
	type: "modal",
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
}) as ColumnFormType;
