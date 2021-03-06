import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import routes from "@/routes";
import useRenderRoutes from "./useRenderRoutes";
function App() {
  const element = useRenderRoutes(routes);
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <Routes>{element}</Routes>
      </ConfigProvider>
    </Router>
  );
}

export default App;
