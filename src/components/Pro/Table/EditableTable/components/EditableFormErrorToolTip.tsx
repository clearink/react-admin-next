import { ReactNode, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import { useDebounceState } from "@/hooks/state/use-debounce";
import { useCallback } from "react";

export interface EditableFormErrorTooltipProps {
	children?: ReactNode;
	errors: string[];
}
export default function EditableFormErrorTooltip(props: EditableFormErrorTooltipProps) {
	const { children, errors } = props;
	const [errorList, setErrorList] = useDebounceState(150, () => errors); // fix: tooltip瞬间的空白
	const [visible, setVisible] = useState(false); // 是否隐藏

	useEffect(() => {
		setErrorList(errors);
		setVisible(!!errors.length);
	}, [errors, setErrorList]);

	const title = useMemo(() => {
		return errorList.map((error) => (
			<span key={error} className='inline-block text-center'>
				{error}
			</span>
		));
	}, [errorList]);
	const handleVisibleChange = useCallback(
		(v: boolean) => {
			if (errorList.length && !visible) {
				setVisible(v);
			}
		},
		[errorList.length, visible]
	);
	return (
		<Tooltip
			title={title}
			trigger='click'
			color='#ff4d4f'
			visible={errorList.length > 0 && visible}
			onVisibleChange={handleVisibleChange}
		>
			{children}
		</Tooltip>
	);
}
