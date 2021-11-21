import { useMemo } from "react";

export default function useQueryString(): Map<string, string> {
  const { search } = window.location;
  return useMemo(() => {
    if (window.URLSearchParams) return new URLSearchParams(search) as any;
    return search
      .replace("?", "")
      .split("&")
      .reduce((pre, cur) => {
        const [k, v] = cur.split("=");
        pre.set(k, v);
        return pre;
      }, new Map<string, any>());
  }, [search]);
}
