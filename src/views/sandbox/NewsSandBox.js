import React, { useEffect } from 'react'
import { Layout } from 'antd';
// import { Routes,Route, Navigate } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
// import Home from './home/Home'
// import UserList from './user-manage/UserList'
// import RoleList from './right-manage/RoleList'
// import RightList from './right-manage/RightList'
// import Nopermission from './nopermission/Nopermission'
import './NewsSandBox.css'
import NewsRouter from '../../components/sandbox/NewsRouter';
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const {Content} = Layout

export default function NewsSandBox() {
  Nprogress.start()
  useEffect(()=>{
    Nprogress.done()
  })
  return (
    <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow:"auto",//内容自己的导航栏
            }}
          >
            {//路径匹配哪个  content就会加载哪个  不太明白  二者的联系在哪？
 }
              {/* <Routes>
              <Route path='home' element={<Home/>} />
              <Route path='user-manage/list' element={<UserList/>} />
              <Route path='right-manage/role/list' element={<RoleList/>} />
              <Route path='right-manage/right/list' element={<RightList/>} />
              <Route path='/' element={<Navigate replace from='/' to='home'   />}  />
              <Route path='/*' element={<Nopermission/>}/>
              </Routes> */}
            <NewsRouter></NewsRouter>
            </Content>

        </Layout>
       
    </Layout>
  )
}
