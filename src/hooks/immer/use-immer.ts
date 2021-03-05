import { useCallback, useState } from "react";
import produce, { enableMapSet, Draft } from "immer";
enableMapSet();

export default function useImmer<S>(
  initialState: S | (() => S)
): [S, (f: (draft: Draft<S>) => void | S) => void] {
  const [state, setState] = useState(initialState);

  const updateState = useCallback((fn: (state: any) => any) => {
    setState(produce(fn));
  }, []);

  return [state, updateState];
}
