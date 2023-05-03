import React from 'react'
import ReactDOM from 'react-dom/client'
import "reset-css"
import "@/assets/style/main.scss"
import App from './App'
import {BrowserRouter} from "react-router-dom";
// 状态管理
import {Provider} from "react-redux";
import store from "@/store";
import {ConfigProvider} from "antd"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: "#28b485"
                }
            }}>
            <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>

)
