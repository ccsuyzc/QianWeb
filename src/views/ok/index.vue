<template>
   <div class="success-page">
    <h1>下单成功</h1>
    <p>订单号：<span ref="orderNumberRef">{{ data.orderNumber }}</span><button @click="copyOrderNumber">复制</button></p>
   <a @click="pushotohome">返回首页</a>
  </div>
</template>
<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
import { reactive, onMounted, ref } from "vue";
const data = reactive({
  orderNumber: "",
});
onMounted(() => {
  data.orderNumber = route.params.id;
});

const orderNumberRef = ref(null);

function copyOrderNumber() {
  navigator.clipboard.writeText(orderNumberRef.value.innerText);
  alert("订单号已复制到剪贴板");
}

const pushotohome = ()=>{
    router.push({
        name:"home",
        
    })
}
</script><style scoped>
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

span {
  margin-right: 0.5rem;
}

button {
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}
</style>