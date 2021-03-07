import http from "..";

export const getBedListFetcher = (url: string, data: Object) =>
  http.post(url, data).then((res) => res.data);
