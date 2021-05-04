import { SelectProps, SelectValue } from "antd/lib/select";
import { ProComponentRender, ProComponentRequest } from "../../interface";

export interface ProFormSelectProps<VT extends SelectValue>
	extends ProComponentRequest,
		SelectProps<VT> {
	render?: ProComponentRender<ProFormSelectProps<VT>>;
}
