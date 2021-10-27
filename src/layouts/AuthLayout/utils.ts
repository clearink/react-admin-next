import { MenuItemProps } from "@/@types/menu";
import { RouteItemConfig } from "@/@types/route";
import { isArray } from "@/utils/ValidateType";
import { FilterValue } from "@/utils/Value";

/**  
  path(pin):"/"
  icon(pin):"icon-computer"
  title(pin):"管理首页"
  key(pin):"root😜/"
*/

// 服务器返回的数据结构
export interface ServerMenuData {
  icon: string;
  id: string;
  name: string;
  path: string;
  children?: ServerMenuData[];
}
// 远程数据
export function formatServerMenuData(data: ServerMenuData[]) {
  return data.reduce((menuData, current) => {
    const menuItem: any = {
      path: current.path,
      icon: current.icon,
      title: current.name,
      key: current.id,
    };
    if (current.children)
      menuItem.children = formatServerMenuData(current.children);
    return menuData.concat(menuItem);
  }, [] as ServerMenuData[]);
}

// routes.ts 数据
export function formatRoutesMenuData(
  routes?: RouteItemConfig[],
  parentKeys: string = ""
): MenuItemProps[] {
  if (!isArray(routes)) throw new Error("routes must array");
  return routes.map((route) => {
    //  menu key
    const separator = /^\//.test(route.path) ? '' : '/';
    const path = `${parentKeys}${separator}${route.path}`;
  
    return {
      ...FilterValue(route, ["component", "path"]),
      path,
      routes: route.routes && formatRoutesMenuData(route.routes, path),
    } as MenuItemProps;
  });
}
