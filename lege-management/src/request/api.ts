import request from "./index";

// 请求中： 请求参数和返回值的类型都需要约束

// 验证码请求
export const LogonApi = (params:LogonApiReq):Promise<LogonRes> => (
    request.post("/users/UserRegistration", params)
)
// 登录请求
export const LoginApi = (params:LoginApiReq):Promise<LoginApiRes> => (
    request.post("/users/login", params)
)