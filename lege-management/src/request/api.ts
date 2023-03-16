import request from "./index";

// 请求中： 请求参数和返回值的类型都需要约束

// 验证码请求
export const CaptchaApi = ():Promise<CaptchaApiRes> => (
    request.get("/prod-api/captchaImage")
)
// 登录请求
export const LoginApi = (params:LoginApiReq):Promise<LoginApiRes> => (
    request.post("/prod-api/login", params)
)