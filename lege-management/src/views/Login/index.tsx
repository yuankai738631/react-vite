import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Row, message } from "antd";
import style from "./login.module.scss";
import { user } from "@/request/api"

const LoginForm = function () {

    const navigate = useNavigate()

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const getInputValue = (inputId: string): void => {
        const currentElement = document.querySelector(`#${inputId}`) as HTMLInputElement;

        if (!currentElement.value) return;
        if (inputId === "user-name") {
            setUsername(currentElement.value.trim())
        } else {
            setPassword(currentElement.value.trim())
        }
    }

    const handleSubmit = async (): Promise<void> => {
        if (username && password) {
            const res = await user.LoginApi({ username, password })
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

    return (
        <>
            <form className={style["form"]}>
                <div className={style["form__group"]}>
                    <input
                        type="text"
                        id="user-name"
                        className={style["form__input"]}
                        placeholder="用户名"
                        name="username"
                        required
                        onInput={() => getInputValue("user-name")}
                    />
                    <label htmlFor="user-name" className={style["form__label"]}>
                        用户名
                    </label>
                </div>

                <div className={style["form__group"]}>
                    <input
                        type="password"
                        id="password"
                        className={style["form__input"]}
                        placeholder="密码"
                        name="password"
                        required
                        onInput={() => getInputValue("password")}
                    />
                    <label htmlFor="password" className={style["form__label"]}>
                        密码
                    </label>
                </div>

                <div className={style["form_group"]}>
                    <a href="#" className={style["btn"]} onClick={handleSubmit}>
                        登 录
                    </a>
                </div>
            </form>
        </>
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
