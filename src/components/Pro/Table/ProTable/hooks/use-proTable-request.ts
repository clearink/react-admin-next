import { Dispatch, SetStateAction, useRef } from "react";
import useMountedRef from "@/hooks/state/use-mounted-ref";
import useDeepEffect from "@/hooks/state/use-deep-effect";
import { useDebounceCallback } from "@/hooks/state/use-debounce";
import { isFunction } from "@/utils/ValidateType";
import { ProTableProps } from "../interface";
import { FormInstance } from "antd";
import { getInitState } from "../utils";
import { actions } from "../store";

interface UseProTableRequestProps<RT extends object = any> {
	request: ProTableProps<RT>["request"];
	usePropData: boolean;
	form: FormInstance;
	$params: any;
	setLoading: Dispatch<SetStateAction<ProTableProps["loading"]>>;
	setDataSource: Dispatch<SetStateAction<readonly RT[] | undefined>>;
}

// proTable 数据请求 hooks
export default function useProTableRequest<RT extends object = any>(
	[state, dispatch]: [ReturnType<typeof getInitState>, Dispatch<any>],
	props: UseProTableRequestProps<RT>
) {
	const { request, usePropData, form, setLoading, $params, setDataSource } = props;

	const requestLock = useRef(false);

	const mountedRef = useMountedRef();

	// 当正在执行请求时, 直接return      添加防抖 避免重复请求
	const handleRequest = useDebounceCallback(50, async () => {
		if (!isFunction(request) || requestLock.current || usePropData) return;
		requestLock.current = true;
		const formValue = form.getFieldsValue();
		try {
			setLoading({ delay: 50 });
			// 请求参数
			const params = { ...formValue, ...$params, ...state.pagination };
			const result = await request(params, state.filters, state.sorter);

			if (result) {
				const { dataSource, total } = result;
				setDataSource(dataSource);
				dispatch(actions.setTotal(total ?? dataSource.length));
			}
		} finally {
			if (mountedRef.current) {
				requestLock.current = false;
				setLoading(false);
			}
		}
	});

	// state 与 params 变化会导致 request 函数执行
  // 唯一不确定的是 params 改变和需不需要重置 current 
  // 目前如果需要重置的话 可以使用 action 
	useDeepEffect(() => {
		handleRequest();
	}, [handleRequest, $params, state.pagination, state.filters, state.sorter]);

	return handleRequest;
}
