import React, { useRef, useState } from "react";
import { REQUEST_TYPE_CONST } from "@/configs/constant/request-type";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FieldStatus } from "@/components/Pro/Field";
import { ProFormInput, ProFormSelect, ProFormSwitch } from "@/components/Pro/FormItem";
import { EditableTable } from "@/components/Pro/Table";
import {
	EditableColumnsType,
	EditableTableRef,
} from "@/components/Pro/Table/EditableTable/interface";
import { Button, Popconfirm, Switch } from "antd";
import CodePreview from "@/components/Company/CodePreview";
import { kebabToCamel } from "./utils";

interface ApiItem {
	id: string | number;
	name: string;
	key: string;
	type: string;
	url: string;
	params?: boolean;
}
const columns: EditableColumnsType<ApiItem> = [
	{
		title: "名称",
		dataIndex: "name",
		edit: <ProFormInput />,
		ellipsis: true,
		copyable: true,
	},
	{
		title: "标识",
		dataIndex: "key",
		edit: <ProFormInput />,
	},
	{
		title: "请求类型",
		dataIndex: "type",
		read: <FieldStatus valueEnum={REQUEST_TYPE_CONST._list} type='tag' />,
		edit: <ProFormSelect field={{ valueEnum: REQUEST_TYPE_CONST._list }} />,
	},
	{
		title: "地址",
		dataIndex: "url",
		edit: <ProFormInput />,
	},
	{
		title: "参数",
		dataIndex: "params",
		edit: <ProFormSwitch />,
		render: (dom, record) => {
			return <Switch checked={record.params} />;
		},
	},
	{
		title: "操作",
		key: "option",
		render: (dom, record, index, action) => {
			return (
				<>
					<Button
						type='link'
						size='small'
						onClick={() => {
							action.edit(record);
						}}
					>
						编辑
					</Button>
					<Popconfirm title='确定删除吗?' onConfirm={() => action.delete(record)}>
						<Button type='link' size='small' danger>
							删除
						</Button>
					</Popconfirm>
					<Button
						type='link'
						size='small'
						onClick={() => {
							action.edit(record);
						}}
					>
						预览
					</Button>
				</>
			);
		},
	},
];
/**
 export const GetNurseLevel = createFetcher("fetch-nurse-level", () =>
	http.get("/sys/dict/getDictItems/careworkerPosition")
);
key:  fetch-nurse-level
 */
export default function PageConfig() {
	const [dataSource, setDataSource] = useState<ApiItem[]>([
		{
			id: 1,
			name: "获取用户列表",
			key: "get-user-list",
			type: "get",
			url: "/a/b/user/list",
		},
	]);
	const ref = useRef<EditableTableRef>(null);
	const handleCreate = () => {
		ref.current?.add();
	};
	return (
		<div className='flex flex-col h-full'>
			<PageHeaderWrap title='api生成器' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<div className='text-right mb-8'>
					<Button type='primary' onClick={handleCreate} className='mr-4'>
						新增数据
					</Button>
					<Button
						disabled={!dataSource.length}
						onClick={() => {
							dataSource
								.map((item) => {
									const hasParams = !!item.params;
									const fnStr = `(${hasParams ? "params:any" : ""}) => http.${item.type}("${
										item.url
									}"${hasParams ? ", params" : ""})`;
									return `export const ${kebabToCamel(item.key)} = createFetcher("${
										item.key
									}",${fnStr})`;
								})
								.forEach((item) => console.log(item));
						}}
					>
						导出
					</Button>
				</div>
				<EditableTable
					ref={ref}
					columns={columns}
					dataSource={dataSource}
					onDataChange={(list) => {
						setDataSource(list);
						return true;
					}}
				/>
				<CodePreview />
			</main>
		</div>
	);
}
