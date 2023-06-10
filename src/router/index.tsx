// 组件路由写法

// import App from "@/App"
// import Home from "@/views/Home";
// import About from "@/views/About";
// import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// // 两种路由模式：BrowserRouter(History模式), HashRouter(Hash模式)
//
// const baseRouter = () => (
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<App />}>
//                 {/*重定向： Navigate*/}
//                 <Route path="/" element={<Navigate to="/home"/>}></Route>
//                 <Route path="/home" element={<Home />}></Route>
//                 <Route path="/about" element={<About />}></Route>
//             </Route>
//         </Routes>
//     </BrowserRouter>
// )
//
// export default baseRouter

// -----------路由表写法-----------------------------------
import React, {lazy} from "react"; // 路由懒加载
import {Navigate} from "react-router-dom";
import {DashboardOutlined, DesktopOutlined, ApartmentOutlined} from "@ant-design/icons";
import {RouteObject} from "@/types/routes";

const Login = lazy(() => import("@/views/Login"));
const Logon = lazy(() => import("@/views/Logon"));
const Home = lazy(() => import("@/views/Home"))
const UserInfo = lazy(() => import("@/views/UserManagement/UserInfo"));
const Dashboard = lazy(() => import("@/views/PixiPage/pixiPage"));
const TaskManagement = lazy(() => import("@/views/TaskManagement/taskManagement"));
const NotFindPage = lazy(() => import("@/NotFindPage"))
const UserAuth = lazy(() => import("@/views/UserManagement/UserAuth"));
const PublishManage = lazy(() => import("@/views/PublishManage"))
const ArticleManagement = lazy(() => import("@/views/ArticleManagement"))

/** 报错：Uncaught Error: A component suspended while responding to synchronous input.
 * This will cause the UI to be replaced with a loading indicator.
 * To fix, updates that suspend should be wrapped with startTransition.
 */
// 懒加载的模式需要添加Loading组件
const widthLoadingComponent = (component: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {component}
    </React.Suspense>
)


const routes:RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/dashboard"/>,
    },
    {
        path: "/",
        element: widthLoadingComponent(<Home/>),
        children: [
            {
                icon: <DashboardOutlined/>,
                path: "dashboard",
                element: widthLoadingComponent(<Dashboard/>)
            },
            {
                path: "task_management",
                icon: <DesktopOutlined/>,
                element: widthLoadingComponent(<TaskManagement/>)
            },
            {
                path: "publish_management",
                icon: <ApartmentOutlined />,
                element: widthLoadingComponent(<PublishManage />)
            },
            {
                path: "article_management",
                element: widthLoadingComponent(<ArticleManagement/>)
            },
            {
                path: "user/userinfo",
                element: widthLoadingComponent(<UserInfo/>)
            },
            {
                path: "user/auth",
                element: widthLoadingComponent(<UserAuth/>)
            },
            {
                path: "404",
                element: widthLoadingComponent(<NotFindPage/>)
            },
        ]
    },
    {
        path: "/login",
        element: widthLoadingComponent(<Login/>)
    },
    {
        path: "/logon",
        element: widthLoadingComponent(<Logon/>)
    },
    {
        path: "*",
        element: <Navigate to="/404"/>
    }

]

export default routes
