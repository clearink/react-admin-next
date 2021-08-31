const template = `
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";

// 列配置
const columns:ProColumnsType = [
<%_ schema.forEach(function(item){ _%>
  {
    title: <%- JSON.stringify(item.title) %>,
    dataIndex: <%- JSON.stringify(item.dataIndex) %>,
    <%_ if(item.search) { _%>
    search: <%- renderSearch(item.search) %>,
    <%_ } _%>
    <%_ if(item.read) { _%>
    read: <%- renderRead(item.read) %>,
    <%_ } _%>
  }
<%_ }); _%>
]

// 组件
export default function <%= name %>() {
  return (
    <div>
      <ProTable columns={columns} tableTitle={<%- JSON.stringify(tableTitle) %>} />
    </div>
  );
}


`;
export default template;
