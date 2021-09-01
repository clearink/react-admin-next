import React, { ComponentType, lazy, PureComponent, Suspense } from "react";
import { Spin } from "antd";
import { PageBaseProps } from "@/@types/route";
import styles from "./style.module.scss";

const fallback = (
	<div className={styles.loading}>
		<Spin size='large' />
	</div>
);
export default function withLazyLoad(factory: () => Promise<{ default: ComponentType<any> }>) {
	const WrappedComponent = lazy(factory);
	return class Hoc extends PureComponent<PageBaseProps> {
		render() {
			return (
				<Suspense fallback={fallback}>
					<WrappedComponent {...this.props} />
				</Suspense>
			);
		}
	};
}
