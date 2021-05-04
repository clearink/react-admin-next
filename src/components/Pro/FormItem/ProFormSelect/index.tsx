import useFetch from "@/hooks/state/use-fetch";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import useRequest from "../../hooks/use-request";
import withFormItem from "../hocs/withFormItem";
import { ProFormSelectProps } from "./interface";

function ProFormSelect<VT extends SelectValue>(props: ProFormSelectProps<VT>) {
	const { params, request, render, valueEnum: $valueEnum, ...rest } = props;
	
	const shouldFetch = !props.hasOwnProperty("valueEnum");

	const { data: _valueEnum, isValidating } = useRequest(params!, shouldFetch ? request : null);
	const valueEnum = shouldFetch ? _valueEnum : $valueEnum;
	
	const DOM = <Select options={valueEnum} loading={isValidating} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default withFormItem(ProFormSelect);
