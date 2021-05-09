import { DrawerFormProps, DrawerFormRef } from "@/components/Pro/Form/DrawerForm/interface";
import { ModalFormProps } from "@/components/Pro/Form/ModalForm/interface";
import { Ref } from "react";

export type RecordFormRef = DrawerFormRef;
export interface RecordFormProps<V = any> extends ModalFormProps<V>, DrawerFormProps<V> {
	/** 显示类型 */
	type?: "drawer" | "modal";

	ref?: Ref<RecordFormRef>;
}
