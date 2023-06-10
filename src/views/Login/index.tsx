import { useNavigate } from "react-router-dom"
import { Col, Row, message, Button, Form, Input } from "antd";
import style from "./login.module.scss";
import { user } from "@/request/api"

const LoginForm = function () {

    const navigate = useNavigate()

    const formRules = {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
    };

    const onFinish = (value: any) => {
        handleSubmit(value);
    }

    const onFinishFailed = (errorInfo: any):void => {
        const {errorFields} = errorInfo;
        if (errorFields.length === 1) {
            message.warning(errorFields[0].errors[0])
        }
    }

    const handleSubmit = async (params:{username: string, password: string}): Promise<void> => {
        const {username, password} = params;
        if (username && password) {
            // const res = await user.LoginApi(params)
            const res = {
                code: 200,
                message: 'success',
                data: {
                    uid: 1,
                    token: '1'
                }
            }
            if (res.code === 500) {
                message.warning(`${res.message}, 请重新登录！`);
                return
            } else {
                const { token, uid } = res.data;
                const local = window.localStorage;
                local.setItem("token", token);
                local.setItem("uid", String(uid));
                message.success(res.message);
                navigate("/");
            }
        }
    };

    const handleLogOut = (e: any):void => {
        e.isDefaultPrevented()
        navigate("/logon")
    }

    return (
        <Form name="login" className={style['form']} labelCol={{ span: 5 }}  onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" colon={false}>
            <Form.Item label={<span className={style['form_label']}>用户名</span>} name="username" rules={formRules.username}>
                <Input />
            </Form.Item>
            <Form.Item label={<span className={style['form_label']}>密码</span>} name="password" rules={formRules.password}>
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Row gutter={32}>
                    <Col span={12}>
                        <Button htmlType="submit" className={style['btn']} block>登 录</Button>
                    </Col>
                    <Col span={12}>
                        <Button block className={style['btn']} onClick={handleLogOut}>注 册</Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

const Login = function () {
    return (
        <section className={style["section-login"]}>
            <div className={style["login__content"]}>
                <Row className={style["login__content--row"]}>
                    <Col span={10} className={style["login__content--col"]}>
                        <div className={style["login__content--col--logo"]}>
                            <img src="src/assets/img/logo-green-1x.png" alt="logo" />
                        </div>
                    </Col>

                    <Col span={14} className={style["login__content--col"]}>
                        <div className={style["login__content--col--form"]}>
                            <LoginForm />
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Login;
