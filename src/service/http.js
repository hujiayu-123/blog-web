import axios from 'axios'
import { Loading } from 'element-ui'
import { Notification } from 'element-ui';

let loadingInstance = null
// 请求拦截
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.6)'
  });
  const userinfo = sessionStorage.getItem('userinfo')
  if(userinfo) {
    config.headers.authorization = 'Bearer ' + JSON.parse(userinfo).token
  }
  
  // 一般会进行token设置
  return config
},
(err) => {
  loadingInstance = Loading.service({
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.6)'
  });
  return Promise.reject(err)
})

// 相应拦截
axios.interceptors.response.use((response) => {
  setTimeout(() => {
    loadingInstance.close();
  },0)
  return response.data
},
(err) => {
  setTimeout(() => {
    loadingInstance.close();
  },0)
  const {response} = err
  if(response) {
    // 服务器返回了结果
    switch (response.status) {
      case 401:   // 权限不足，就比如未登录就请求接口
        break
      case 403:   // 服务器拒绝执行，一般是token或session过期了
        break
      case 404:   // 找不到地址
        break
    }
  }else {
    Notification({
      title: '错误',
      message: '请求超时，请稍后重试',
      type: 'error'
    });
    // 服务器连结果都没有返回
    if(!window.navigator.onLine) {
      // 客户端断网了，将页面跳转到断网页面，也可以结合路由 进行使用
      
      return
    }
  }
  return Promise.reject(err)
})

export default function(url, {
  method = 'get',
  baseURL = "http://localhost:3000",
  timeout = 5000,
  data = {},
  headers = {
    'Content-Type': 'application/json; charset=utf-8'
  },
  responseType = "json"
}){
  // 设置请求参数
  const config = {
    method:method,
    timeout:timeout,
    url:url,
    baseURL:baseURL,
    // withCredentials: true, // 是否携带cookie
    data:data,
    headers:headers,
    responseType:responseType
  }

  return axios(config)
}