import { createContext } from "react";
import { Form, FormInstance } from "antd";
import { FieldData } from "rc-field-form/lib/interface";
import { useDebounceCallback } from "@/hooks/state/use-debounce";
import ErrorEventBus from "../ErrorEventBus";
import { EditableRowProps } from "./interface";

// 提供 form 以及 save 方法
export const EditableRowForm = createContext<FormInstance | null>(null);
function EditableRow(props: EditableRowProps) {
	const [form] = Form.useForm();

	const handleFieldsChange = useDebounceCallback(100, (changeFields: FieldData[]) => {
		for (const field of changeFields) {
			if (!field.touched) continue;
			const eventType = JSON.stringify(field.name); // 保留类型
			ErrorEventBus.emit(eventType, field.errors);
		}
	});
	return (
		<Form
			form={form}
			validateTrigger='onBlur'
			component={false}
			onFieldsChange={handleFieldsChange}
		>
			<EditableRowForm.Provider value={form}>
				<tr {...props} />
			</EditableRowForm.Provider>
		</Form>
	);
}

export default EditableRow;

// 定义一个发布订阅模式用来处理字段错误 但是
