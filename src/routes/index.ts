import { RouteItemConfig } from "@/@types/route";
import withLazyLoad from "@/hocs/withLazyLoad";
import { lazy } from "react";
/**
 * 注意: react route 6.0 采用的是 集中式注册
 * 子路由只需要写相对父级路由的不同即可
 */

const routes: RouteItemConfig[] = [
  // 登录
  {
    path: "/login",
    component: withLazyLoad(lazy(() => import("@/pages/Login"))),
  },
  // 后台管理
  {
    path: "/",
    component: withLazyLoad(lazy(() => import("@/layouts/AuthLayout"))),
    routes: [
      {
        path: "/",
        icon: "icon-computer",
        title: "管理首页",
        component: withLazyLoad(lazy(() => import("@/pages/Home"))),
      },
      {
        path: "/blog",
        icon: "icon-computer",
        title: "博客管理",
        component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
        routes: [
          {
            path: "/",
            icon: "icon-heart",
            title: "博客列表",
            component: withLazyLoad(lazy(() => import("@/pages/Blog"))),
          },
          {
            path: "/add",
            icon: "icon-heart",
            title: "新增博客",
            component: withLazyLoad(lazy(() => import("@/pages/Blog/Add"))),
          },
          {
            path: "/edit/:id",
            icon: "icon-heart",
            title: "编辑博客",
            hide: true,
            component: withLazyLoad(lazy(() => import("@/pages/Blog/Edit"))),
          },
        ],
      },
      {
        path: "/form",
        icon: "icon-computer",
        title: "表单管理",
        component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
        routes: [
          {
            path: "/",
            icon: "icon-heart",
            title: "表单列表",
            component: withLazyLoad(lazy(() => import("@/pages/Form"))),
          },
          {
            path: "/add",
            icon: "icon-lung",
            title: "新增表单",
            component: withLazyLoad(lazy(() => import("@/pages/Form/Add"))),
          },
          {
            path: "/edit/:id",
            icon: "icon-heart",
            title: "编辑表单",
            hide: true,
            component: withLazyLoad(lazy(() => import("@/pages/Form/Edit"))),
          },
        ],
      },
      {
        path: "/list",
        title: "列表管理",
        icon: "icon-heart",
        component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
        routes: [
          {
            path: "/",
            icon: "icon-computer",
            title: "基础列表",
            component: withLazyLoad(lazy(() => import("@/pages/List"))),
          },
        ],
      },
    ],
  },
];

export default routes;
