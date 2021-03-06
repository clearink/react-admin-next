import { memo, ReactNode } from "react";
import { Outlet } from "react-router-dom";
interface BlankLayoutProps {
  children: ReactNode;
}
// 空白 layout
function BlankLayout(props: BlankLayoutProps) {
  return (
    <>
      {props.children}
      <Outlet />
    </>
  );
}

export default memo(BlankLayout);
