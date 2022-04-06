import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Avatar  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react'
import { Layout } from 'antd';
// import I18n from "../../i18n/i18n";

import { useNavigate } from "react-router";//重定向引入
import {connect} from "react-redux"
// const { SubMenu } = Menu;
const { Header } = Layout;
function TopHeader(props) {
        // console.log(I18n.t("Title"))
  
  // const setLanguage = (locale) => {
  //   localStorage.setItem("locale", locale);
  //   window.location.reload();
   
  // };
  //函数式组件  无状态 需使用hoks   useState()
  // const [collapsed,setCollapsed] = useState(false)
  const changeCollapse = ()=>{
    // setCollapsed(!collapsed)
    //改变state的isCollapsed
    // console.log(props)
    props.changeCollapsed()


  }

  let navigate = useNavigate();//重定向

  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))//获取用户

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        {roleName}
      </Menu.Item>

      {/* <SubMenu key={2} title="语言"> */}
        {/* <Menu.Item key={4} onClick={()=>{ */}
          {/* // setLanguage() */}
        {/* }}>中文</Menu.Item> */}
        {/* <Menu.Item key={5} onClick={()=>{ */}
          {/* // setLanguage() */}
        {/* }}>英语</Menu.Item> */}
      {/* </SubMenu> */}
      
      <Menu.Item danger onClick={()=>{
        localStorage.removeItem("token")//移除token
        navigate("/login");//重定向
      }} key={3}>退出</Menu.Item>
    </Menu>
    
  );

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>

      {props.isCollapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapse} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapse} />
      )}

      <div style={{ float: "right" }}>
        <span>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          {/* {此处类似于插槽} */}
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}

const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>{
  // console.log(state)
  return {
      isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
      return {
          type: "change_collapsed"
          // payload:
      }//action 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopHeader)