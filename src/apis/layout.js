import httpInstance from "@/utils/http";

export function getCategotyAPI(){
    return httpInstance({
        url:'/home/category/head'
    })
}