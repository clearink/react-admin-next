import useFetch from "@/hooks/state/use-fetch";
import http from "..";

export const fetcher = (url: string, data: Object) => http.post(url, data);

export default function useBedList(params: any) {
	return useFetch(["/orgmgt/bed/list", params], fetcher);
}
