// axios基础封装
import axios from 'axios'

const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000 //响应时间
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use((req)=>{
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.token = token;
  }
  return req
})
  
// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
  })
  
  
  export default httpInstance