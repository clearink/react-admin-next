import { useEffect } from "react";
import { RouteItemConfig } from "@/@types/route";
import useAppDispatch from "@/hooks/redux/use-app-dispatch";
import { actions } from "@/store/reducers/menu";
import { formatRoutesMenuData } from "../utils";
import DevLog from "@/utils/DevLog";

export default function useSetMenu(routes?: RouteItemConfig[]) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    DevLog("set menu");
    dispatch(actions.setMenu(formatRoutesMenuData(routes)));
  }, [routes, dispatch]);
}
