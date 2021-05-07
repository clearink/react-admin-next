import { isUndefined } from "@/utils/ValidateType";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { forwardRef } from "react";
import useRequest from "../../hooks/use-request";
import withFormItem from "../hocs/withFormItem";
import { ProFormSelectProps, ProFormSelectType } from "./interface";

function $ProFormSelect<VT extends SelectValue = SelectValue>(
	props: ProFormSelectProps<VT>,
	ref: ProFormSelectProps<VT>["ref"]
) {
	const { params, request, render, valueEnum: $valueEnum, ...rest } = props;

	const useProp = !isUndefined($valueEnum);
	const { data: _valueEnum, isValidating } = useRequest(params, request, useProp);
	const valueEnum = useProp ? $valueEnum : _valueEnum;

	const DOM = <Select ref={ref} loading={isValidating} {...rest} options={valueEnum as any[]} />;
	if (render) return render(DOM, props);
	return DOM;
}

const ProFormSelect = forwardRef($ProFormSelect) as any;
export default withFormItem(ProFormSelect, { allowClear: true }) as ProFormSelectType;
