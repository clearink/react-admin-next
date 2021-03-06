// Axios 二次封装
import Axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { message } from "antd";
import configs from "@/configs";
import LoginUtil from "@/utils/LoginUtil";

// type Method = "get" | "post" | "delete" | "head" | "put" | "options" | "patch"
const requestMap = new Map<string, { time: number }>();
// 多次请求相隔时间不能小于200ms
class Http {
  private axios: AxiosInstance = Axios.create();
  private timer: undefined | number = undefined;
  private SAME_REQUEST = "SAME_REQUEST_SHOULD_CANCEL";
  private SAME_REQUEST_MIN_INTERVAL = 0; // 相同请求间隔最小时间

  constructor() {
    const { axios } = this;
    this.defaultConfig(axios);

    // 拦截器
    this.requestIntercept(axios);
    this.responseIntercept(axios);
  }

  // axios 默认值
  private defaultConfig(axios: AxiosInstance) {
    axios.defaults.timeout = configs.TIMEOUT;
    axios.defaults.baseURL = configs.BASE_URL;
    axios.defaults.headers = {
      "Content-Type": "application/json;charset=utf-8",
    };
  }

  // 请求拦截器
  private requestIntercept(axios: AxiosInstance) {
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const token = LoginUtil.getToken();
        if (token) config.headers[configs.TOKEN] = token;
        // const { url, params } = config;
        // const cache = requestMap.get(`${url}${params}`);

        // if (cache && Date.now() - cache.time < this.SAME_REQUEST_MIN_INTERVAL) {
        //   return Promise.reject({ code: this.SAME_REQUEST, config });
        // } else {
        //   requestMap.set(`${url}${params}`, { time: Date.now() });
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截器 根据项目不同 需要有不同的逻辑
  private responseIntercept(axios: AxiosInstance) {
    axios.interceptors.response.use(
      async (response: AxiosResponse) => {
        /**
         * 处理各种错误码逻辑
         */
        const {
          data: { code },
        } = response;
        console.group("响应拦截器");
        console.log(response);
        console.groupEnd();
        // 与后台协商接口状态
        if (code === 200) {
          return response;
        }
        this.errorHandle(response);
        return Promise.reject(response);
      },
      // 多半是服务器问题
      (error: AxiosError) => {
        // 为了更好的提示动画
        if (error?.code !== this.SAME_REQUEST) {
          this.errorHandle(error.response);
          console.group("响应拦截器error callback");
          console.log(error);
          console.groupEnd();
        }
        return Promise.reject(error);
      }
    );
  }

  // error handle

  private errorHandle(response?: AxiosResponse<any>) {
    const {
      data: { code },
      data,
    } = response || { data: { code: null } };
    if (code === 1001) {
      console.log("token 过期了 清除用户登录信息");
      LoginUtil.clearToken();
    } else this.showError(data);
  }

  // antd message 更流畅
  private showError(error: any) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      message.error({
        key: "error",
        content: error?.message ? error?.message : "访问出错",
      });
    }, 300);
  }

  // get
  public get<R = any>(url: string, params?: Object) {
    return this.axios.get<R>(url, { params });
  }

  // post
  public post<R = any>(
    url: string,
    data: Object,
    options?: AxiosRequestConfig
  ) {
    return this.axios.post<R>(url, data, options);
  }

  // put
  public put<R = any>(url: string, data: Object, options?: AxiosRequestConfig) {
    return this.axios.put<R>(url, data, options);
  }

  // delete
  public delete<R = any>(url: string, options?: AxiosRequestConfig) {
    return this.axios.delete<R>(url, options);
  }
}

export default new Http();
