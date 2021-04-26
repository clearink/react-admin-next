import { Table } from "antd";
import classNames from "classnames";
import { FilterForm } from "@/components/Pro/Form";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import { ProTableProps } from "./interface";
import styles from "./style.module.scss";

/**
 * TODO
 * 1. 连接form与table
 * 2. tableToolbar
 * 3. 事件处理
 */
export default function ProTables<RecordType extends object = any>(props: ProTableProps<RecordType>) {
	const { columns, dataSource, ...rest } = props;
	const [tableCol, formCol] = useFilterTableColumn(columns);
	return (
		<div className={styles.pro_table_wrap}>
			{/* 没有form col 就不要显示了 */}
			<FilterForm className={classNames({ [styles.hide_form]: !formCol })}>{formCol}</FilterForm>
			<Table
				columns={tableCol}
				dataSource={dataSource}
				{...rest}
				className={classNames(styles.table_content, rest.className)}
			/>
		</div>
	);
}
