import React, { useMemo } from "react";
import { Layout } from "antd";
import cls from "classnames";
import { MenuFoldOutlined } from "@ant-design/icons";
import useTypedSelector from "@/hooks/redux/use-typed-selector";
import useAppDispatch from "@/hooks/redux/use-app-dispatch";
import { actions } from "@/store/reducers/menu";
import styles from "./style.module.scss";

// 头部
function AppHeader() {
	const { collapsed, fixed } = useTypedSelector((state) => ({
		collapsed: state.menu.collapsed,
		fixed: state.layout.header_fixed,
	}));
	const dispatch = useAppDispatch();
	const handleToggleMenu = () => {
		dispatch(actions.toggle());
	};
	const className = useMemo(() => {
		return cls(collapsed && styles.collapsed, fixed && styles.fixed);
	}, [collapsed, fixed]);
	return (
		<>
			<div className={cls(styles.place_holder, className)}></div>
			<Layout.Header className={cls(styles.app_header, className)}>
				<MenuFoldOutlined className={styles.icon} onClick={handleToggleMenu} />
			</Layout.Header>
		</>
	);
}
export default React.memo(AppHeader);
