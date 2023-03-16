import {useEffect} from 'react'
import {useRoutes, useLocation, useNavigate} from "react-router-dom"
import router from "@/router";
import {message} from "antd";


function ToHome() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo("/page1")
        message.warning("您已经登录！")
    },[])
    return <></>
}

function ToLogin() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo("/login")
        message.warning("您还没有登录，请登录后再访问！")
    })
    return <></>
}

function BeforeRouterEnter() {
    // 封装路由守卫
    const outlet = useRoutes(router)
    /**
     * 1.访问登录页面， 有token， 跳转首页
     * 2.访问不是登录页， 无token， 跳转登录页
     * 3.其余的正常放行
     * */
    const token = localStorage.getItem("lege-management-token");
    const location = useLocation()
    // 这里不能用useNavigate来实现跳转，因为需要BeforeRouterEnter是一个正常的TSX组件
    if (location.pathname === "/login" && token)
    {
        return <ToHome />
    }
    if (location.pathname !== "/login" && !token)
    {
        return <ToLogin />
    }
    return outlet
}
function App() {
    return (
        <div className="App">
            {/*<Link to="/home">Home</Link>*/}
            {/*|*/}
            {/*<Link to="/about">about</Link>*/}
            {/*类似于vue中的router-view*/}
            {/*<Outlet></Outlet>*/}
            <BeforeRouterEnter />
        </div>
    )
}

export default App
