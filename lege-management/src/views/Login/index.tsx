import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Space} from "antd";
import style from "./login.module.scss";
import "./login.less";
import initLoginBg from "./init";
import {useNavigate} from "react-router-dom";
import {user} from "@/request/api";
import {useForm} from "antd/es/form/Form";

const View = () => {
    let navigateTo = useNavigate();
    // 加载完组件后
    useEffect(() => {
        initLoginBg()
        window.onreset = function () {
            initLoginBg()
        }
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
    // 点击登录按钮事件
    const gotoLogin = async () => {
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning("Verification failed")
            return
        }
        const params = {
            username: usernameVal.trim(),
            password: passwordVal.trim(),
        }
        const {code, message: msg, data} = await user.LoginApi(params);
        if (code === 200) {
            const {token, uid} = data;
            message.success(msg);
            localStorage.setItem("lege-management-token", token);
            localStorage.setItem("uuid", String(uid))
            navigateTo("/dashboard");
        } else {
            message.error(msg);
        }
    }
    const [isModalOpen, SetIsModalOpen] = useState(false);
    // 打开注册dialog框
    const handelLogon = () => {
        if (!isModalOpen) {
            SetIsModalOpen(true)
        }
    }
    const handelCancel = () => {
        if (isModalOpen) {
            SetIsModalOpen(false)
        }
    }
    const [form] = useForm()
    // 注册事件触发
    const handelLogonEvent = async (values: any) => {
        const {code, message: msg} = await user.LogonApi(values);
        if (code === 0) {
            message.success(msg)
            useEffect(() => {
                form.resetFields()
            }, [form])
            handelCancel()
        } else if (code === -3) {
            message.warning(msg)
        } else {
            message.error(msg)
        }
    }
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 14},
        },
    };
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
                        <Button
                            type="primary"
                            className="loginButton"
                            block
                            onClick={gotoLogin}
                        >
                            登 录
                        </Button>
                        <Button
                            className="loginButton"
                            block
                            onClick={handelLogon}
                        >
                            注册
                        </Button>
                    </Space>
                </div>
            </div>
            <Modal
                title='账号注册'
                open={isModalOpen}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    style={{maxWidth: 600}}
                    onFinish={handelLogonEvent}
                >
                    <Form.Item
                        label='用户名'
                        name='account_name'
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='密码'
                        name='password'
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label='姓名'
                        name='name'
                        rules={[{required: true, message: '请输入姓名'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: '请输入你的 E-mail!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='footer-btn-offset'
                        >
                            注册
                        </Button>
                        <Button
                            htmlType='button'
                            onClick={handelCancel}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default View;