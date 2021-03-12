import PageHeaderWrap from "@/components/PageHeaderWrap";
import EditTable from "./EditTale";
import styles from "./style.module.scss";

export default function List() {
  return (
    <div className={styles.list_page_wrap}>
      <PageHeaderWrap title="page title" className={styles.page_title} />
      <main className="bg-white h-screen p-5">
        <EditTable />
      </main>
    </div>
  );
}
