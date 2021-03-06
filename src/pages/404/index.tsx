import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

function Error404() {
  return (
    <Result
      className={styles.wrap}
      status="404"
      title="找不到页面"
      extra={
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      }
    />
  );
}
export default Error404;
