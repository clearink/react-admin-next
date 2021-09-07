import {
	isValidElement,
	useState,
	useEffect,
	useContext,
	Key,
	cloneElement,
	useCallback,
	useMemo,
} from "react";
import { Form } from "antd";
import get from "lodash/get";
import { EditableRowForm } from "../EditableRow";
import EditableFormErrorTooltip from "../EditableFormErrorToolTip";
import { EditableCellProps, ItemRenderType } from "./interface";
import "./style.scss";

function EditableCell(props: EditableCellProps) {
	const { children, edit, record, actions, dataIndex, ...rest } = props;
	// console.log("EditableCell props", props);
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const [errorList, setErrorList] = useState<string[]>([]); // 错误列表
	const form = useContext(EditableRowForm)!;

	// 设置 edit 的初始值
	useEffect(() => {
		if (!editing) return;
		form.setFields([{ name: dataIndex, value: get(record, dataIndex) }]);
	}, [dataIndex, editing, form, record]);

	// Form.Item 自身的render方法
	const _internalItemRender = useMemo<ItemRenderType>(() => {
		return {
			mark: "pro_table_render",
			render: (inputProps, { input, errorList, extra }) => {
				console.log("inputProps, { input, errorList, extra }", inputProps, {
					input,
					errorList,
					extra,
				});
				return (
					<EditableFormErrorTooltip
						touched={inputProps.touched}
						validating={inputProps.validating}
						errors={errorList}
					>
						{input}
						{extra}
					</EditableFormErrorTooltip>
				);
			},
		};
	}, []);

	// 自动保存数据
	const handleBlur = useCallback(
		async (...args: any[]) => {
			edit?.props.onBlur?.(...args);
			try {
				await form.validateFields();
				actions?.current?.edit(record, form.getFieldsValue());
			} catch (errors) {
				console.log(errors);
			}
		},
		[actions, edit?.props, form, record]
	);

	let element = children;
	if (isValidElement(edit) && !editing) {
		element = (
			<div className='editable-cell-wrap' onMouseEnter={() => setEditing(true)}>
				{children}
			</div>
		);
	} else if (isValidElement(edit) && editing) {
		element = cloneElement(edit, { onBlur: handleBlur, _internalItemRender });
	}

	return <td {...rest}>{element}</td>;
}
export default EditableCell;
