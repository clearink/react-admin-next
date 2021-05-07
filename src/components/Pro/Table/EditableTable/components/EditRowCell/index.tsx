import React, {
	cloneElement,
	createElement,
	isValidElement,
	ReactElement,
	useEffect,
	useRef,
	useState,
	KeyboardEvent,
	FocusEventHandler,
} from "react";
import { Form } from "antd";
import { FormItemProps, Rule } from "antd/lib/form";
import useRefCallback from "@/hooks/state/use-ref-callback";
import classNames from "classnames";
import { EditableCellProps, EditableRowProps } from "./interface";
import { EditContainer } from "../../utils";
import styles from "./style.module.scss";
import { ProForm } from "@/components/Pro/Form";

export function EditableRow<V>(props: EditableRowProps<V>) {
	const { form: formProps, handleEdit, record, ...rest } = props;
	const [form] = Form.useForm();
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
			<EditContainer.Provider initialState={form}>
				<tr {...rest} />
			</EditContainer.Provider>
		</ProForm>
	);
}

export function EditableCell(props: EditableCellProps) {
	const { children, className, edit, name, value, ...rest } = props;

	const [editing, setEditing] = useState(false); // 是否处于编辑状态
	const form = EditContainer.useContainer(); // row 的 form

	const focusRef = useRef<any>(null); // 焦点控制

	useEffect(() => {
		if (editing) focusRef.current?.focus();
	}, [editing]);

	const toggleEdit = useRefCallback(() => {
		setEditing((p) => !p);
		// 设置字段的初始值
		if (!editing) {
			form.setFieldsValue({ [name]: value });
		}
	});

	const handleSaveRecord = useRefCallback(async () => {
		form.submit();
		toggleEdit();
	});

	// 按下enter 默认保存数据
	const handleEnter = useRefCallback((e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") handleSaveRecord();
		if (edit?.props.onKeyDown) edit.props.onKeyDown(e);
		if (edit?.props.field?.onKeyDown) edit.props.field.onKeyDown(e);
	});

	// 丢失焦点默认保存数据
	const handleBlur = useRefCallback((e: FocusEventHandler<HTMLElement>) => {
		handleSaveRecord();
		if (edit?.props.onBlur) edit.props.onBlur(e);
		if (edit?.props.field?.onBlur) edit.props.field.onBlur(e);
	});

	// 一般定义在 columns中的数据不会有ref吧

	let childNode = children;
	// 采用 Tooltip 显示错误信息
	if (edit && isValidElement(edit)) {
		const editElement = edit as ReactElement<FormItemProps>;
		const rules: Rule[] = [{ required: true, message: `${name} 不能为空` }];
		if (editElement.props.rules) {
			rules.push(...editElement.props.rules);
		}
		if (editing) {
			const props = {
				name,
				rules,
				field: {
					...(editElement.props as any).field,
					onKeyDown: handleEnter,
					onBlur: handleBlur,
					ref: focusRef,
				},
			};
			childNode = cloneElement(editElement, props);
		} else {
			const props = { onClick: toggleEdit, className: styles.edit_cell };
			childNode = createElement("div", props, children);
		}
	}

	return (
		<td {...rest} className={classNames(styles.edit_cell_wrap, className)}>
			{childNode}
		</td>
	);
}
