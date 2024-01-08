import httpInstance from '@/utils/http'

// 获取banner
 
// export function getBannerAPT(){
//     return httpInstance({
//         url:'home/banner'
//     })
// }


// 得到轮播图数据
export function getShow(){
  return httpInstance(
    {
      url:"http://127.0.0.1:9090/api/commoditys/isshow",
      method:"GET",
    }
  )
}

export function getBannerAPI (params = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}



/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
      url:'/home/new'
    })
  }


  /**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHotAPI = () => {
    return httpInstance({
      url:'/home/hot'
    })
  }

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = ()=>{
    return httpInstance({
        url:'/home/goods'
    })
}