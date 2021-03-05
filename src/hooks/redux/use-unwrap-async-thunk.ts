/**
 * 封装 createAsyncThunk 的错误捕捉过程
 * 	const unWrap = useUnwrapAsyncThunk()
		useEffect(() => {
			const [promise, abort] = unWrap(actions.fetchList())
			promise.then((res) => {			})
			return ()=>{
				abort();
			}
		}, [unWrap])
 */

import { AsyncThunkAction, unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import useAppDispatch from "./use-app-dispatch";
export default function useUnwrapAsyncThunk() {
  const dispatch = useAppDispatch();
  return useCallback(
    <R extends any>(
      asyncThunk: AsyncThunkAction<R, any, any>
    ): [Promise<R>, () => void] => {
      const promise = dispatch(asyncThunk);
      return [promise.then(unwrapResult), promise.abort];
    },
    [dispatch]
  );
}
