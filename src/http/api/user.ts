import http from "..";

export const GetCaptcha = (params: any) => http.get("/orgmgt/sendCaptchaOrg", params);
export const UserLogin = (data: any) => http.post("/orgmgt/login", data);
//  住户管理
export const UserList = (data: any) => http.post("/orgmgt/careWorker/list", data);
// 职务类型
export const GetNurseLevel = () => http.get("/sys/dict/getDictItems/careworkerPosition");
