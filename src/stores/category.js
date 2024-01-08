import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategotyAPI } from '@/apis/layout';
import {getCategoryAll} from "@/apis/category"
export const useCategoryStore = defineStore('category', () => {
    // 导航列表的数据管理
    const caregoryList = ref([])

    const getCategoty = async ()=>{
        const res = await getCategoryAll()
        if (res.code == 200){
            caregoryList.value = res.obj
        }
    }


  return{
    caregoryList,
    getCategoty
  }
})
