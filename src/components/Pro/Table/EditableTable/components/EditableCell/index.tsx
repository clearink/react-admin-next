import { isValidElement, useState, useEffect, useContext, useCallback, cloneElement } from "react";
import get from "lodash/get";
import merge from "lodash/merge";
import { EditableRowForm } from "../EditableRow";
import _internalItemRender from "./_internalItemRender";
import { EditableCellProps } from "./interface";
// import "./style.scss";

function EditableCell(props: EditableCellProps) {
	const { children, edit, record, actions, dataIndex, ...rest } = props;
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const form = useContext(EditableRowForm)!;

	// 设置 edit 的初始值
	useEffect(() => {
		if (!editing) return;
		form.setFields([{ name: dataIndex, value: get(record, dataIndex) }]);
	}, [dataIndex, editing, form, record]);

	// 自动保存数据
	const handleBlur = useCallback(async () => {
		try {
			await form.validateFields();
			actions?.current?.edit(merge({}, record, form.getFieldsValue()));
			setEditing(false);
		} catch (errors: any) {}
	}, [actions, form, record]);

	let element = children;
	if (isValidElement(edit) && !editing) {
		element = (
			<div className='editable-cell-wrap' onMouseEnter={() => setEditing(true)}>
				{children}
			</div>
		);
	} else if (isValidElement(edit) && editing) {
		element = cloneElement(edit, { preserve: false, _internalItemRender });
	}

	return (
		<td {...rest} onBlur={handleBlur}>
			{element}
		</td>
	);
}
export default EditableCell;
