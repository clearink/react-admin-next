import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { forwardRef } from "react";
import useRequest from "../../hooks/use-request";
import { checkLocalData } from "../../utils";
import withFormItem from "../hocs/withFormItem";
import { ProFormSelectProps, ProFormSelectType } from "./interface";

function ProFormSelect<VT extends SelectValue = SelectValue>(
	props: ProFormSelectProps<VT>,
	ref: ProFormSelectProps<VT>["ref"]
) {
	const { params, request, render, valueEnum: $valueEnum, options, ...rest } = props;

	const useLocal = checkLocalData(props, "valueEnum", "options");
	const { data: _valueEnum, isValidating } = useRequest(params, request, useLocal);
	const valueEnum = useLocal ? $valueEnum ?? options : _valueEnum;

	const DOM = <Select ref={ref} options={valueEnum as any} loading={isValidating} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}

export default withFormItem(forwardRef(ProFormSelect), { allowClear: true }) as ProFormSelectType;
