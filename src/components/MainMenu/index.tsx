import { Menu, MenuProps } from "antd";
import { useState, ReactNode, Key } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardOutlined, DesktopOutlined, UserOutlined, ApartmentOutlined, UserAddOutlined } from "@ant-design/icons";

// type MenuItem = Required<MenuProps>['items'][number];
interface MenuItem {
    key: string;
    icon?: ReactNode;
    children?: MenuItem[];
    label: ReactNode;
}

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


const items: MenuItem[] = [
    getItem('首页', '/dashboard', <DashboardOutlined />),
    getItem('任务管理', '/task_management', <DesktopOutlined />),
    getItem("账户管理", 'user', <UserOutlined />, [
        getItem('个人信息', '/user/userinfo'),
        getItem('企业信息', '/user/auth'),
    ]),
    getItem("发布管理", "/publish_management", <ApartmentOutlined />),
    getItem("文章管理", "/article_management", <UserAddOutlined />)
];

const MainMenu = () => {
    const navigateTo = useNavigate()
    const menuClick = (e: { key: string }) => {
        // 编程式导航跳转
        navigateTo(e.key);
    }
    const currentRoute = useLocation()
    let firstOpenKey: string = ''

    function findKey(obj: { key: string }) {
        return obj.key === currentRoute.pathname
    }

    // 对比多个children
    for (let i = 0; i < items.length; i++) {
        if (items[i]!["children"] && items[i]!["children"]?.find(findKey)) {
            firstOpenKey = items[i]!.key as string
            break
        }
    }
    const [openKeys, setOpenKeys] = useState([firstOpenKey])
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys.slice(-1))
    }

    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[currentRoute.pathname]}
            mode="inline"
            items={items}
            onClick={menuClick}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
        />
    )
}

export default MainMenu
