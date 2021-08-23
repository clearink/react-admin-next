import { FilterFormProps } from "@/components/Pro/Form/FilterForm/interface";
import { ButtonProps } from "antd";
import { ReactNode } from "react";
import { ProTableProps, ProTableRef } from "../../interface";

export interface TableSearchProps<RT extends object = any> extends FilterFormProps<RT> {
	render?: (dom: JSX.Element, actions: ProTableRef<RT>) => ReactNode;
	className?: string;
	pagination?: ProTableProps<RT>["pagination"];
	onTableChange?: ProTableProps<RT>["onChange"];
	fetchLoading: ButtonProps["loading"];
	usePropData: boolean;
}
