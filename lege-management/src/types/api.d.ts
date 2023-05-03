// 注册请求的响应类型
interface LogonApiReq {
	username: string
	password: string
	againPassword?: string
	email: string
	policy?: boolean
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
	message: string;
	code: number;
	data: {
		token: string,
		uid: number
	}
}

// 创建任务请求参数
interface CreateTaskReq {
	taskName: string,
	projectName: string,
	uui: number
}

interface QueryTaskReq {
	page?: number;
	pageSize?: number;
	taskName?: string;
	projectName?: string;
	taskStatus?: number

}

// 查询任务列表响应
interface QueryTaskRes {
	code: number;
	message: string;
	data: TaskListData;
}
interface TaskList {
	id: number;
	taskName: string;
	projectName: string;
	status: number;
	creator: string;
	createTime: string;
}
interface TaskListData {
	list: TaskList[];
	total: number;
	currentPage: number;
	projectList: string[]
}
