import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useTypedSelector from "@/hooks/redux/use-typed-selector";
import { matchPath } from "react-router-dom";
import { MenuItemProps } from "@/@types/menu";
import Unique from "@/utils/Unique";

interface BreadcrumbProps {
  path: string;
  breadcrumbName: string;
}
// 递归查找路径 面包屑
// 需要在routes里配置相应的path与title, 否则不会自动生成面包屑
function findBreadcrumb(
  config: MenuItemProps[],
  pathname: string
): BreadcrumbProps[] {
  const result: BreadcrumbProps[] = [];
  const path: BreadcrumbProps[] = [];

  function find(config: MenuItemProps[], path: BreadcrumbProps[]) {
    for (let item of config) {
      if (item.routes) {
        const newPath = path.concat({
          path: `${item.path}?_t=${Math.random()}`,
          breadcrumbName: item.title,
        });
        find(item.routes, newPath);
      } else if (matchPath({ path: item.path }, pathname)) {
        return result.push(...path, {
          path: item.path as string,
          breadcrumbName: item.title as string,
        });
      }
    }
  }
  find(config, path);
  // 去重 过滤
  return Unique<BreadcrumbProps>(result, "breadcrumbName").filter(
    (item) => item.breadcrumbName
  );
}
const homeBreadCrumb = [{ path: "/", breadcrumbName: "首页" }];
export default function useMatchBreadCrumb() {
  const { menu } = useTypedSelector((state) => state.menu);
  const { pathname } = useLocation();
  return useMemo(() => homeBreadCrumb.concat(findBreadcrumb(menu, pathname)), [
    pathname,
    menu,
  ]);
}
