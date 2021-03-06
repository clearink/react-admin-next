import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import classNames from "classnames";
import useTypedSelector from "@/hooks/redux/use-typed-selector";
import withDefaultProps from "@/hocs/withDefaultProps";
import useAppDispatch from "@/hooks/redux/use-app-dispatch";
import { actions } from "@/store/reducers/menu";
import useRenderMenu from "./useRenderMenu";
import useMenuOpenKey from "./useMenuOpenKey";
import styles from "./style.module.scss";

export interface SiderMenuProps {
  fixed: boolean; // 是否固定
}

const COLLAPSED_WIDTH = 48; // 侧边栏收起宽度
function AppSiderMenu(props: SiderMenuProps) {
  const { fixed } = props;

  const { collapsed } = useTypedSelector((state) => state.menu);

  const newOpenKeys = useMenuOpenKey(); // 菜单选中项
  const menuList = useRenderMenu(); // 菜单渲染结果

  const [collapsedMenu, setCollapsedMenu] = useState(false); // 是否收起菜单

  const [openKeys, setOpenKeys] = useState<string[]>([]); // 当前打开的菜单

  const [selectKeys, setSelectKeys] = useState<string[]>([]); // 当前选中的菜单

  // 切换路由时 重新设置 open keys
  useEffect(() => {
    if (!collapsed) setOpenKeys(newOpenKeys);
    else setOpenKeys([]);
    setSelectKeys(newOpenKeys);
  }, [newOpenKeys, collapsed]);

  // 防止子菜单意外出现在别的位置 antd 4.9.3
  // 和 collapsed 的更新不在同一个事件循环
  useEffect(() => {
    setCollapsedMenu(collapsed);
  }, [collapsed]);

  const dispatch = useAppDispatch();
  const handleToggleMenu = (flag: boolean) => {
    dispatch(actions.setCollapsed(flag));
  };

  return (
    <>
      <div
        className={classNames(styles.place_holder, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
      />
      <Layout.Sider
        collapsible
        collapsedWidth={COLLAPSED_WIDTH}
        collapsed={collapsedMenu}
        trigger={null}
        breakpoint="md"
        onBreakpoint={handleToggleMenu}
        className={classNames(styles.sider_menu, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
      >
        <div className={styles.logo_title}>
          <img alt="logo" className={styles.logo} />
          {/* 收起时显示logo 展开时显示标题 */}
          <span className={styles.title}>后台管理</span>
        </div>
        <Menu
          onOpenChange={setOpenKeys as any} // 点击事件
          className={styles.menu}
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={selectKeys}
        >
          {menuList}
        </Menu>
      </Layout.Sider>
    </>
  );
}

export default withDefaultProps(AppSiderMenu, { fixed: true });
