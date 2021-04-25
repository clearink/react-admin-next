import useRefCallback from "@/hooks/state/use-ref-callback";
import { Grid } from "antd";
import { Children, useEffect, useMemo, useState } from "react";
import ProForm from "../ProForm";
import { FilterFormProps } from "./interface";
import { colSpanArray } from "./constant";

// 筛选布局 children 是 array
export default function FilterForm(props: FilterFormProps) {
	const { children, collapsed: _collapsed, onCollapse, ghost, submitConfig: _submitConfig, ...rest } = props;
	const [collapsed, setCollapsed] = useState(!!_collapsed);

	useEffect(() => {
		// 与外部保持一致
		setCollapsed(!!_collapsed);
	}, [_collapsed]);

	const handleCollapse = useRefCallback(() => {
		setCollapsed(!collapsed);
		onCollapse?.(!collapsed);
	});

	const childrenCount = Children.count(children);
	const breakpoints = Grid.useBreakpoint();
	const point = useMemo(() => colSpanArray.find(([k]) => breakpoints[k] === true), [breakpoints]);

  const 

	return (
		<ProForm
			{...rest}
			submitConfig={{
				render: (dom, form) => {
					return (
						<>
							{children}
							{dom}
						</>
					);
				},
			}}
		/>
	);
}
