import {
	isValidElement,
	useState,
	useEffect,
	useContext,
	Key,
	cloneElement,
	useCallback,
} from "react";
import useDeepEffect from "@/hooks/state/use-deep-effect";
import get from "lodash/get";
import merge from "lodash/merge";
import { EditableRowForm } from "../EditableRow";
import ErrorEventBus from "../ErrorEventBus";
import EditableFormErrorTooltip from "../EditableFormErrorToolTip";
import { EditableCellProps } from "./interface";
import "./style.scss";

function EditableCell(props: EditableCellProps) {
	const { children, edit, record, actions, dataIndex, ...rest } = props;
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const [errorList, setErrorList] = useState<string[]>([]); // 错误列表
	const form = useContext(EditableRowForm)!;

	// 设置 edit 的初始值
	useEffect(() => {
		if (!editing) return;
		form.setFields([{ name: dataIndex, value: get(record, dataIndex) }]);
	}, [dataIndex, editing, form, record]);

	// 是否需要显示错误值
	useDeepEffect(() => {
		if (!dataIndex) return;
		const eventType = JSON.stringify(([] as Key[]).concat(dataIndex));
		if (ErrorEventBus.has(eventType)) return;
		const event = (errorList?: string[]) => {
			setErrorList(errorList!);
		};
		ErrorEventBus.on(eventType, event);
		return () => {
			ErrorEventBus.off(eventType, event);
		};
	}, [dataIndex]);

	// 自动保存数据
	const handleBlur = useCallback(async () => {
		try {
			await form.validateFields();
			actions?.current?.edit(merge({}, record, form.getFieldsValue()));
			setEditing(false);
		} catch (errors: any) {
			type ErrorType = { errors: string[]; name: Key[] | Key };
			errors?.errorFields?.forEach((error: ErrorType) => {
				ErrorEventBus.emit(JSON.stringify(error.name), error.errors);
			});
		}
	}, [actions, form, record]);

	let element = children;
	if (isValidElement(edit) && !editing) {
		element = (
			<div className='editable-cell-wrap' onMouseEnter={() => setEditing(true)}>
				{children}
			</div>
		);
	} else if (isValidElement(edit) && editing) {
		element = <EditableFormErrorTooltip errors={errorList}>{edit}</EditableFormErrorTooltip>;
	}

	return (
		<td {...rest} onBlur={handleBlur}>
			{element}
		</td>
	);
}
export default EditableCell;
