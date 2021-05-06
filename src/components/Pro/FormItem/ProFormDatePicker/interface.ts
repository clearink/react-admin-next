import { DatePickerProps } from "antd";
import { PickerBaseProps } from "antd/lib/date-picker/generatePicker";
import { Component, LegacyRef } from "react";
import { Moment } from "moment";

export type ProFormDatePickerProps = DatePickerProps;
export type ProFormDatePickerRef = LegacyRef<Component<PickerBaseProps<Moment>>>;
