import { ComponentType, ReactNode } from "react";
import { RouteChildrenProps } from "react-router-dom";

export interface PageBaseProps extends RouteChildrenProps {
  routes?: RouteItemConfig[];
  children: ReactNode;
}

export interface RouteItemConfig {
  path?: string;
  component?: ComponentType<PageBaseProps>;
  redirect?: string;
  wrap?: ComponentType<any>;
  icon?: string;
  routes?: RouteItemConfig[];
  title?: string;
  key?: string;
  hide?: boolean;
  /* 在菜单中隐藏子菜单 */
  hideChildren?: boolean;
  [key: string]: any;
}
