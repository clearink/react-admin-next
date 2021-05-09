import React, { cloneElement, isValidElement, ReactElement, useState } from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import classNames from "classnames";
import { EditableCellProps, EditableRowProps } from "./interface";
import { EditContainer } from "../../utils";
import styles from "./style.module.scss";
import { ProForm } from "@/components/Pro/Form";

export function EditableRow<V>(props: EditableRowProps<V>) {
	const { form: formProps, handleEdit, record, ...rest } = props;
	const [form] = Form.useForm(formProps?.form);
	const [editing, setEditing] = useState(!false);
	const handleFinish = (values: V) => {
		handleEdit({ ...record, ...values });
	};
	return (
		<ProForm
			form={form}
			component={false}
			{...formProps}
			submitConfig={false}
			onFinish={handleFinish}
		>
			<EditContainer.Provider initialState={{ form, editing }}>
				<tr {...rest} />
			</EditContainer.Provider>
		</ProForm>
	);
}

export function EditableCell(props: EditableCellProps) {
	console.log('EditableCell',props);
	const { children, className, edit, name, value, ...rest } = props;

	// 是否处于编辑状态 现在需要外部传入了
	const { editing, form } = EditContainer.useContainer();

	// 一般定义在 columns中的数据不会有ref吧

	let childNode = children;
	// 采用 Tooltip 显示错误信息
	if (isValidElement(edit) && editing) {
		childNode = edit;
	}

	return (
		<td {...rest} className={classNames(styles.edit_cell_wrap, className)}>
			{childNode}
		</td>
	);
}
