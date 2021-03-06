import { MenuItemProps } from "@/@types/menu";
import useTypedSelector from "@/hooks/redux/use-typed-selector";
import Unique from "@/utils/Unique";
import { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";

// 递归查找路径
/**
 *
 * @param config
 * @param pathname
 *
 * findOpen 函数根据 pathname 层级 递归 查找 openKeys
 *
 */
function findMenuSelectedKeys(
  config: MenuItemProps[],
  pathname: string
): string[] {
  let openKeys: string[] = [];
  let keys: string[] = [];
  function find(config: MenuItemProps[], keys: string[]) {
    for (let item of config) {
      if (item.routes) {
        find(item.routes, keys.concat(item.path));
      } else if (item.path && matchPath({ path: item.path }, pathname)) {
        return openKeys.push(...keys.concat(item.path));
      }
    }
  }
  find(config, keys);
  // 去重 过滤
  return Unique<string>(openKeys).filter((item) => item);
}

export default function useMenuSelectedKeys() {
  const { pathname } = useLocation();
  const { menu } = useTypedSelector((state) => state.menu);
  return useMemo(() => findMenuSelectedKeys(menu, pathname), [menu, pathname]);
}
