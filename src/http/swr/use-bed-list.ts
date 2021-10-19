import useSWR from "swr";
import http from "..";

export const fetcher = (url: string, data: Object) => http.post(url, data);

export default function useBedList(params: any) {
	return useSWR(["/orgmgt/bed/list", params], fetcher);
}
