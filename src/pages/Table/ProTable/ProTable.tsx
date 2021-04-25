import { ProTableProps } from "./interface";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import { Table } from "antd";

export default function ProTables<RecordType extends object = any>(props: ProTableProps<RecordType>) {
    const { columns, dataSource, ...rest } = props;
    const [tableCol, formCol] = useFilterTableColumn(columns);
    return <>
        <Table columns={tableCol} dataSource={dataSource} {...rest} />
    </>

}