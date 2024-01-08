// import './assets/main.css' //默认样式引用
// 换新的
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'

// 测试接口函数
// import { getCategoty } from './apis/testAPI'
// getCategoty().then(res => {
//     console.log(res,'test');
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')



