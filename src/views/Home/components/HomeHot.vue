<script setup>
import HomePanel from './HomePanel.vue';
import { findHotAPI } from '@/apis/home'
import { ref,onMounted, reactive } from "vue";

import {getValue,getCategoryAllData} from"@/apis/category"
const newList = ref([])
const data = reactive({
  len:"",
  show:"",
  list:[],
  alllist:[],
  ye:0,
  yelen:4
})


const getNewList = async ()=>{
    const res = await findHotAPI()
    console.log(res,"Homewnew2");
    newList.value = res.result
}

// 得到全部商品数据
const getList = async ()=>{
     let i = await getCategoryAllData()
     data.len = i.obj.length
     console.log(data.len,"Homewnew");
     data.alllist = i.obj
     data.ye = Math.ceil(data.len/4)
     console.log(data.ye,"Homewnew2");
}

// 得到要展示页的数据
const getCategory = async (id)=>{
    let i = await getValue(id)
    console.log("this",i);
    if(i.code == 200){
        data.list = i.obj
        data.show = id
    }
}
onMounted(()=>{
    getNewList()
    getList()
    getCategory(1)
})


// 用户切换页
const handleCurrentChange = (index)=>{
     console.log(index); 
     getCategory(index)
}

// 用户点击上一页
const prev = (index)=>{
    getCategory(index)
   
}

// 用户点击下一页
const next = (index)=>{
    getCategory(index)
}
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气火爆 大力推荐">
  <ul class="goods-list">
    <li v-for="item in data.list" :key="item.id">
      <RouterLink :to="{
              name: 'commoditydetails',
              params: {
                id: item.id,
              },
            }">
        <img :src="'http://localhost:9090/api/images/'+item.image1" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">{{ item.price }}元</p>
      </RouterLink>
    </li>
  </ul>
  </HomePanel>
  <div class="example-pagination-block" style="margin:0 auto;">
    <el-pagination
    :page-size="data.yelen"
    layout="prev, pager, next" 
    :current-page="data.show"
    :total="data.len"
    @current-change="handleCurrentChange"
    @prev-click="prev"
    @next-click="next"
      style="margin-left:45%; font-size: 50px; padding: 10px;"
      />
  </div>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
  margin: 0 auto;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>