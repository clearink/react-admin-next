import { ReactElement, ReactNode, Ref } from "react";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { DrawerFormProps, DrawerFormRef } from "@/components/Pro/Form/DrawerForm/interface";
import { EditType } from "../../interface";

export interface ColumnFormProps<V = any> {
	children?:ReactNode;
	type?: EditType;
	title?: TitleTipProps["title"];
	onFinish?: DrawerFormProps<V>["onFinish"];
	labelCol?: DrawerFormProps["labelCol"];
	wrapperCol?: DrawerFormProps["wrapperCol"];

	// fix 泛型失效
	ref?: Ref<ColumnFormRef>;
}
export interface ColumnFormRef extends DrawerFormRef {}

export type ColumnFormType = <V = any>(props: ColumnFormProps<V>) => ReactElement;
