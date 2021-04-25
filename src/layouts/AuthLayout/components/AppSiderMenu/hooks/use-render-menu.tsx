import React, { Fragment, useMemo } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import IconFont from "@/components/IconFont";
import { MenuItemProps } from "@/@types/menu";
import { isArray } from "@/utils/ValidateType";
import useTypedSelector from "@/hooks/redux/use-typed-selector";
const { SubMenu, Item } = Menu;

/**
 * 菜单渲染逻辑
 * @param config
 *
 * 相关字段
 * 1. hide 控制是否隐藏菜单
 * 2. title 默认如果有title 字段,则自动生成菜单
 * 3. routes 如果有routes 会使 字段 变成 SubMenu
 *
 *	逻辑

 * Q: 如果SubMenu 使用了 hide 字段, 子菜单是否隐藏?
 * 
 * A: 不会隐藏,将会提升至上一级
 * 
 * 
 * Q: 如何将同一级的多个路由映射成同一个key 让 sider menu 识别
 * 
 * A:	最简单的是设置父级菜单 hideChildren = true
 *  	可以将同一级的路由都设置成同一个 key
 * 		适用于多个子菜单匹配一个父级菜单的场景
 * 
 */
function renderMenu(config: MenuItemProps[]): React.ReactNode {
  if (!isArray(config)) return <Fragment />;
  return config.map((item) => {
    if (item.routes) {
      if (!item.title || item.hide) {
        return renderMenu(item.routes); // 没有title属性 或者 设置了hide 直接查看下一级
      }
      if (!item.hideChildren)
        return (
          <SubMenu
            title={item.title}
            icon={item?.icon && <IconFont type={item.icon} />}
            key={item.path}
          >
            {renderMenu(item.routes)}
          </SubMenu>
        );
    }

    // 普通 hide=false title存在即可渲染
    if (!item.hide && item.title) {
      return (
        <Item
          key={item.path}
          icon={item?.icon && <IconFont type={item.icon} />}
        >
          {/* 去除最后面的斜杠 */}
          <Link to={item.path.replace(/\/$/g, "")}>{item.title}</Link>
        </Item>
      );
    }
    return <Fragment key={item.path} />;
  });
}

export default function useRenderMenu() {
  const { menu } = useTypedSelector((state) => state.menu);
  return useMemo(() => renderMenu(menu), [menu]);
}
