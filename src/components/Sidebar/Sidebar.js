import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";
const items = [
    {
        key: 'sub1',
        label: 'Quản lí cây cảnh',
        icon: <MailOutlined />,

        children: [
            {
                key: 'g1',
                label: (
                    <Link to="/manage-products/type-product" className='nav-link'>
                        Quản lí loại cây
                    </Link>
                ),
            },
            {
                key: 'g2',
                label: (
                    <Link to="/manage-products/product" className='nav-link'>
                        Quản lí cây cảnh
                    </Link>
                ),

            },

        ],
    },
    {
        key: 'sub2',
        label: (
            <Link to="/manage-user" className='nav-link'>
                Quản lí người dùng
            </Link>
        ),
        icon: <AppstoreOutlined />,

    },

    {
        key: 'sub3',
        label: 'Phân quyền người dùng',
        icon: <MailOutlined />,
        children: [
            {
                key: 'g3',
                label: (
                    <Link to="/roles" className='nav-link'>
                        Quản lí quyền hạn
                    </Link>
                ),
                path: "/roles",
            },
            {
                key: 'g4',
                label: (
                    <Link to="/group-roles" className='nav-link'>
                        Quản lí nhóm-quyền hạn
                    </Link>
                ),

            },

        ],
    },

];
const Sidebar = () => {

    const navigate = useNavigate();

    const onClick = (e) => {
        const item = items.find(item => item.key === e.key);
        if (item && item.path) {
            navigate(item.path);
        }
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default Sidebar;