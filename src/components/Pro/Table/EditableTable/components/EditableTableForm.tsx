import { ReactElement, ReactNode, Ref, useMemo, forwardRef, useImperativeHandle } from "react";
import merge from "lodash/merge";
import { CreateModalForm } from "@/hooks/action/use-modal-form";
import { CreateDrawerForm } from "@/hooks/action/use-drawer-form";
import { WrapperModalFormProps } from "@/hooks/action/interface";
import { EditType } from "../interface";

export type EditableTableFormRef<RT> = ((props?: Partial<RT>) => Promise<void>) | null;
export interface EditableTableFormProps<RT> extends WrapperModalFormProps<RT, RT> {
	type?: EditType;
	children?: ReactNode;
	/** 是否为新增 */
	add?: boolean;
	// fix 泛型失效
	ref?: Ref<EditableTableFormRef<RT>>;
}

export type EditableTableFormType = <RT extends object = any>(
	props: EditableTableFormProps<RT>
) => ReactElement;

function EditableTableForm<RT extends object = any>(
	props: EditableTableFormProps<RT>,
	ref: Ref<EditableTableFormRef<RT>>
) {
	const { type = "modal", add, children, formProps, ...rest } = props;
	const [FormComponent, handleOpenForm] = useMemo(() => {
		const config = { resetOnClose: !add }; // 新增时不需要重置form
		if (type === "modal") return CreateModalForm<RT, RT>(() => <></>, config);
		if (type === "drawer") return CreateDrawerForm<RT, RT>(() => <></>, config);
		return [null, null];
	}, [type, add]);

	// 暴露的事件
	useImperativeHandle(ref, () => handleOpenForm, [handleOpenForm]);

	const $formProps = useMemo(() => {
		return merge({ labelCol: { span: 3 } }, formProps);
	}, [formProps]);
	if (!FormComponent) return <></>;
	return (
		<FormComponent formProps={$formProps} {...rest} width={rest.width as number}>
			{children}
		</FormComponent>
	);
}

export default forwardRef(EditableTableForm) as EditableTableFormType;
