// import './assets/main.css' //默认样式引用
// 换新的
import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// 测试接口函数
// import { getCategoty } from './apis/testAPI'
// getCategoty().then(res => {
//     console.log(res,'test');
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令,图片懒加载方法实现

app.directive('img-lazy',{
    mounted(el,binding){
        // el:指令绑定的元素
        // binding binding.value 指令等于号后面绑定的表达式的值 图片url
        console.log(el,binding.value);
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                console.log(isIntersecting);
                if(isIntersecting){
                         el.src = binding.value
                }
            },
          )
    }
})