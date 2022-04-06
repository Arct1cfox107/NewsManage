import React,{ useEffect,useState} from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import SubMenu from "antd/lib/menu/SubMenu";
import { useNavigate, useLocation} from "react-router";
import './index.css'
// import I18n from "../../i18n/i18n";
// import intl from 'react-intl-universal';

const { Sider } = Layout;
const {SubMenu} = Menu;
const iconList = {
  "/home": <UserOutlined/>,
  "/user-manage": <UserOutlined/>,
  "/user-manage/list": <UserOutlined/>,
  "/right-manage":<UserOutlined/>,
  "/right-manage/role/list":<UserOutlined/>,
  "/right-manage/right/list":<UserOutlined/>,
}
 
function SideMenu(props) {

  const [menu,setMenu] = useState([])
  useEffect(()=>{
    axios.get("/rights?_embed=children").then(
      res=>{
        // console.log(res.data)
        // console.log(I18n.t("Title"))
        setMenu(res.data)
      }
    )
  },[])
  let navigate = useNavigate();

  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
  // Menu
   const checkPagePermission=(item)=>{
    // return item.pagepermisson === 1
    return item.pagepermisson && rights.includes(item.key)
   }


  const renderMenu = (menuList) => {
    return menuList.map((item=> {
      // ？如果前面为假 undefined 后面将不会再去执行
      // 第一个因为它是空数组 我要.length大于0   再配合？因为里面（嵌套）的那一层没有length属性所以需要？否则执行后会报错
      if (item.children?.length>0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return ( checkPagePermission(item) &&<Menu.Item
          key={item.key}
          icon={iconList[item.key]}
          onClick={() => navigate(item.key)}
        >
          {item.title}
        </Menu.Item>
      );
    }));
  };

  // 高亮刷新后继续锁定
  let location = useLocation();
  // console.log(location.pathname);
  const selectKeys = [location.pathname]; // ex: ['/home']
  const openKeys = ["/" + location.pathname.split("/")[1]];
  
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      {/* 弹性布局 */}
      <div  style={{display:"flex",height:"100%","flexDirection":"column"}}>
        <div className="logo">全球新闻发布管理系统</div>
        
        {/* <div className="logo" >{intl.get('SIMPLE')}</div> */}
        {/* console.log({I18n.t("Title")}) */}
      {/* 占满 一旦出现滚动条 自己滚 */}
        <div  style={{flex:"1",overflow:"auto"}}>
          {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {renderMenu(menu)}
          </Menu> */}
          {/* 受控非受控 */}
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} className="aaaaaaa" defaultOpenKeys={openKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}

const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>({
  isCollapsed
})
export default connect(mapStateToProps)(SideMenu)




// // withRouter 已弃用  高阶组件  可以看下代码
// import {
//   UserOutlined,
// } from '@ant-design/icons';
// import React from 'react'
// import { Layout, Menu } from 'antd';
// import './index.css'
// const { Sider } = Layout;
// const {SubMenu} = Menu;

// //模拟数组结构
// const menuList = [
//   {
//     key:'/home',
//     title:'首页',
//     icon:<UserOutlined />
//   },

//   {
//     key:'/user-manage',
//     title:'用户管理',
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:'/user-manage/list',
//         title:'用户列表',
//         icon:<UserOutlined />
//       }
//     ]
//   },

//   {
//     key:'/right-manage',
//     title:'权限管理',
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:'/right-manage/role/list',
//         title:'角色列表',
//         icon:<UserOutlined />
//       },
//       {
//         key:'/right-manage/right/list',
//         title:'权限列表',
//         icon:<UserOutlined />
//       }
//     ]
//   },
 
// ]

// export default function SideMenu() {

//   const renderMenu = (menuList)=>{
//     return menuList.map(item=>{
//         if(item.children){
//           return <SubMenu key={item.key} icon={item.icon} title={item.title}></SubMenu>
//         }
//         return <Menu.item key={item.key} icon={item.icon}>{item.title}</Menu.item>

//       })
//   }
//   return (
//     <Sider trigger={null} collapsible collapsed={false} >
//     <div className="logo">全球新闻发布管理系统</div>
//     <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//       {/* <Menu.Item key="1" icon={<UserOutlined />}>
//         nav 1
//       </Menu.Item>
//       <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//         nav 2
//       </Menu.Item>
//       <Menu.Item key="3" icon={<UploadOutlined />}>
//         nav 3
//       </Menu.Item>
//       <SubMenu key="sub4" icon={<UploadOutlined />} title="用户管理">
//           <Menu.Item key="9">Option 9</Menu.Item>
//           <Menu.Item key="10">Option 10</Menu.Item>
//           <Menu.Item key="11">Option 11</Menu.Item>
//           <Menu.Item key="12">Option 12</Menu.Item>
//         </SubMenu> */}
//         {renderMenu(menuList)}
//     </Menu>
//   </Sider>
//   )
// }
