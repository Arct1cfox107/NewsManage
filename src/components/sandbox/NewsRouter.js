import React, { useState, useEffect } from "react";
import Home from "../../views/sandbox/home/Home";
import RightList from "../../views/sandbox/right-manage/RightList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import UserList from "../../views/sandbox/user-manage/UserList";
import NewsCategory from "../../views/sandbox/news-manage/NewsCategory";
import NewsPreview from "../../views/sandbox/news-manage/NewsPreview";
import NewsAdd from "../../views/sandbox/news-manage/NewsAdd";
import NewsDraft from "../../views/sandbox/news-manage/NewsDraft";
import NoPermission from "../../views/sandbox/nopermission/Nopermission";
import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";
import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import NewsUpdate from "../../views/sandbox/news-manage/NewsUpdate";
import {Spin} from "antd"
import {connect} from 'react-redux'

const LocalRouterMap = {//进行映射
  "/home": <Home/>,
  "/user-manage/list": <UserList/>,
  "/right-manage/role/list": <RoleList/>,
  "/right-manage/right/list": <RightList/>,
  "/news-manage/add": <NewsAdd/>,
  "/news-manage/draft": <NewsDraft/>,
  "/news-manage/category": <NewsCategory/>,
  "/news-manage/preview/:id":<NewsPreview/>,
  "/news-manage/update/:id":<NewsUpdate/>,
  "/audit-manage/audit": <Audit/>,
  "/audit-manage/list": <AuditList/>,
  "/publish-manage/unpublished": <Unpublished/>,
  "/publish-manage/published": <Published/>,
  "/publish-manage/sunset": <Sunset/>,
};

function NewsRouter(props) {

  const [backRouteList, setbackRouteList] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then((res) => {
        // console.log(res)
      setbackRouteList([...res[0].data, ...res[1].data]);//27个扁平化的数据
      console.log([...res[0].data, ...res[1].data])
    });
  }, []);

  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))

  const checkRouter = (item)=>{
    //      路径被删除                   开关被关闭
    // return LocalRouterMap[item.key] && item.pagepermisson
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }
  

  const  checkUserPermission=(item)=>{
    //   当前登录用户权限列表.includes(item.key)
    // rights在application中可以找到
      return rights.includes(item.key)
  }

  return (
    <Spin size="large" spinning={props.isLoading}>
    <Routes>
      {
        backRouteList.map((item) => 
        {
            // 路由开关未开启或者该权限在权限列表管理中删掉     当前登录用户有无资格显示组件内容
          if(checkRouter(item) && checkUserPermission(item)){
            return <Route
            path={item.key}
            key={item.key}
            element={LocalRouterMap[item.key]}
          />}
            //   return <NoPermission/> 因为map遍历需要设置key
            return null

          })
      }

      <Route path="/" element={<Navigate replace from="/" to="/home" />} />

      {/*刷新页面是有时403会一闪而过 因为 [backRouteList一开始是一个空数组所以不会渲染 map而 下面这一行会早早的渲染出来 */}
      {/* <Route path="*" element={<NoPermission />} /> */}
      {
          backRouteList.length>0 && <Route path="*" element={<NoPermission />}></Route>
      }
    </Routes>
    </Spin>
  );
}
const mapStateToProps = ({LoadingReducer:{isLoading}})=>({
  isLoading
})
export default connect(mapStateToProps)(NewsRouter)