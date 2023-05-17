import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategotyAPI } from '@/apis/layout';
export const useCategoryStore = defineStore('category', () => {
    // 导航列表的数据管理
    const caregoryList = ref([])

    const getCategoty = async ()=>{
        const res = await getCategotyAPI()
        caregoryList.value = res.result
        console.log(caregoryList.value);
    }


  return{
    caregoryList,
    getCategoty
  }
})
