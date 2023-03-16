// 验证码请求的响应类型
interface CaptchaApiRes {
	msg: string;
	img: string;
	code: number;
	captchaEnabled: boolean;
	uuid: string;
}

// 登录请求参数约束
interface LoginApiReq {
	username: string;
	password: string;
	code: string;
	uuid: string
}

// 登录响应类型约束
interface LoginApiRes {
	msg: string;
	code: number;
	token: string
}