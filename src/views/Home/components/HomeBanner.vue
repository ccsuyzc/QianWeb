<script setup>
import { ref, onMounted } from "vue";
import { getBannerAPI, getShow } from "@/apis/home";
const bannerList = ref([]);
import router from "@/router";


const getBanner = async () => {
  const res = await getBannerAPI({
    distributionSite: "2",
  });
  // console.log(res);
  bannerList.value = res.result;
};

const getshow = async () => {
  const res = await getShow();
  if (res.code == 200) {
    bannerList.value = res.obj;
  }
};

onMounted(() => {
  getshow();
});

const pushto = (item) => {
  router.push({
    name: "commoditydetails",
    params: {
      id: item.id,
    },
  });
};
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img
          :src="'http://localhost:9090/api/images/' + item.image1"
          @click="pushto(item)"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>