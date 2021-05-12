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
	setDataSource: Dispatch<SetStateAction<readonly RecordType[] | undefined>>;
	dataSource: readonly RecordType[] | undefined;
}

export default function useProTableAction<RecordType>(
	[state, dispatch]: [ReturnType<typeof getInitState>, Dispatch<any>],
	props: UseProTableActionProps
) {
	const { form, handleRequest, usePropData, setDataSource, dataSource } = props;
	// 暴露出的ref事件
	const handleSetPagination = useRefCallback((config: Record<"current" | "pageSize", number>) => {
		dispatch(actions.setPagination(config));
	});

	const handleReload = useRefCallback((resetCurrent?: boolean, resetForm?: boolean) => {
		if (resetForm) form.resetFields();

		if (resetCurrent) dispatch(actions.setCurrent(1));

		// TODO: 如何 初始化 filters 与 sorters ?

		handleRequest();
	});

	const handleClearSelected = useRefCallback(() => {
		dispatch(actions.setKeys([]));
	});

	const handleSetFilters = useRefCallback((filters: Record<string, FilterValue | null>) => {
		dispatch(actions.setFilters(filters));
	});

	const handleSetSorter = useRefCallback(
		(sorter: SorterResult<RecordType> | SorterResult<RecordType>[]) => {
			dispatch(actions.setSorter(sorter));
		}
	);

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
