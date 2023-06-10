import request from "@/request"

interface PublishDataType {
  code: number,
  message: string,
  data: [],
  pageInfo: object
}

interface PubblishParamsType {
  id?: string | number
  title?: string
  page?: number
  pageSize?: number
  status?: 0 | 1
  type?: 'list'

}

export const queryPublish = (params: PubblishParamsType):Promise<PublishDataType> => (
  request.post('/publish/query_publish', params)
)


export const createPublish = (params):Promise<LogonRes> => {
  return request.post('/publish/create_publish', params)
}
