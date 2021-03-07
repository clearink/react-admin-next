import { Button, Result } from "antd";
import React from "react";

export default function Default(props: any) {
  return (
    <Result
      status="error"
      title="抱歉,发生了某些错误"
      subTitle="您可以尝试重新加载页面"
      extra={[
        <Button type="primary" key="reload" onClick={window.location.reload}>
          重新加载
        </Button>,
      ]}
    />
  );
}
