import { DrawerForm, ModalForm } from "@/components/Pro/Form";
import withDefaultProps from "@/hocs/withDefaultProps";
import { forwardRef, Ref } from "react";
import { RecordFormRef } from "../interface/record-form";
import { RecordAddFormProps, RecordAddFormType } from "./interface";

function RecordAddForm<V = any>(props: RecordAddFormProps<V>, ref: Ref<RecordFormRef>) {
	const { type, ...rest } = props;
	if (type === "drawer") return <DrawerForm {...rest} ref={ref} />;
	if (type === "modal") return <ModalForm {...rest} ref={ref} />;
	return <></>;
}

export default withDefaultProps(forwardRef(RecordAddForm), {
	type: "modal",
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
}) as RecordAddFormType;
