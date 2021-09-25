import { createContext } from "react";
import { Form, FormInstance } from "antd";
import { EditableRowProps } from "./interface";

// 提供 form 以及 save 方法
export const EditableRowForm = createContext<FormInstance | null>(null);
function EditableRow(props: EditableRowProps) {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableRowForm.Provider value={form}>
				<tr {...props} />
			</EditableRowForm.Provider>
		</Form>
	);
}

export default EditableRow;

// 定义一个发布订阅模式用来处理字段错误 但是
