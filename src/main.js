// import './assets/main.css' //默认样式引用
// 换新的
import '@/styles/common.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// 测试接口函数
import { getCategoty } from './apis/testAPI'
getCategoty().then(res => {
    console.log(res);
})
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
