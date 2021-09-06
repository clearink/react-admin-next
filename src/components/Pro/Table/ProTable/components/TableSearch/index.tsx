import React, { Children, useMemo, useContext } from "react";
import { FilterForm } from "@/components/Pro/Form";
import { TableSearchProps } from "./interface";
import styles from "./style.module.scss";
import { useDebounceCallback } from "@/hooks/state/use-debounce";

import cls from "classnames";
import { ProTableContext } from "../../utils";
import { useCallback } from "react";

// 搜索表单
function TableSearch<RT extends object = any>(props: TableSearchProps<RT>) {
	const {
		className,
		render,
		children,
		pagination,
		onTableChange,
		fetchLoading,
		usePropData,
		...rest
	} = props;
	const tableAction = useContext(ProTableContext)!;

	const childCount = useMemo(() => Children.count(children), [children]);

	// 数据请求函数
	const handleFinish = useDebounceCallback(300, async () => {
		if (!!fetchLoading || usePropData) return;
		await rest.form?.validateFields();
		rest.onFinish?.(rest.form?.getFieldsValue()!);
		const { state, reload, setPagination } = tableAction!;
		if (state.pagination.current === 1) reload();
		else {
			const newPagination = { ...pagination, ...state.pagination, current: 1 };
			const extra = { currentDataSource: state.dataSource, action: "paginate" } as const;
			onTableChange?.(newPagination, state.filters, state.sorter, extra);
			setPagination({ current: 1, pageSize: state.pagination.pageSize });
		}
	});
	// 重置
	const handleReset = useCallback(() => {
		rest.form?.resetFields();
		rest.form?.submit();
	}, [rest.form]);
	const DOM = useMemo(() => {
		return (
			<div className={cls(styles.search_form, !childCount && styles.hidden)}>
				<FilterForm
					{...rest}
					loading={fetchLoading}
					onFinish={handleFinish}
					onReset={handleReset}
					onValuesChange={handleFinish}
				>
					{children}
				</FilterForm>
			</div>
		);
	}, [childCount, rest, fetchLoading, handleFinish, handleReset, children]);
	if (render) return <>{render(DOM, tableAction)}</>;
	return DOM;
}

export default TableSearch;
