import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Table } from "antd";
import { ProTableProps } from "./interface";
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
    },
];
export default function ProTablePage(props: ProTableProps) {
    return <div className='min-h-full flex flex-col'>
        <PageHeaderWrap title='pro table' />
        <main className='flex-auto bg-white mt-10 pt-6'>
            <Table columns={columns} dataSource={dataSource} />
        </main>
    </div>
}