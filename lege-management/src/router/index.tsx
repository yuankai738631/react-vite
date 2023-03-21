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
import Login from "@/views/Login";
import Home from "@/views/Home";
const About = lazy(() => import("@/views/About"));
const Page1 = lazy(() => import("@/views/Page1"));
const TaskManagement = lazy(() => import("@/views/TaskManagement/taskManagement"));
const NotFindPage = lazy(() => import("@/NotFindPage"))
import {Navigate} from "react-router-dom";

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


const routes = [
    {
        path: "/",
        element: <Navigate to="/page1" />,
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "page1",
                element: widthLoadingComponent(<Page1 />)
            },
            {
                path: "task_management",
                element: widthLoadingComponent(<TaskManagement />)
            },
            {
                path: "sub1/about",
                element: widthLoadingComponent(<About />)
            },
            {
                path: "404",
                element: widthLoadingComponent(<NotFindPage />)
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <Navigate to="/404" />
    }
    // {
    //     path: "/home",
    //     // element: <Home />
    //     element: <Home />
    // },

]

export default routes