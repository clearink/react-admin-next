import { cloneElement, isValidElement, useState } from "react";
import { Form, Input, Tooltip } from "antd";
import { EditableCellProps } from "./interface";
import { useContext } from "react";

import { EditableRowForm } from "../EditableRow";
import { useEffect } from "react";

function EditableCell(props: EditableCellProps) {
	console.log("EditableCell props", props);
	const { children, edit, record, handleSave, dataIndex, ...rest } = props;
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const form = useContext(EditableRowForm)!;
	// form.getFieldError('')

	useEffect(() => {
		if (!editing) return;
		// TODO: 更新取值方法
		form.setFieldsValue({ [dataIndex!.toString()]: record[dataIndex!.toString()] });
	}, [dataIndex, editing, form, record]);
	let element = children;
	if (!isValidElement(edit)) {
		element = children;
	} else if (editing) {
		element = (
			<Form.Item name={dataIndex} rules={[{ required: true }]}>
				<Input allowClear />
			</Form.Item>
		);
		// element = cloneElement(edit, {
		// 	onChange: async (e: any) => {
		// 		console.log("change");
		// 		setTimeout(() => {
		// 			console.log(form.getFieldError(dataIndex!));
		// 		}, 1110);
		// 	},
		// });
	} else {
		element = (
			<div className='editable-cell-wrap' onMouseEnter={() => setEditing(true)}>
				{children}
			</div>
		);
	}

	return <td {...rest}>{element}</td>;
}
export default EditableCell;
