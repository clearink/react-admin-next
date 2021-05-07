import { REQUEST_TYPE_CONST } from "@/assets/constant/request-type";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FieldStatus, FieldText } from "@/components/Pro/Field";
import { ProFormInput, ProFormSelect } from "@/components/Pro/FormItem";
import { EditableTable, ProTable } from "@/components/Pro/Table";
import {
	EditableColumnsType,
	EditableTableRef,
} from "@/components/Pro/Table/EditableTable/interface";
import { Button } from "antd";
import React, { useRef, useState } from "react";

interface ApiItem {
	id: string | number;
	name: string;
	key: string | number;
	content: string;
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
		title: "请求类型",
		dataIndex: "type",
		read: <FieldStatus valueEnum={REQUEST_TYPE_CONST.list} type='tag' />,
		edit: <ProFormSelect field={{ valueEnum: REQUEST_TYPE_CONST.list }} />,
	},
	{
		title: "内容",
		dataIndex: "content",
		edit: <ProFormInput />,
	},
];
export default function PageConfig() {
	const [dataSource, setDataSource] = useState<ApiItem[]>([]);
	const ref = useRef<EditableTableRef>(null);
	const handleCreate = () => {
		ref.current?.add();
	};
	return (
		<div className='flex flex-col h-full'>
			<PageHeaderWrap title='api生成器' />
			<main className='bg-white mt-10 p-6 flex-1'>
				{/* <ProTable columns={columns} onCreate={handleCreate} dataSource={dataSource} /> */}
				<div className='text-right mb-4'>
					<Button type='primary' onClick={handleCreate} className='mr-4'>
						新增数据
					</Button>
					<Button
						disabled={!dataSource.length}
						onClick={() => {
							dataSource
								.map((item) => {
									return `export const ${item.key} = ${item.content}; //${item.name}`;
								})
								.forEach((item) => console.log(item));
							/**
						export const GetCaptcha = (params: any) => http.get("/orgmgt/sendCaptchaOrg", params);
						 */
						}}
					>
						导出
					</Button>
				</div>
				<EditableTable
					ref={ref}
					columns={columns}
					dataSource={dataSource}
					type='modal'
					onDataChange={(list) => {
						console.log("list", list);
						// 重复的 key 剔除
						setDataSource(list);
					}}
				/>
			</main>
		</div>
	);
}
