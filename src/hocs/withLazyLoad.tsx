import React, { ComponentType, PureComponent, Suspense } from "react";
import { Spin } from "antd";
import { PageBaseProps } from "@/@types/route";
import styles from "./style.module.scss";
export default function withLazyLoad(WrappedComponent: ComponentType<any>) {
  class Hoc extends PureComponent<PageBaseProps> {
    render() {
      return (
        <Suspense
          fallback={
            <div className={styles.loading}>
              <Spin size="large" />
            </div>
          }
        >
          <WrappedComponent {...this.props} />
        </Suspense>
      );
    }
  }
  return Hoc;
}
