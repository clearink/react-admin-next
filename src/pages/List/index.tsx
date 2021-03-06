import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProList from "@/components/ProList";
import styles from "./style.module.scss";
export default function List() {
  return (
    <div className={styles.list_page_wrap}>
      <PageHeaderWrap title="封装的 pro list" className={styles.page_title} />
      <main className="bg-white h-screen p-5">
        <ProList />
      </main>
    </div>
  );
}
