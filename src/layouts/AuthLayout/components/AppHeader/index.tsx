import React from "react";
import { Layout } from "antd";
import classNames from "classnames";
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
	return (
		<>
			<div
				className={classNames(styles.place_holder, {
					[styles.collapsed]: collapsed,
					[styles.fixed]: fixed,
				})}
			></div>
			<Layout.Header
				className={classNames(styles.app_header, {
					[styles.collapsed]: collapsed,
					[styles.fixed]: fixed,
				})}
			>
				<MenuFoldOutlined className={styles.icon} onClick={handleToggleMenu} />
			</Layout.Header>
		</>
	);
}
export default React.memo(AppHeader);
