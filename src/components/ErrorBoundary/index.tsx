import { Button, Result } from "antd";
import React, { PureComponent } from "react";
import styles from "./style.module.scss";

// 只抛出渲染时期的错误
export default class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          className={styles.wrap}
          status="error"
          title="抱歉,发生了某些错误"
          subTitle="您可以尝试重新加载页面"
          extra={[
            <Button
              type="primary"
              key="reload"
              onClick={() => window.location?.reload()}
            >
              重新加载
            </Button>,
          ]}
        />
      );
    }
    return this.props.children;
  }
}
