import axios from "axios";

// 创建axios实例
const instance = axios.create({
    // 基本请求路径的抽取
    baseURL: "http://127.0.0.1:8000/",
    // 请求超时时间
    timeout: 20000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    res => {
        return res.data
    },
    error => Promise.reject(error)
)

export default instance