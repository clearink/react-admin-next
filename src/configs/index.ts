const isDev = process.env.NODE_ENV === "development";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  // BASE_URL: isDev
  // 	? "http://app.peplife.net/backend"
  // 	: "http://console.peplife.co:10086",
  // BASE_URL: "http://console.peplife.co:10086",
  BASE_URL: "http://app.peplife.net/backend",
  TIMEOUT: 20000,
  RETRY_DELAY: 3000,
  RETRY_COUNT: 4,
  TOKEN: "X-Access-Token",
  ISDEV: isDev,
  /** 文件上传 url */
  UPLOAD_URL: "/upload/file/cos",
  MEDIA_URL: "",
};
