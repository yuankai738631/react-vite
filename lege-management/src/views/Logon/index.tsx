import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Card, Checkbox, message } from "antd";
import style from "./logon.module.scss";
import {user} from "@/request/api";

const LogoutForm = () => {
  const navigate = useNavigate();

  const formRules = {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
    email: [{ required: true, message: "请输入邮箱地址" }]
  };

  const AGREEMENT = "https://helps.58.com/rules/detail?siteId=5502&terminal=PC&contentId=302338&sourceType=58pc-zz-khfw-khbzqt&spReturn=1";
  const POLICY = "https://helps.58.com/rules/detail?siteId=5502&terminal=PC&contentId=302337&sourceType=58pc-zz-khfw-khbzqt&spReturn=1"
  
  const handleClick = (e:any, path:string):void => {
    e.isDefaultPrevented();
    window.open(path, '_blank');
  }

  const onFinish = (value: LogonApiReq) => {
    if(!value.policy) {
      message.warning("请勾选同意协议");
      return
    } 
    if (value.password !== value.againPassword) {
      message.warning("两次密码输入不同");
      return
    } 
    handleSubmit(value);
  }

  const handleSubmit = async (params: LogonApiReq) => {
    // TODO: 后端接口未更改
    const res = await user.LogonApi(params);
    if (res.code === 500) {
      message.error(res.message);
      return
    }
    message.success(res.message);
    navigate("/login");
  }

  return (
    <Form 
      colon={false} 
      className={style['logout_section__form']} 
      onFinish={onFinish}
      labelCol={{span: 5}}
    >
      <Form.Item label={<span>用户名</span>} name="username" rules={formRules.username}>
        <Input />
      </Form.Item>
      <Form.Item label={<span>密码</span>} name="password" rules={formRules.password}>
        <Input.Password />
      </Form.Item>
      <Form.Item label={<span>确认密码</span>} name="againPassword" rules={formRules.password}>
        <Input.Password />
      </Form.Item>
      <Form.Item label={<span>姓名</span>} name="name" rules={formRules.password}>
        <Input />
      </Form.Item>
      <Form.Item label={<span>邮箱</span>} name="email" rules={formRules.email}>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="policy" valuePropName="checked" wrapperCol={{ offset: 1, span: 24 }}>
        <Checkbox>
          <span>已阅并同意<a href="#" onClick={(e) => handleClick(e, AGREEMENT)}>《58同城使用协议》</a>&<a href="#" onClick={(e) => handleClick(e, POLICY)}>《隐私政策》</a></span>
        </Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 1, span: 24 }}>
        <Button type="primary" block htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  )
}

const Logon = () => {
  const navigate = useNavigate();
  return (
    <section className={style['logout_section']}>
      <Card className={style['logout_section__content']} title="账号注册" extra={<Button type="link" onClick={() => navigate('/login')}>返回</Button>}>
        <LogoutForm />
      </Card>
    </section>
  )
}

export default Logon;
