import { Form, FormItemProps } from "antd";
// import { cloneElement } from "react";
export interface ColumnFormItemProps extends FormItemProps {
	edit: JSX.Element;
}
// label: title, edit, name: dataIndex, ...formItemProps })
export function renderColumnForm(tableColumns: ColumnFormItemProps[]) {
	return tableColumns.map((item, i) => {
		const { edit, ...rest } = item;
		const rules = rest.rules ?? [{ required: true, message: `${rest.label} 不能为空` }];
		return (
			<Form.Item key={i} {...rest} rules={rules}>
				{edit}
			</Form.Item>
		);
		// 将来使用 proFormInput等控件时就用这样的方法
		// return cloneElement(edit, { key: i, rules, ...rest });
	});
}
