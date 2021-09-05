import { isValidElement, useState, useEffect, useContext } from "react";
import useDeepEffect from "@/hooks/state/use-deep-effect";

import { EditableCellProps } from "./interface";
import { EditableRowForm } from "../EditableRow";
import "./style.scss";
import ErrorEventBus from "../ErrorEventBus";
import EditableFormErrorTooltip from "../EditableFormErrorToolTip";
import { cloneElement } from "react";

function EditableCell(props: EditableCellProps) {
	const { children, edit, record, handleSave, dataIndex, ...rest } = props;
	const [editing, setEditing] = useState(false); // 是否处于编辑状态 
	const [errorList, setErrorList] = useState<string[]>([]); // 错误列表
	const form = useContext(EditableRowForm)!;

	// 设置 edit 的初始值
	useEffect(() => {
		if (!editing) return;
		// TODO: 更新取值方法
		form.setFieldsValue({ [dataIndex!.toString()]: record[dataIndex!.toString()] });
	}, [dataIndex, editing, form, record]);

	// 是否需要显示错误值
	useDeepEffect(() => {
		if (ErrorEventBus.has(dataIndex)) return;
		const event = (errorList?: string[]) => {
			setErrorList(errorList!); 
		};
		ErrorEventBus.on(dataIndex, event);
		return () => {
			ErrorEventBus.off(dataIndex, event);
		};
	}, [dataIndex]);

	let element = children;
	if (isValidElement(edit) && !editing) {
		element = (
			<div className='editable-cell-wrap' onMouseEnter={() => setEditing(true)}>
				{children}
			</div>
		);
	} else if (isValidElement(edit) && editing) {
		// 失去焦点则自动保存
		// const editElement = cloneElement(edit,{onBlur:})
		element = <EditableFormErrorTooltip errors={errorList}>{edit}</EditableFormErrorTooltip>;
	}

	return <td {...rest}>{element}</td>;
}
export default EditableCell;
