import useSWR from "swr";
import http from "..";

export const fetcher = (url: string) => http.get(url).then((res) => res.data);

export default function useNurseLevel() {
	return useSWR("/sys/dict/getDictItems/careworkerPosition", fetcher);
}
