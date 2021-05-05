import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import useRequest from "../../hooks/use-request";
import withFormItem from "../hocs/withFormItem";
import { checkLocalData } from "../utils";
import { ProFormSelectProps } from "./interface";

function ProFormSelect<VT extends SelectValue>(props: ProFormSelectProps<VT>) {
	const { params, request, render, valueEnum: $valueEnum, options, ...rest } = props;

	const useLocal = checkLocalData(props, "valueEnum", "options");
	const { data: _valueEnum, isValidating } = useRequest(params, request, useLocal);
	const valueEnum = useLocal ? $valueEnum ?? options : _valueEnum;

	const DOM = <Select options={valueEnum} loading={isValidating} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
// TODO 处理泛型问题
export default withFormItem(ProFormSelect);
