import React, { useCallback } from "react";
import { PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import { Link } from "react-router-dom";
import withDefaultProps from "@/hocs/withDefaultProps";
import useMatchBreadCrumb from "./useMatchBreadCrumb";

interface IProps extends PageHeaderProps {
  ghost: boolean;
}
// 自动获取面包屑的 PageHeader
function PageHeaderWrap(props: IProps) {
  const routes = useMatchBreadCrumb();
  // 自定义面包屑路由
  const itemRender = useCallback((route, params, routes, paths) => {
    const first = routes.length && routes[0] === route;
    return first ? (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  }, []);
  return <PageHeader {...props} breadcrumb={{ itemRender, routes }} />;
}

export default withDefaultProps(PageHeaderWrap, { ghost: false });
