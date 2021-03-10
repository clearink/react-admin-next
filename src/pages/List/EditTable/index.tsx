import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Table } from "antd";
import styles from "./style.module.scss";

// 单元格
function EditableCell(props:any) {}

// 行
function EditableRow(props:any) {}
export default function List() {
  return (
    <div className={styles.list_page_wrap}>
      <PageHeaderWrap title="edit table" className={styles.page_title} />
      <main className="bg-white h-screen p-5">
        <Table
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
        />
      </main>
    </div>
  );
}
