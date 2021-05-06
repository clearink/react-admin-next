import { DatePicker } from "antd";
import { forwardRef, useMemo } from "react";
import moment, { isMoment } from "moment";
import withFormItem from "../hocs/withFormItem";
import { ProFormDatePickerProps, ProFormDatePickerRef } from "./interface";

function $ProFormDatePicker(props: ProFormDatePickerProps, ref: ProFormDatePickerRef) {
	const { value: $value, ...rest } = props;
	const value = useMemo(() => (isMoment($value) ? $value : moment($value)), [$value]);
	return <DatePicker value={value} {...rest} ref={ref} />;
}

const ProFormDatePicker = forwardRef($ProFormDatePicker) as any;

export default withFormItem<ProFormDatePickerProps>(ProFormDatePicker, { allowClear: true });
