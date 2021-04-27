import { FieldText } from "@/components/Pro/Field";
import { Tooltip } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import React, { cloneElement, isValidElement } from "react";
import { ProColumnsType } from "../interface";

// TODO: 根据columns 分析出默认的 filters 与 sorter
export default function useFilterTableColumn<T extends object = any>(columns: ProColumnsType<T> = []) {
	const tableCol: ColumnsType<T> = [];
	const formCol: JSX.Element[] = [];
	for (let i = 0; i < columns.length; i++) {
		const item = columns[i];

		const { search, read, render, hideInForm, hideInTable, label, props: _props, ...rest } = item;
		if (search && !hideInForm && isValidElement(search)) {
			// TODO: 处理 ProGroupColumn
			const props = {
				label: label ?? item.title,
				name: item["dataIndex"],
				key: item["dataIndex"] as React.Key,
				..._props,
				...(search.props as any),
			};
			formCol.push(cloneElement(search, props));
		}
		if (!hideInTable) {
			const readElement = read ?? <FieldText />;
			const colItem: ColumnType<T> = {
				...rest,
				render: (value, record, index) => {
					let dom = cloneElement(readElement, { text: value });
					// 如果使用省略 默认包裹一层 tooltip
					if (dom.props.ellipsis) {
						dom = <Tooltip title={value}>{dom}</Tooltip>;
						/* TODO: 待测试
                        {cloneElement(dom, {
                                style: { width: rest.width },
                            })} */
					}
					if (render) return render(<></>, value, record, index);
					return dom;
				},
			};
			tableCol.push(colItem);
		}
	}
	return [tableCol, formCol] as const;
}
