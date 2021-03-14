import { cloneElement, createElement, isValidElement, useEffect, useRef, useState } from "react";
import { Form, FormItemProps } from "antd";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { EditContainer } from "./edit-table-container";
import styles from "./style.module.scss";
import classNames from "classnames";
import { Rule } from "rc-field-form/lib/interface";
import { formatFormValue } from "../utils/format-form-value";
import { TimeFormatContext } from "../utils/context";

interface EditableRowProps {
	className?: string;
}
export function EditableRow(props: EditableRowProps) {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditContainer.Provider initialState={{ form }}>
				<tr {...props} />
			</EditContainer.Provider>
		</Form>
	);
}

interface EditableCellProps {
	children: React.ReactNode;
	edit?: JSX.Element;
	formItemProps: FormItemProps;
	dataIndex: string;
	className?: string;
	record: any;
	handleSave: (record: any) => void;
}

export function EditableCell(props: EditableCellProps) {
	// console.log(" EditableCell", props);
	const { children, edit, dataIndex, record, handleSave, formItemProps, ...rest } = props;
	const timeFormat = TimeFormatContext.useContainer();
	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const { form } = EditContainer.useContainer();
	const editRef = useRef<any>(null);
	useEffect(() => {
		if (editing) editRef.current?.focus();
	}, [editing]);

	const toggleEdit = () => {
		setEditing((p) => !p);
		// 设置初始值
		form.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const handleSaveRecord = async () => {
		try {
			const values = await form.validateFields();
			handleSave({ ...record, ...formatFormValue(values, timeFormat) });
			toggleEdit();
		} catch (error) {}
	};

	// 按下enter 默认保存数据
	const handleEnter = useRefCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") handleSaveRecord();
		if (edit?.props.onKeyDown) edit.props.onKeyDown(e);
	});

	// 丢失焦点默认保存数据
	const handleBlur = useRefCallback((e: React.FocusEventHandler<HTMLElement>) => {
		handleSaveRecord();
		if (edit?.props.onBlur) edit.props.onBlur(e);
	});

	// 一般定义在 columns中的数据不会有ref吧

	let childNode = children;
	// 采用 Tooltip 显示错误信息
	if (edit && isValidElement<any>(edit)) {
		const rules: Rule[] = formItemProps.rules ?? [{ required: true, message: `${dataIndex} 不能为空` }];
		if (editing)
			childNode = (
				<Form.Item name={dataIndex} {...formItemProps} rules={rules}>
					{cloneElement(edit, {
						...edit.props,
						onKeyDown: handleEnter,
						onBlur: handleBlur,
						name: dataIndex,
						ref: editRef,
					})}
				</Form.Item>
			);
		else childNode = createElement("div", { onClick: toggleEdit, className: styles.edit_cell }, children);
	}

	return (
		<td {...rest} className={classNames(styles.edit_cell_wrap, rest.className)}>
			{childNode}
		</td>
	);
}
