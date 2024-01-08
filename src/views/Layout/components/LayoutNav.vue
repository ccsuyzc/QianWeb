<script setup>
import router from '@/router';
import {onMounted, reactive} from "vue"
const pushtoCart = ()=>{
  router.push('/cart')
}



const data = reactive({
  user:{
  },
  isLogin:false
})

const newU = ()=>{
     data.user  = JSON.parse(localStorage.getItem('user'))
     if (data.user){
       data.isLogin = true
       console.log("data",data);
     }
}

onMounted(() => {
   newU();
})

const pushtoLogin = ()=>{
  router.push({
    name:"login"
  })
}

const deleteLogin = ()=>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  data.user = {}
  data.isLogin = false
}

const pushtoUser = ()=>{
  if (localStorage.getItem('token')){
    router.push({
      name:"user"
    })
  }else{
    router.push({
      name:"login"
    })
  }
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="data.isLogin">
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="deleteLogin">
              <template #reference>
                <a  href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a @click="pushtoCart">购物车</a></li>
          <li><a @click="pushtoUser">个人中心</a></li>
        </template>
        <template v-else>
          <li><a @click="pushtoLogin" href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>