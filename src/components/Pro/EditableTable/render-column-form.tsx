import { Form, FormItemProps } from "antd";

export interface ColumnFormItemProps<RecordType extends object = any> extends FormItemProps {
	dataIndex: any;
	edit: JSX.Element;
	title: string;
	handleSave: (record: RecordType) => void;
}
export function renderColumnForm<RecordType extends object = any>(tableColumns: ColumnFormItemProps<RecordType>[]) {
	return tableColumns.map((item) => {
		const { title, dataIndex, handleSave, edit, ...rest } = item;
		const rules = rest.rules ?? [{ required: true, message: `${dataIndex} 不能为空` }];
		return (
			<Form.Item key={dataIndex} {...rest} rules={rules} name={dataIndex} label={title ?? dataIndex}>
				{edit}
			</Form.Item>
		);
	});
}
