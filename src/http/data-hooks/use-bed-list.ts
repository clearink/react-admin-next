import useFetch from "@/hooks/state/use-fetch";
import { getBedListFetcher } from "../data-fetchers";

export default function useBedList() {
  return useFetch(
    ["/orgmgt/bed/list", { pageNo: 1, pageSize: 10 }],
    getBedListFetcher
  );
}
