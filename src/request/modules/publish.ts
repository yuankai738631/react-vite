import request from "@/request"

interface PublishDataType {
  code: number,
  message: string,
  data: [],
  pageInfo: object
}

export const queryPublish = (params):Promise<PublishDataType> => (
  request.post('/publish/query_publish', params)
)


export const createPublish = (params):Promise<LogonRes> => {
  return request.post('/publish/create_publish', params)
}
