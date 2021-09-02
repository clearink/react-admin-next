import { cloneElement, isValidElement, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Form, Input, Tooltip } from "antd";
import { EditableCellProps } from "./interface";
import { EditableRowForm } from "../EditableRow";
import "./style.scss";
import { useDebounceCallback } from "@/hooks/state/use-debounce";

function EditableCell(props: EditableCellProps) {
	console.log("EditableCell props", props);
	const { children, edit, record, handleSave, dataIndex, ...rest } = props;
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const form = useContext(EditableRowForm)!;

	const handleGetFieldError = useDebounceCallback(150, () => {
		console.log("error", form.getFieldError(dataIndex!));
		return {};
	});
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
			<Form.Item
				name={dataIndex}
				rules={[
					{
						required: true,
						message: "请输入",
					},
					{
						type: "email",
					},
				]}
			>
				<Input allowClear onPressEnter={() => setEditing(false)} />
			</Form.Item>
		);
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
