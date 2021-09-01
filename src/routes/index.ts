import { RouteItemConfig } from "@/@types/route";
import withLazyLoad from "@/hocs/withLazyLoad";
/**
 * 注意: react route 6.0 采用的是 集中式注册
 * 子路由只需要写相对父级路由的不同即可
 */

const routes: RouteItemConfig[] = [
	// 登录
	{
		path: "/login",
		component: withLazyLoad(() => import("@/pages/Login")),
	},
	// 后台管理
	{
		path: "/",
		component: withLazyLoad(() => import("@/layouts/AuthLayout")),
		routes: [
			{
				path: "/",
				icon: "icon-computer",
				title: "管理首页",
				component: withLazyLoad(() => import("@/pages/Home")),
			},
			{
				path: "/blog",
				icon: "icon-computer",
				title: "博客管理",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/",
						icon: "icon-heart",
						title: "博客列表",
						component: withLazyLoad(() => import("@/pages/Blog")),
					},
					{
						path: "/add",
						icon: "icon-heart",
						title: "新增博客",
						component: withLazyLoad(() => import("@/pages/Blog/Add")),
					},
					{
						path: "/edit/:id",
						icon: "icon-heart",
						title: "编辑博客",
						hide: true,
						component: withLazyLoad(() => import("@/pages/Blog/Edit")),
					},
				],
			},
			{
				path: "/form",
				icon: "icon-computer",
				title: "表单管理",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/",
						icon: "icon-heart",
						title: "基础表单",
						component: withLazyLoad(() => import("@/pages/Form")),
					},
					{
						path: "/drawer",
						icon: "icon-lung",
						title: "drawer 表单",
						component: withLazyLoad(() => import("@/pages/Form/Drawer")),
					},
					{
						path: "/modal",
						icon: "icon-heart",
						title: "modal 表单",
						component: withLazyLoad(() => import("@/pages/Form/Modal")),
					},
					{
						path: "/step",
						icon: "icon-heart",
						title: "分布表单",
						component: withLazyLoad(() => import("@/pages/Form/Step")),
					},
					{
						path: "/filter",
						icon: "icon-heart",
						title: "筛选表单",
						component: withLazyLoad(() => import("@/pages/Form/Filter")),
					},
				],
			},
			{
				path: "/table",
				title: "表格管理",
				icon: "icon-heart",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/",
						icon: "icon-computer",
						title: "基础表格",
						component: withLazyLoad(() => import("@/pages/Table")),
					},
					{
						path: "/edit-table",
						icon: "icon-computer",
						title: "可编辑表格",
						component: withLazyLoad(() => import("@/pages/Table/EditableTable")),
					},
					{
						path: "/pro-table",
						icon: "icon-computer",
						title: "增强表格",
						component: withLazyLoad(() => import("@/pages/Table/ProTable")),
					},
				],
			},
			{
				path: "/list",
				title: "列表管理",
				icon: "icon-heart",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/",
						title: "基础列表",
						icon: "icon-heart",
						component: withLazyLoad(() => import("@/pages/List")),
					},
					{
						path: "/virtual-list",
						title: "虚拟列表",
						icon: "icon-heart",
						component: withLazyLoad(() => import("@/pages/List/VirtualList")),
					},
				],
			},
			{
				path: "/other",
				title: "其他",
				icon: "icon-heart",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/scroll-load",
						title: "滚动加载",
						icon: "icon-computer",
						component: withLazyLoad(() => import("@/pages/Scroll")),
					},
					{
						path: "/collapse",
						title: "折叠面板",
						icon: "icon-computer",
						component: withLazyLoad(() => import("@/pages/Collapse")),
					},
				],
			},
			{
				path: "/dash-board",
				title: "控制台",
				icon: "icon-computer",
				component: withLazyLoad(() => import("@/pages/Dashboard")),
			},
			{
				path: "/page-creator",
				title: "页面生成器",
				icon: "icon-computer",
				component: withLazyLoad(() => import("@/layouts/BlankLayout")),
				routes: [
					{
						path: "/",
						title: "模板生成器",
						icon: "icon-computer",
						component: withLazyLoad(() => import("@/pages/PageCreator/CreatorCore")),
					},
					{
						path: "/api",
						title: "api生成器",
						icon: "icon-computer",
						component: withLazyLoad(() => import("@/pages/PageCreator/ApiConfig")),
					},
					{
						path: "/enum",
						title: "enum生成器",
						icon: "icon-computer",
						component: withLazyLoad(() => import("@/pages/PageCreator/EnumConfig")),
					},
				],
			},
			{
				path: "/animate",
				title: "framer-motion",
				icon: "icon-computer",
				component: withLazyLoad(() => import("@/pages/Animate")),
			},
		],
	},
];
export default routes;
