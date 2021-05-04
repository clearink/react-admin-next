import useFetch from "@/hooks/state/use-fetch";
import http from "..";

export const fetcher = (url: string) => http.get(url).then((res) => res.data);

export default function useNurseLevel() {
	return useFetch("/sys/dict/getDictItems/careworkerPosition", fetcher);
}
