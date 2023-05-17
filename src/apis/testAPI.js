import httpInstance from "@/utils/http";

export function getCategoty(){
   return httpInstance({
        url:'home/category/head'
    })
}