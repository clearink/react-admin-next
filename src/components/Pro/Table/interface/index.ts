import { ReactNode } from "react";
import { RenderedCell } from "rc-table/lib/interface";
export declare type ProColumnRender<RecordType = unknown> = (
	dom: ReactNode,
	value: any,
	record: RecordType,
	index: number
) => React.ReactNode | RenderedCell<RecordType>;
