<script setup>
import { getCategoryAll, getCategoryData } from "@/apis/category";
import { ref, watch, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getBannerAPI } from "@/apis/home";
import HomePanel from "@/views/Home/components/HomePanel.vue";

const data = reactive({
  list: [],
});

// 获取数据
const categoryData = ref({});
const route = useRoute();
const getCategory = async () => {
  const res = await getCategoryData(route.params.id);
  // categoryData.value = res.result
  console.log("res", res);
  if (res.code == 200) {
    data.list = res.obj;
  }
};

watch(
  route,
  () => {
    getCategory();
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <HomePanel title="" sub-title="">
        <ul class="goods-list">
          <li v-for="item in data.list" :key="item.id">
            <RouterLink :to="{
              name: 'commoditydetails',
              params: {
                id: item.id,
              },
            }">
              <img
                :src="'http://localhost:9090/api/images/' + item.image1"
                alt=""
              />
              <p class="name">{{ item.name }}</p>
              <p class="price">{{ item.price }}元</p>
            </RouterLink>
          </li>
        </ul>
      </HomePanel>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #ffffff;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #ffffff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #ffffff;
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
