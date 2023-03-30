import {Menu, MenuProps} from "antd";
import { useState, ReactNode, Key } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {DashboardOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

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
    getItem('Dashboard', '/dashboard', <DashboardOutlined/>),
    getItem('任务管理', '/task_management', <DesktopOutlined/>),
    getItem("人员管理", 'user', <UserOutlined/>, [
        getItem('个人信息', '/user/userinfo'),
        getItem('权限配置', '/user/auth'),
    ])
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
        if (items[i]!["children"] && items[i]!["children"].find(findKey)) {
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