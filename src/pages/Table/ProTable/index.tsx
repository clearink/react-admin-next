import PageHeaderWrap from "@/components/PageHeaderWrap";
import useTitle from "@/hooks/ui/use-title";
import { Button, Form, Input, Table } from "antd";
import { ColumnType, ColumnsType } from "antd/lib/table";
import { ProColumnsType, ProTableProps } from "./interface";
import ProTables from "./ProTable";
const dataSource = [
	{
		key: "1",
		name: "胡彦斌",
		age: 32,
		address: "西湖区湖底公园1号",
	},
	{
		key: "2",
		name: "胡彦祖",
		age: 42,
		address: "西湖区湖底公园1号",
	},
];
const columns: ProColumnsType<typeof dataSource[0]> = [
	{
		title: (props) => {
			console.log(props);
			return "姓名";
		},
		dataIndex: "name",
		key: "name",
		search: (
			<Form.Item label="姓名">
				<Input />
			</Form.Item>
		),
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "住址",
		dataIndex: "address",
	},
];
export default function ProTablePage(props: ProTableProps) {
	useTitle("增强表格");
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='pro table' />
			<main className='flex-auto bg-white mt-10'>
				{/* <Table columns={columns} bordered dataSource={dataSource} /> */}
				<ProTables columns={columns as any} bordered dataSource={dataSource} />
			</main>
		</div>
	);
}
