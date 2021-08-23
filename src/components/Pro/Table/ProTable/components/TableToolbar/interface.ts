import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ReactNode, Key } from "react";
import { ProTableRef } from "../../interface";

export interface TableToolbarProps<RT extends object = any> {
	className?: string;
	render?: (
		dom: { toolbar: (JSX.Element | undefined)[]; title: TitleTipProps["title"] },
		actions: ProTableRef<RT>
	) => ReactNode;
	title?: TitleTipProps["title"];
	onCreate?: () => void;
	onDelete?: (keys: Key[]) => void;
}
