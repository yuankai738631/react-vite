import {Menu, MenuProps} from "antd";
import React, {useState} from "react";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate, useLocation} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
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
    getItem('首页', '/page1', <PieChartOutlined />),
    getItem('任务管理', '/task_management', <DesktopOutlined />),
    getItem('About', 'sub1', <UserOutlined />, [
        getItem('Tom', '/sub1/about'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const MainMenu: React.FC = () => {
    const navigateTo = useNavigate()
    const menuClick = (e: {key:string}) => {
        // 编程式导航跳转
        navigateTo(e.key);
    }
    const currentRoute = useLocation()
    let firstOpenKey:string = ''
    function findKey(obj:{key:string}) {
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