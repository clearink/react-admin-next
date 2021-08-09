import { ModalFormProps } from "@/components/Pro/Form/ModalForm/interface";
import { isUndefined } from "@/utils/ValidateType";
import { memo, ComponentType, useRef, useState, useCallback } from "react";
import { UseModalActionProps } from "./interface";

export default function useModalAction<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	const modalFormRef = useRef<ModalFormProps>(null);
	const [props, setProps] = useState<Partial<P>>();
	const handleOpenClick = useCallback((injectProps?: Partial<P>) => {
		if (!isUndefined(injectProps)) setProps(injectProps);
	}, []);
}
