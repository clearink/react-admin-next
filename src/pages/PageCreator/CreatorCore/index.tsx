import PageHeaderWrap from "@/components/PageHeaderWrap";
import { EditableTable } from "@/components/Pro/Table";
import { EditableColumnsType } from "@/components/Pro/Table/EditableTable/interface";
import { ProFormDatePicker } from "@/components/Pro/FormItem";
import { DatePicker } from "antd";

const columns: EditableColumnsType<any> = [
	{
		title: "名称",
	},
	{
		title: "类型",
	},
	{
		title: "组件",
	},
	{
		title: "新增", // Switch 组件
	},
	{
		title: "编辑",
	},
];
export default function PageCreator() {
	return (
		<div className='flex flex-col h-full'>
			<PageHeaderWrap title='页面生成器' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<div className='my-4'>可以生成一个 ProTable 的页面</div>
				<ProFormDatePicker width='m'/>
				<DatePicker value={null}/>
				<EditableTable columns={columns} />
			</main>
		</div>
	);
}
