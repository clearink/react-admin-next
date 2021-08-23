import React, { Children, useMemo, useContext, cloneElement } from "react";
import { FilterForm } from "@/components/Pro/Form";
import { TableSearchProps } from "./interface";
import styles from "./style.module.scss";
import { useDebounceCallback } from "@/hooks/state/use-debounce";

import classNames from "classnames";
import { ProTableContext } from "../../utils";

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
	const tableAction = useContext(ProTableContext);

	const childCount = useMemo(() => Children.count(children), [children]);

	// 数据请求函数
	const handleChange = useDebounceCallback(100, async () => {
		if (!!fetchLoading || usePropData) return;
		await rest.form?.validateFields();
		await rest.onFinish?.(rest.form?.getFieldsValue()!);
		const { state, reload, setPagination } = tableAction!;
		if (state.pagination.current === 1) reload();
		else {
			const newPagination = { ...pagination, ...state.pagination, current: 1 };
			const extra = { currentDataSource: state.dataSource, action: "paginate" } as const;
			onTableChange?.(newPagination, state.filters, state.sorter, extra);
			setPagination({ current: 1, pageSize: state.pagination.pageSize });
		}
	});

	return (
		<div className={classNames(styles.search_form, { [styles.hidden]: !childCount })}>
			<FilterForm {...rest} onChange={handleChange} onReset={handleChange} onFinish={handleChange}>
				{children}
			</FilterForm>
		</div>
	);
}

export default TableSearch;

/* <FilterForm<RecordType>
					{...searchProps}
					submitConfig={searchSubmitConfig}
					form={form}
					className={classNames(searchProps && searchProps.className, styles.filter_form, {
						[styles.hidden]: !formCol.length || searchProps === false,
					})}
					onFinish={handleFinish}
				>
					{formCol}
				</FilterForm> */

// 处理 submit config
// const searchSubmitConfig = useMemo(() => {
// 	if (searchProps && searchProps.submitConfig === false) return false;
// 	const defaultConfig: SubmitterProps = {
// 		...(searchProps && searchProps.submitConfig),
// 		onReset: () => {
// 			if (searchProps && searchProps.submitConfig && searchProps.submitConfig.onReset) {
// 				return searchProps.submitConfig.onReset();
// 			}
// 			handleRequest();
// 		},
// 		render: ($dom, form) => {
// 			// 处理 loading
// 			const btnLoading = getButtonLoading(loading);
// 			const dom = [
// 				cloneElement($dom[0], { disabled: !!btnLoading }),
// 				cloneElement($dom[1], { loading: btnLoading }),
// 			];
// 			if (searchProps && searchProps.submitConfig && searchProps.submitConfig.render) {
// 				return searchProps.submitConfig.render(dom, form);
// 			}
// 			return <>{dom}</>;
// 		},
// 	};
// 	return defaultConfig as SubmitterProps;
// }, [handleRequest, loading, searchProps]);
