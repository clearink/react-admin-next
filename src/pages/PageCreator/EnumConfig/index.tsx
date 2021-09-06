import React, { useRef, useState } from "react";
import { REQUEST_TYPE_CONST } from "@/configs/constant/request-type";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FieldText } from "@/components/Pro/Field";
import { ProFormInput, ProFormSelect } from "@/components/Pro/FormItem";
import { EditableTable } from "@/components/Pro/Table";
import {
	EditableColumnsType,
	EditableTableRef,
} from "@/components/Pro/Table/EditableTable/interface";
import { Button, Popconfirm } from "antd";
import CodePreview from "@/components/Company/CodePreview";

interface ApiItem {
	id: string | number;
	name: string;
	key: string;
	list: { label: string; value: string; color?: string }[];
}
const columns: EditableColumnsType<ApiItem> = [
	{
		title: "名称",
		dataIndex: "name",
		width: 200,
		read: <FieldText copyable ellipsis />,
		edit: <ProFormInput />,
	},
	{
		title: "标识",
		dataIndex: "key",
		edit: <ProFormInput />,
	},
	{
		title: "enum-list",
		dataIndex: "list",
		hideInTable: true,
		edit: <ProFormSelect field={{ valueEnum: REQUEST_TYPE_CONST.list }} />,
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
			list: [
				{ value: "male", label: "男", color: "red" },
				{ value: "female", label: "女", color: "blue" },
			],
		},
	]);
	const ref = useRef<EditableTableRef>(null);
	const handleCreate = () => {
		ref.current?.add();
	};
	return (
		<div className='flex flex-col h-full'>
			<PageHeaderWrap title='enum生成器' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<div className='text-right mb-8'>
					<Button type='primary' onClick={handleCreate} className='mr-4'>
						新增数据
					</Button>
					<Button disabled={!dataSource.length} onClick={() => {}}>
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
