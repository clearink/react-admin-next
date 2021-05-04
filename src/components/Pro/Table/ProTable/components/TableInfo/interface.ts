import { AlertProps } from "antd";

export interface TableInfoProps extends Omit<AlertProps, "message"> {
	/** 清空选中 */
	onClear?: () => void;
	/** 选中数目 */
	count?: number;
	/** 当前页 */
	current?: number;
	/** 总数量 */
	total?: number;
}
