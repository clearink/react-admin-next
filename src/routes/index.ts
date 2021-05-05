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
						title: "基础表单",
						component: withLazyLoad(lazy(() => import("@/pages/Form"))),
					},
					{
						path: "/drawer",
						icon: "icon-lung",
						title: "drawer 表单",
						component: withLazyLoad(lazy(() => import("@/pages/Form/Drawer"))),
					},
					{
						path: "/modal",
						icon: "icon-heart",
						title: "modal 表单",
						component: withLazyLoad(lazy(() => import("@/pages/Form/Modal"))),
					},
					{
						path: "/step",
						icon: "icon-heart",
						title: "分布表单",
						component: withLazyLoad(lazy(() => import("@/pages/Form/Step"))),
					},
					{
						path: "/filter",
						icon: "icon-heart",
						title: "筛选表单",
						component: withLazyLoad(lazy(() => import("@/pages/Form/Filter"))),
					},
				],
			},
			{
				path: "/table",
				title: "表格管理",
				icon: "icon-heart",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/",
						icon: "icon-computer",
						title: "基础表格",
						component: withLazyLoad(lazy(() => import("@/pages/Table"))),
					},
					{
						path: "/edit-table",
						icon: "icon-computer",
						title: "可编辑表格",
						component: withLazyLoad(lazy(() => import("@/pages/Table/EditableTable"))),
					},
					{
						path: "/pro-table",
						icon: "icon-computer",
						title: "增强表格",
						component: withLazyLoad(lazy(() => import("@/pages/Table/ProTable"))),
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
						title: "基础列表",
						icon: "icon-heart",
						component: withLazyLoad(lazy(() => import("@/pages/List"))),
					},
					{
						path: "/virtual-list",
						title: "虚拟列表",
						icon: "icon-heart",
						component: withLazyLoad(lazy(() => import("@/pages/List/VirtualList"))),
					},
				],
			},
			{
				path: "/other",
				title: "其他",
				icon: "icon-heart",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/scroll-load",
						title: "滚动加载",
						icon: "icon-computer",
						component: withLazyLoad(lazy(() => import("@/pages/Scroll"))),
					},
					{
						path: "/collapse",
						title: "折叠面板",
						icon: "icon-computer",
						component: withLazyLoad(lazy(() => import("@/pages/Collapse"))),
					},
				],
			},
			{
				path: "/dash-board",
				title: "控制台",
				icon: "icon-computer",
				component: withLazyLoad(lazy(() => import("@/pages/Dashboard"))),
			},
			{
				path: "/page-creator",
				title: "页面生成器",
				icon: "icon-computer",
				component: withLazyLoad(lazy(() => import("@/pages/PageCreator"))),
			},
		],
	},
];

export default routes;
