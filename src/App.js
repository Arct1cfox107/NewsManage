import IndexRouter from './router/IndexRouter'
import { Provider } from 'react-redux'
import './App.css'
import { store,persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

// import React, { useEffect, useState } from "react";
// import I18n from "./i18n/i18n";

// import intl from 'react-intl-universal';
// const locales = {
//   "en": require('./locales/en-EN.json'),
//   "zh": require('./locales/zh-CN.json'),
// };
function App() {
  // useEffect(() => {
  //   if (localStorage.getItem("locale")) {
  //     I18n.locale = localStorage.getItem("locale");
  //   } else {
  //     I18n.locale = window.navigator.language.toLowerCase();
  //   }
  // }, []);
  // state = {initDone: false}
  // const [initDone,setInitDone] = useState(false)
  // const loadLocales=()=>{
    // intl.init({
      // currentLocale: localStorage.getItem('locale') || localStorage.getItem("defaultLng") ||  'zh', 
      // locales,
    // }).then(() => {
      // setInitDone({initDone: true});
      // });
  // }
  // useEffect(() => {
  //   let lang =(navigator.language || navigator.browserLanguage).toLowerCase();
  //   if(lang.indexOf('zh')>=0)
  //   {
  //     // 假如浏览器语言是中文
  //     localStorage.setItem("defaultLng","zh")
  //   }else{
  //     // 假如浏览器语言是其它语言
  //     localStorage.setItem("defaultLng","en")
  //   }
  //   loadLocales()
  
  // }, []);

 
   
  
  return <Provider store={store}>
     {/* state.initDone && <div>
        {intl.get('SIMPLE')}
       </div> */}
    <PersistGate loading={null} persistor={persistor}>
      <IndexRouter></IndexRouter>
    </PersistGate>
  </Provider>
}
export default App