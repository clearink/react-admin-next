import React, { ComponentType, Fragment, lazy, useMemo } from "react";
import { PageBaseProps, RouteItemConfig } from "@/@types/route";
import withLazyLoad from "@/hocs/withLazyLoad";
import { isArray } from "@/utils/ValidateType";
import { Route, Navigate } from "react-router-dom";

const ERROR_COMPONENT = {
  path: "*",
  // 给每个routes字段添加匹配失败的路由
  component: withLazyLoad(lazy(() => import("@/pages/404"))),
};

function renderRoutes(routes?: RouteItemConfig[]) {
  if (!isArray(routes)) return <></>;
  return routes.concat(ERROR_COMPONENT).map((item) => {
    const { component, routes, redirect, path } = item;
    const RouteComponent = component as ComponentType<PageBaseProps>;
    return (
      <Route
        key={path}
        path={path}
        element={
          redirect ? (
            <Navigate to={redirect} replace />
          ) : (
            <RouteComponent routes={routes} />
          )
        }
      >
        {renderRoutes(routes)}
      </Route>
    );
  });
}

export default function useRenderRoutes(routes: RouteItemConfig[]) {
  return useMemo(() => renderRoutes(routes), [routes]);
}
