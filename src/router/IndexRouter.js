import React from 'react'
import {HashRouter,Route,Routes,Navigate} from 'react-router-dom'
import Login from '../views/login/Login'
import Detail from '../views/news/Detail'
import News from '../views/news/News'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
        <HashRouter>
          {/* 它能保持 UI 和 URL 的同步。负责分析监听 URL 的变化，在它之下的 Route 组件可以直接读取这些信息。 */}
            <Routes>
              {/* 路由中通过/login这种方式加载 可以直接得到路由属性*/}
              <Route path='/login' element={<Login/>}/>
              <Route path='/news' element={<News/>}/>
              <Route path='/detail/:id' element={<Detail/>}/>
              {/* <Route path='/' element={<NewsSandBox/> */}
              <Route path='/*' element={localStorage.getItem('token') ?
              <NewsSandBox/> : <Navigate  to='/login'/>
              //token字段类似于暗号 是否授权

              }/>

            </Routes>
        </HashRouter>
  )
}




// import React from "react";
// import { HashRouter, Routes, Route } from "react-router-dom";
// import Login from "../views/login/Login";
// import NewsSandBox from "../views/newssandbox/NewsSandBox";

// export default function IndexRouter () {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/login" element={<Login/>} />
//         <Route path="/" element={<NewsSandBox/>} />
//       </Routes>
//     </HashRouter>
//   );
// };