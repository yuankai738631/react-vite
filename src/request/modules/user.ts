import request from "@/request";

export const LogonApi = (params:LogonApiReq):Promise<LogonRes> => (
    request.post("/users/UserRegistration", params)
)
// 登录请求
export const LoginApi = (params:LoginApiReq):Promise<LoginApiRes> => (
    request.post("/users/login", params)
)