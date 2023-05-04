import React, {useState} from 'react';
import {Breadcrumb, Button, Layout, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import MainMenu from "@/components/MainMenu";

const {Header, Content, Footer, Sider} = Layout;

const breadNameMap: Record<string, string> = {
    "/task_management": "任务管理",
    "/publish_management": "发布管理",
    "/user": "人员管理",
    "/user/userinfo": "个人信息",
    "/user/auth": "权限配置"
}

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    // 面包屑
    const navigateTo = useNavigate();
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i)

    const extraBreadcrumbItems = pathSnippets.map(
        (_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
            return {
                key: url,
                title: <Button
                    type="link"
                    size="small"
                    onClick={
                        () => {
                            navigateTo(url)
                        }
                    }
                >{breadNameMap[url]}</Button>
            }
        }
    )

    const breadcrumbItems = [
        {
            title: <Button
                type="link"
                size="small"
                onClick={
                    () => {
                        navigateTo("/")
                    }
                }
            >Dashboard</Button>,
            key: 'home'
        }
    ].concat(extraBreadcrumbItems);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
                <MainMenu/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Breadcrumb
                        style={{lineHeight: "64px", marginLeft: "16px"}}
                        items={breadcrumbItems}
                    />
                </Header>
                <Content
                    style={{margin: "16px 16px 0", background: colorBgContainer}}
                    className="seit-layout-background"
                >
                    {/*窗口部分*/}
                    <Outlet/>
                </Content>
                <Footer style={{textAlign: 'center', padding: 0, lineHeight: "48px"}}>Ant Design ©2023 Created by Ant
                    UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
