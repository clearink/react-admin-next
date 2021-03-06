import { createContext } from "react";
export default function GetServiceContext<T>(
  useHook: (...args: any[]) => T,
  defaultValue?: T
) {
  return createContext(defaultValue as T);
}
