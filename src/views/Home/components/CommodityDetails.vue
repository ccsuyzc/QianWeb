<template>
  <div class="product-details">
    <div class="product-image">
      <img
        :src="'http://localhost:9090/api/images/' + data.product.image1"
        alt="Product Image"
      />
    </div>
    <div class="product-info">
      <h2>{{ data.product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <span>价格:</span>
        <span style="font-size: 30px; margin-left: 10px"
          >{{ data.product.price }}元</span
        >
      </div>
      <div class="product-quantity">
        <span>购买数量：</span>
        <el-input-number v-model="data.quantity" :min="1" />
      </div>
      <div>
        <button @click="addToCart">添加到购物车</button>
        <button style="margin-left: 10px" @click="pushtoCart">
          前往购物车
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { getCategoryDataByID } from "@/apis/category";
import router from "@/router";

const data = reactive({
  product: {},
  quantity: 1,
});

const product = ref({});

const route = useRoute();

const fetchProductDetails = async () => {
  let i = await getCategoryDataByID(route.params.id);
  console.log("thissf", i);
  if (i.code == 200) {
    data.product = i.obj;
  }
};

// const addToCart = () => {
//   let orders;
//   orders = JSON.parse(localStorage.getItem("cart"));
//   if (orders) {
//     let val = 1;
//     for (let i = 0; i < orders.length; i++) {
//       console.log("data.product.id", data.product.id);
//       if (orders[i].id == data.product.id) {
//         orders[i].count += data.quantity;
//         localStorage.setItem("cart", JSON.stringify(orders));
//         val = 0;
//         router.push({
//           name: "cart",
//         });
//         break;
//       }
//     }
//     if (val == 1) {
//       orders.push({
//         id: data.product.id,
//         commodity_id: data.product.category_id,
//         count: data.quantity,
//         price: data.product.price,
//         image1: data.product.image1,
//         name: data.product.name,
//       });
//       localStorage.setItem("cart", JSON.stringify(orders));
//     }
//   } else {
//     orders = [
//       {
//         id: data.product.id,
//         commodity_id: data.product.category_id,
//         count: data.quantity,
//         price: data.product.price,
//         image1: data.product.image1,
//         name: data.product.name,
//       },
//     ];
//     localStorage.setItem("cart", JSON.stringify(orders));
//   }
//   router.push({
//     name: "cart",
//   });
//   console.log("执行了");
// };

const addToCart = () => {
  try {
    let orders = JSON.parse(localStorage.getItem("cart")) || [];

    const existingOrder = orders.find((order) => order.id === data.product.id);

    if (existingOrder) {
      existingOrder.count += data.quantity;
    } else {
      orders.push({
        id: data.product.id,
        commodity_id: data.product.category_id,
        count: data.quantity,
        price: data.product.price,
        image1: data.product.image1,
        name: data.product.name,
      });
    }

    localStorage.setItem("cart", JSON.stringify(orders));
    router.push({ name: "cart", replace: true });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const pushtoCart = () => {
  router.push({
    name: "cart",
  });
};

onMounted(() => {
  fetchProductDetails();
});
</script>
<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
}

.product-description {
  margin-top: 10px;
  margin-bottom: 20px;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-price span:first-child {
  font-weight: bold;
}

.product-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-quantity input {
  width: 50px;
  margin-left: 10px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #35a670;
}
</style>