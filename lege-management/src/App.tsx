import { useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import router from "@/router";
import { message } from "antd";

const ToHome = function() {
    const navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/page1")
        message.warning("您已经登录！")
    }, [])
    return <></>
}

const ToLogin = function() {
    const navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/login")
        message.warning("您还没有登录或登录已失效，请登录后再访问！")
    })
    return <></>
}

const ToLogout = function() {
    const navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/logout");
    });
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
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem('uid')
    const location = useLocation()
    // 这里不能用useNavigate来实现跳转，因为需要BeforeRouterEnter是一个正常的TSX组件
    //debugger
    if ((location.pathname === "/login" || location.pathname === "/logon") && token && uuid) {
        return <ToHome />
    }
    else if ((location.pathname !== "/login" && location.pathname !== "/logon") && (!token || !uuid)) {
        return <ToLogin />
    }
    else {
        return outlet
    }
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
