// 注册请求的响应类型
interface LogonApiReq {
	account_name: string,
	password: string,
	name: string,
	email: string
}
interface LogonRes {
	code: number;
	message: string;
}

// 登录请求参数约束
interface LoginApiReq {
	username: string;
	password: string;
}

// 登录响应类型约束
interface LoginApiRes {
	msg: string;
	code: number;
	data: {
		token: string
	}
}