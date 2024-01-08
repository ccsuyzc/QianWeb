<template>
  <div class="cart">
    <h1>购物车清单</h1>
    <el-table
      ref="multipleTableRef"
      :data="cartItems"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="图片" width="120" align="center">
        <template #default="scope">
          <el-image
            :src="'http://localhost:9090/api/images/' + scope.row.image1"
          />
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="商品名"
        align="center"
        width="120"
      />
      <el-table-column
        property="price"
        label="单价"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="数量" min-width="80px" align="center">
        <template #default="scope">
          <el-input-number v-model="scope.row.count" :min="1" />
        </template>
      </el-table-column>
      <el-table-column label="小计" align="center">
        <template #default="scope">
          <span>{{ scope.row.price.toFixed(2) * scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="操作" width="">
        <template #default="{ row }">
          <el-button type="primary" @click="deleteCartItem(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- <el-button @click="toggleSelection([cartItems[0]])">反选</el-button> -->
      <!-- <el-button @click="reverseSelection">反选</el-button> -->
      <el-button @click="toggleSelection()">取消全选</el-button>
      <span style="margin-left:250px;font-size: 18px; width：50px;"
        >总价：{{ totalPrice.toFixed(2) }}</span
      >
      <el-button
        type="primary"
        @click="handleSubmit"
        style="margin-left: 360px; padding: 20px"
        >结算</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { dayjs } from "element-plus";
import router from "@/router";
import { addCategoryDataOrder } from "@/apis/category";

const cartItems = ref([]);
const data = reactive({
  totalPrice: 0,
});

const multipleTableRef = ref(null);
const multipleSelection = ref([]);

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// // 反选
// const reverseSelection = () => {
//   multipleSelection.value = multipleSelection.value.reverse();
// };

// 从浏览器得到订单数据
const loadCartItems = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cartItems.value = JSON.parse(cartData);
  }
};

// 保存订单数据
const saveCartItems = () => {
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};

// 删除订单
const deleteCartItem = (item) => {
  cartItems.value = cartItems.value.filter((i) => i !== item);
  saveCartItems();
};

// 通过订单号删除订单
const deleteCartItemByID = (id) => {
  cartItems.value = cartItems.value.filter((i) => i.commodity_id!== id);
  saveCartItems();
};

// 计算选中商品的总价
const totalPrice = computed(() => {
  return multipleSelection.value.reduce((total, item) => {
    return total + item.price.toFixed(2) * parseInt(item.count, 10);
  }, 0);
});

// // 结算
// const handleSubmit = async () => {
//   console.log(multipleSelection.value);
//   let user = JSON.parse(localStorage.getItem('user'))

//   if (!user) {
//     alert('请先登录')
//     router.push({
//       name:"login"
//     })
//     return
//   }

//   let i = uuidv4()

//   for (let j = 0; j < multipleSelection.value.length; j++) {
//     let obj = {
//       id : uuidv4(), // 序号
//       commodity_id :  multipleSelection.value[j].commodity_id,
//       count : multipleSelection.value[j].count,
//       price : totalPrice,
//       orderID : i,
//       is_renove : false,
//       user_id : user.id,
//       status : 0,
//       payment_type : 0,
//       address : user.address,
//       phone : user.phone,
//       pay_time : dayjs().format('YYYY-MM-DD HH:mm:ss')
//     }
//      let shu = await addCategoryDataOrder(obj)
//      console.log("inifdoghidgdfg",shu);
//   }
//   console.log(multipleSelection.value.length);
// };

// 计算选中商品的总价
const calculateTotalPrice = () => {
  return multipleSelection.value.reduce((total, item) => {
    return total + item.price.toFixed(2) * parseInt(item.count, 10);
  }, 0);
};

const handleSubmit = async () => {
  console.log(multipleSelection.value);
  let user = JSON.parse(
    localStorage.getItem("user", (key, value) => {
      // 在 replacer 函数中排除可能导致循环引用的属性
      if (key === "someCircularProperty") {
        return undefined;
      }
      return value;
    })
  );

  if (!user) {
    alert("请先登录");
    router.push({
      name: "login",
    });
    return;
  }

  let i = uuidv4();

  for (let j = 0; j < multipleSelection.value.length; j++) {
    let obj = {
      id: uuidv4(), // 序号
      commodity_id: multipleSelection.value[j].id,
      count: multipleSelection.value[j].count,
      price: calculateTotalPrice(),
      orderID: i,
      is_renove: false,
      user_id: user.id,
      status: 0,
      payment_type: 0,
      address: user.address,
      phone: user.phone,
      pay_time: dayjs().toISOString(),
    };
    let shu = await addCategoryDataOrder(obj);
    console.log("inifdoghidgdfg", shu);
    // 删除已经发送了的订单的数据
    deleteCartItemByID(obj.commodity_id)

  }
  setTimeout(() => {
    router.push({
      name: "ok",
      params: {
        id: i,
      },
    });
  }, 900);
};

onMounted(() => {
  loadCartItems();
});
</script>
<style scoped>
.cart {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.cart-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.cart-item-info {
}

.cart-item-image {
  max-width: 150px;
  height: auto;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item-quantity {
  display: flex;
  gap: 5px;
  align-self: center;
}

.cart-item-total {
  font-weight: bold;
  align-self: center;
}

.cart-total {
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
}
</style>