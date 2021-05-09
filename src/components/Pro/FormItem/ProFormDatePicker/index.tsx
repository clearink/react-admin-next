import { DatePicker } from "antd";
import { forwardRef, useMemo } from "react";
import moment, { isMoment } from "moment";
import withFormItem from "../hocs/withFormItem";
import { ProFormDatePickerProps, ProFormDatePickerRef } from "./interface";
import { isNullUndefined } from "@/utils/ValidateType";

function $ProFormDatePicker(props: ProFormDatePickerProps, ref: ProFormDatePickerRef) {
	const { value: $value, ...rest } = props;
	const value = useMemo(() => {
		if (isNullUndefined($value) || isMoment($value)) return $value;
		return moment($value);
	}, [$value]);
	return <DatePicker value={value} {...rest} ref={ref} />;
}

const ProFormDatePicker = forwardRef($ProFormDatePicker) as any;

export default withFormItem<ProFormDatePickerProps>(ProFormDatePicker, {
	allowClear: true,
	style: { width: "100%" },
});
