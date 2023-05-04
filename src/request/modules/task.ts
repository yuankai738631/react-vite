import request from "@/request";

export const CreateTaskApi = (params:CreateTaskReq):Promise<LogonRes> => (
    request.post('/tasks/create_task', params)
)

export const QueryTasksApi = (params: QueryTaskReq):Promise<QueryTaskRes> => (
    request.post('/tasks/query_tasks', params)
)

export const DeleteTaskApi = (params: {id: number}):Promise<LogonRes> => (
    request.post('/tasks/remove_tasks', params)
)