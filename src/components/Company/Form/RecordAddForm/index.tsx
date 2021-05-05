import withDefaultProps from "@/hocs/withDefaultProps";
import { RecordAddFormProps, RecordAddFormType } from "./interface";

function RecordAddForm<V>(props: RecordAddFormProps<V>) {
	return <div>RecordAddForm</div>;
}
export default withDefaultProps(RecordAddForm, { type: "drawer" }) as RecordAddFormType;
