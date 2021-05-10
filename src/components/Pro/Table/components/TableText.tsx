import React, { ReactNode } from "react";
// ProColumns 默认渲染组件
export default function TableText(props: { text?: ReactNode }) {
	return <>{props.text || "--"}</>;
}
