
import requists from '@/utils/http.js'


// 邮箱验证登录
export const emailLogin = (data)=>{
    return  requists({
        url:'http://localhost:9090/login',
        method:'post',
        data:JSON.stringify(data)
    })
}

// 已经登陆之后通过token来进行登录验证，其实就是验证token是否有效
export const tokenLogin = ()=>{
    return  requists({
        url:'http://localhost:9090/login/token',
        method:'get'
    })
}

// 获取图像验证码
export const getCode = ()=>{
    return  requists({
        url:'http://localhost:9090/verification',
        method:'get'
    })
}

// 将用户邮箱和用户输入的图像验证码进行提交
export const checkCode = (data)=>{
    return  requists({
        url:'http://localhost:9090/verify',
        method:'post',
        data:JSON.stringify(data)
    })
}

// 注册
export const register = (data)=>{
    return  requists({
        url:'http://localhost:9090/register',
        method:'post',
        data:JSON.stringify(data)
    })
}