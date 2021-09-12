import { ReactNode, useMemo, Key, useEffect } from "react";
import { Tooltip } from "antd";
import { ItemRenderType } from "./interface";
import { useDebounceState, useDebounceValue } from "@/hooks/state/use-debounce";

interface InlineErrorTooltipProps {
	children?: ReactNode;
	errors: Key[];
	touched: boolean;
}
function InlineErrorTooltip(props: InlineErrorTooltipProps) {
	const { children, errors, touched } = props;
	const errorList = useDebounceValue(100, errors);
	const [visible, setVisible] = useDebounceState(0, false); // 是否隐藏

	// 更新 visible 值
	useEffect(() => {
		setVisible(!!errors.length && touched);
	}, [errors.length, setVisible, touched]);

	const title = useMemo(() => {
		return errorList.map((error) => (
			<span key={error} className='inline-block text-center'>
				{error}
			</span>
		));
	}, [errorList]);

	return (
		<Tooltip
			title={title}
			trigger='focus'
			color='#ff4d4f'
			visible={!!errorList.length && visible}
			onVisibleChange={(v: boolean) => errorList.length && setVisible(v)}
		>
			{children}
		</Tooltip>
	);
}

export default {
	mark: "pro_table_render",
	render({ errors, touched }, { input, extra }) {
		return (
			<InlineErrorTooltip errors={errors} touched={touched}>
				{input}
				{extra}
			</InlineErrorTooltip>
		);
	},
} as ItemRenderType;
