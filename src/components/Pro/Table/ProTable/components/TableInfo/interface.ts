import { ReactNode } from "react";
import { ProTableRef } from "../../interface";

export interface TableInfoProps<RT extends object = any> {
	render?: (dom: JSX.Element, actions: ProTableRef<RT>) => ReactNode;
	className?: string;
}
