const isDev = process.env.NODE_ENV === "development";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	// BASE_URL: isDev
	// 	? "http://app.peplife.net/backend"
	// 	: "http://console.peplife.co:10086",
	// BASE_URL: "http://console.peplife.co:10086",
	BASE_URL: "http://app.peplife.net/backend",
	TIMEOUT: 20000,
	TOKEN: "X-Access-Token",
	SUCCESS_CODE: 200,

	/** 文件上传 url */
	UPLOAD_URL: "/upload/file/cos",
	MEDIA_URL: "",
};
