import { ComponentType, ReactNode } from "react";

// 页面最基本的 props
export interface PageBaseProps {
  routes?: RouteItemConfig[];
  children?: ReactNode;
}

// router config 项
export interface RouteItemConfig {
  path: string;
  component?: ComponentType<PageBaseProps>;
  redirect?: string;
  icon?: string;
  routes?: RouteItemConfig[];
  title?: string;
  hide?: boolean;
  /* 在菜单中隐藏子菜单 */
  hideChildren?: boolean;
}
