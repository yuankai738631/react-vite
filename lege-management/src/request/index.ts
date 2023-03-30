import axios from "axios";
import { message } from "antd";

// 创建axios实例
const instance = axios.create({
    // 基本请求路径的抽取
    baseURL: "http://192.168.3.6:8080/",
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
    error => {
        const { response } = error;
        switch(response.status) {
            case 404:
                message.error("网络请求不存在");
                break;
            case 500:
                message.error(response.data.errorMessage || "服务器异常，请稍后重试");
                break;
            default:
                message.error(response.data.errorMessage || "请求出现未知错误，请稍后重试")
        }
        return Promise.reject(error)
    }
)

export default instance