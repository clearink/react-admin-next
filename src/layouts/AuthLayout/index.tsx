// 需要验证
import { Outlet } from "react-router-dom";
import { PageBaseProps } from "@/@types/route";
import { Layout, Spin } from "antd";
import AppSiderMenu from "./components/AppSiderMenu";
import useSetMenu from "./useSetMenu";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import styles from "./style.module.scss";

export default function AuthLayout(props: PageBaseProps) {
  // 获取菜单数据 根据 routes json
  useSetMenu(props.routes); // 设置 store menu
  return (
    <Layout className={styles.auth_layout}>
      <AppSiderMenu />
      <Layout className={styles.auth_content_wrap}>
        <AppHeader />
        <Layout.Content className={styles.auth_content}>
          {props.children}
          <Outlet />
        </Layout.Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}
