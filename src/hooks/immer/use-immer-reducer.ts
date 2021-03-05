import { useCallback, useState } from "react";
import produce, { enableMapSet, Draft } from "immer";
enableMapSet();

interface ReducerAction {
  type: string;
  payload?: any;
}

export default function useImmerReducer<S>(
  reducer: (draft: Draft<S>, action: ReducerAction) => any,
  initialState: S
) {
  const [state, setState] = useState(() => initialState);

  const dispatch = useCallback(
    (action: ReducerAction) => {
      produce(reducer);
      setState((preState) => produce(reducer)(preState as any, action));
      // setState(reducer(produce, action));
    },
    [reducer]
  );

  return [state, dispatch] as const;
}
