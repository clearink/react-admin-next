import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProTable from "@/components/Pro/ProTable";
import styles from "./style.module.scss";
export default function List() {
  return (
    <div className={styles.list_page_wrap}>
      <PageHeaderWrap title="封装的 pro list" className={styles.page_title} />
      <main className="bg-white h-screen p-5">
        {/* <ProTable
          bordered
          rowKey="id"
          ref={tableRef}
          title="床位管理"
          columns={proTableColumns}
          onSearch={formatTableSearchParams}
          request={{
            url: "/orgmgt/bed/list",
            method: "post",
            params: { buildingId, pageNo: 1, pageSize: 10 },
            transform: bsConvertTableList,
          }}
          onCreate={() => {
            addRef.current?.toggle();
          }}
          onDelete={async (values) => {
            await BedAllotApi.removeBed({ ids: values });
          }} 
        />*/}
      </main>
    </div>
  );
}
