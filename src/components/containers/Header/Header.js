// import { useEffect, useState } from "react";
// import "./Header.scss"
// import { adminMenu, manageStoreMenu } from "./MenuApp";

// import { useSelector } from "react-redux";
// const Header = () => {


//     const user = useSelector((state) => state.user.user)
//     let menuApp = [];
//     if (user.groupWithRoles === "Quản trị viên") {
//         menuApp = adminMenu
//     }
//     else if (user.groupWithRoles === "Chủ cửa hàng") {
//         menuApp = manageStoreMenu
//     }
//     console.log('menuApp :', user.groupWithRoles)

//     return (<>
//         <div className="header-container">
//             <div className="header-tabs-container">
//                 {/* Render the menu items based on the selected menu */}
//                 {menuApp.map((menuGroup, index) => (
//                     <div key={index}>
//                         <h4>{menuGroup.name}</h4>
//                         <ul>
//                             {menuGroup.menus.map((menuItem, subIndex) => (
//                                 <li key={subIndex}>
//                                     <a href={menuItem.link}>{menuItem.name}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </>);
// }

// export default Header;

import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        key: 'sub1',
        icon: <MailOutlined />,
        label: 'Navigation One',
        children: [
            {
                key: '1-1',
                label: 'Item 1',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Option 1',
                    },
                    {
                        key: '2',
                        label: 'Option 2',
                    },
                ],
            },
            {
                key: '1-2',
                label: 'Item 2',
                type: 'group',
                children: [
                    {
                        key: '3',
                        label: 'Option 3',
                    },
                    {
                        key: '4',
                        label: 'Option 4',
                    },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        icon: <AppstoreOutlined />,
        label: 'Navigation Two',
        children: [
            {
                key: '5',
                label: 'Option 5',
            },
            {
                key: '6',
                label: 'Option 6',
            },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                        key: '7',
                        label: 'Option 7',
                    },
                    {
                        key: '8',
                        label: 'Option 8',
                    },
                ],
            },
        ],
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                label: 'Option 12',
            },
        ],
    },
];
const onClick = (e) => {
    console.log('click', e);
};



const Header = () => {
    return (
        <div>
            Hello
        </div>
    )
}

export default Header


// const Header = () => (
//     <Menu
//         onClick={onClick}
//         style={{
//             width: 256,
//         }}
//         mode="vertical"
//         items={items}
//     />
// );
// export default Header;