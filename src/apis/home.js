import httpInstance from '@/utils/http'

// 获取banner
 
export function getBannerAPT(){
    return httpInstance({
        url:'home/banner'
    })
}