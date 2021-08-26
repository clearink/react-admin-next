import { Dispatch, SetStateAction, useMemo } from "react";
import { FormInstance } from "antd";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { actions } from "../store";
import { getInitState } from "../utils";
import { ProTableRef } from "../interface";

interface UseProTableActionProps<RecordType extends object = any> {
	form: FormInstance;
	handleRequest: () => Promise<void>;
	usePropData: boolean;
	setDataSource: Dispatch<SetStateAction<RecordType[]>>;
	dataSource: readonly RecordType[] | undefined;
}

export default function useProTableAction<RecordType extends object = any>(
	[state, dispatch]: [ReturnType<typeof getInitState>, Dispatch<any>],
	props: UseProTableActionProps
) {
	const { form, handleRequest, usePropData, setDataSource, dataSource } = props;

	// 设置分页值
	const handleSetPagination = useRefCallback((config: Record<"current" | "pageSize", number>) => {
		dispatch(actions.setPagination(config));
	});

	// 重新加载数据
	const handleReload = useRefCallback((resetCurrent?: boolean, resetForm?: boolean) => {
		if (resetForm) form.resetFields();

		if (resetCurrent) dispatch(actions.setCurrent(1));

		// TODO: 如何 初始化 filters 与 sorters ?

		handleRequest();
	});

	// 清除选中
	const handleClearSelected = useRefCallback(() => {
		dispatch(actions.setKeys([]));
	});

	// 设置筛选值
	const handleSetFilters = useRefCallback((filters: Record<string, FilterValue | null>) => {
		dispatch(actions.setFilters(filters));
	});

	// 设置排序值
	const handleSetSorter = useRefCallback(
		(sorter: SorterResult<RecordType> | SorterResult<RecordType>[]) => {
			dispatch(actions.setSorter(sorter));
		}
	);

	// 设置数据源
	const handleSetDataSource = useRefCallback((data: RecordType[]) => {
		if (!usePropData) {
			setDataSource(data);
		} else {
			console.error("dataSource is controlled, this action is invalid");
		}
	});

	// 暴露的方法
	return useMemo<ProTableRef<RecordType>>(
		() => ({
			state: { ...state, dataSource: dataSource as RecordType[] },
			reload: handleReload,
			clearSelected: handleClearSelected,
			setPagination: handleSetPagination,
			setFilters: handleSetFilters,
			setSorter: handleSetSorter,
			setDataSource: handleSetDataSource,
		}),
		[
			state,
			dataSource,
			handleReload,
			handleClearSelected,
			handleSetPagination,
			handleSetFilters,
			handleSetSorter,
			handleSetDataSource,
		]
	);
}
