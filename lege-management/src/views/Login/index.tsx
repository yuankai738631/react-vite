import {ChangeEvent, useEffect, useState} from "react";
import {Space,Input,Button,message} from "antd";
import style from "./login.module.scss";
import "./login.less";
import initLoginBg from "./init";
import {useNavigate} from "react-router-dom";
import {CaptchaApi, LoginApi} from "@/request/api";
const View = () => {
    let navigateTo = useNavigate();
    // 加载完组件后
    useEffect(() => {
        initLoginBg()
        window.onreset = function () {initLoginBg()}
        getCaptchaImg()
    }, [])
    // 获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState("")
    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value)
    }
    // 获取密码输入的信息
    const [passwordVal, setPasswordVal] = useState("")
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }
    // 获取验证码输入的信息
    const [captchaVal, setCaptchaVal] = useState("")
    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value)
    }
    // 点击登录按钮事件
    const gotoLogin = async () => {
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning("Verification failed")
            return
        }
        const params = {
            username: usernameVal.trim(),
            password: passwordVal.trim(),
            code: captchaVal.trim(),
            uuid: localStorage.getItem("uuid") as string,
        }
        const {code, msg, token} = await LoginApi(params);
        if (code === 200) {
            message.success("登录成功");
            localStorage.setItem("lege-management-token", token);
            navigateTo("/page1");
            localStorage.removeItem("uuid");
        } else {
            message.error(msg);
        }
    }
    // 点击验证码盒子事件
    const [captchaImage, setCaptchaImage] = useState("")
    const getCaptchaImg = async () => {
        const {msg, code, img, uuid} = await CaptchaApi()
        if (code === 200) {
            setCaptchaImage(`data:image/gif;base64,${img}`)
            localStorage.setItem("uuid", uuid);
        } else {
            message.error(msg);
        }
    }
    return (
        <div className={style.loginPage}>
            {/*存放背景*/}
            <canvas
                id="canvas"
                style={{display: "block"}}
            />
            {/*登录盒子*/}
            <div className={style.loginBox + " loginbox"}>
                {/*标题部分*/}
                <div className={style.title}>
                    <h1>React & Vite通用后台系统</h1>
                    <p>Strive EveryDay</p>
                </div>
                {/*表单部分*/}
                <div className="form">
                    <Space
                        direction="vertical"
                        size="large"
                        style={{display: "flex"}}
                    >
                        <Input
                            placeholder="用户名"
                            onChange={usernameChange}
                        />
                        <Input.Password
                            placeholder="密码"
                            onChange={passwordChange}
                        />
                        {/*验证码盒子*/}
                        <div className="captchaBox">
                            <Input
                                placeholder="验证码"
                                onChange={captchaChange}
                            />
                            <div
                                className="captchaImg"
                                onClick={getCaptchaImg}
                            >
                                <img
                                    height="38"
                                    src={captchaImage}
                                    alt="加载失败"
                                />
                            </div>
                        </div>
                        <Button
                            type="primary"
                            className="loginButton"
                            block
                            onClick={gotoLogin}
                        >Login</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default View;