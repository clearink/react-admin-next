import LocalStore from "./LocalStore";
import configs from "@/configs";

// 登录工具封装 仅仅简化了不用每次引入 configs
class LoginUtil {
  // 获取 token
  static getToken() {
    return LocalStore.get(configs.TOKEN);
  }

  // 设置token以及过期时间 默认一天
  static setToken(val: any, time = 86400000) {
    LocalStore.set(configs.TOKEN, val, time);
  }

  /** 清除 token 与 store 中的用户信息  */
  static clearToken() {
    // store.dispatch(actions.logout()); // 清除 store 中的 用户信息
    LocalStore.remove(configs.TOKEN);
  }

  // 判断是否登录
  // token是否已经过期 在LocalStore内自动判断
  static isLogin() {
    return !!LocalStore.get(configs.TOKEN);
  }
}

export default LoginUtil;
