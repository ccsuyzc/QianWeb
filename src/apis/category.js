import request from '@/utils/http'

// 得到全部标题栏数据，数据用来渲染到标题栏
export function getCategoryAll(){
    return request({
        url:'http://127.0.0.1:9090/api/categories',
        method:'GET',
    })
}

// 分页器
export function getValue(value){
    return request({
        url:`http://127.0.0.1:9090/api/commoditys/value/${value}`,
        method:'GET',
    })
}


// 获取全部的数据
export function getCategoryAllData(){
    return request({
        url:'http://127.0.0.1:9090/api/commoditys',
        method:'GET',
    })
}

// 得到指定种类的所有商品的数据
export function getCategoryData(id){
    return request({
        url:`http://127.0.0.1:9090/api/commoditys/categoryID/${id}`,
        method:'GET',
    })
}

// 得到指定ID的商品的相关的数据
export function getCategoryDataByID(id){
    return request({
        url:`http://127.0.0.1:9090/api/commoditys/${id}`,
        method:'GET',
    })
}

// 得到指定ID的用户的数据
export function getCategoryDataByIDUser(id){
    return request({
        url:`http://127.0.0.1:9090/api/users/${id}`,
        method:'GET',
    })
}

// 修改用户信息
export function updateCategoryDataByIDUser(id,data){
    return request({
        url:`http://127.0.0.1:9090/api/users/${id}`,
        method:'PUT',
        data
    })
}

// 添加订单
export function addCategoryDataOrder(data){
    return request({
        url:`http://127.0.0.1:9090/api/orders`,
        method:'POST',
        data
    })
}