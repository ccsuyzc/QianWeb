// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
// import { stop } from 'vue';

export const lazyPlugin = {
    install(app){
        // 懒加载指令逻辑
        app.directive('img-lazy',{
            mounted(el,binding){
                // el:指令绑定的元素
                // binding binding.value 指令等于号后面绑定的表达式的值 图片url
                // console.log(el,binding.value);
              const{stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // console.log(isIntersecting);
                        if(isIntersecting){
                                 el.src = binding.value
                                 stop()  //手动停止监听，防止浪费
                        }
                    },
                  )
            }
        })
    }
}