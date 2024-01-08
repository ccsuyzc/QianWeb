<template>
  <div class="user-settings">
    <h2>用户设置</h2>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="address">收货地址</label>
        <input type="text" id="address" v-model="address" required />
      </div>
      <div class="form-group">
        <label for="phone">电话</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>
      <!-- <div class="form-group">
       <label for="email">邮箱</label>
       <input type="email" id="email" v-model="email" required />
      </div> -->
      <div class="form-group">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-button type="primary" @click="putPassword">修改密码</el-button>

          <el-dialog
            v-model="dialogVisible"
            title="Tips"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              v-model="form.oldpassword"
              type="password"
              placeholder="请输入旧密码"
              show-password
            />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="ChangePassword">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-form-item>
      </div>
      <button
        type="submit"
        style="width: 80px; padding: 15px; margin-left: 80%"
        @click="save"
      >
        保存
      </button>
    </form>
  </div>
</template>

<script setup>
import {
  getCategoryDataByIDUser,
  updateCategoryDataByIDUser,
} from "@/apis/category";
import { ref, onMounted, reactive } from "vue";
const username = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const dialogVisible = ref(false);

const form = reactive({
  id: "",
  password: "",
  oldpassword: "",
  newpassword: "",
  userObj: {},
});

const save = async () => {
  let obj = {
    id: form.userObj.id,
    username: username.value,
    address: address.value,
    phone: phone.value,
    password: form.newpassword,
    email: form.userObj.email,
    phone: phone.value,
    role: form.userObj.role,
    status: form.userObj.status,
    address: address.value,
  };
  let i = await updateCategoryDataByIDUser(form.userObj.id, obj);
  if (i.code == 200) {
    getuserdata2(form.userObj.id);
    alert("修改成功");
  } else {
    alert("修改失败");
  }
};

onMounted(() => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    username.value = user.username;
    address.value = user.address;
    phone.value = user.phone;
    form.password = user.password;
    form.id = user.id;
    // email.value = user.email
    getuserdata(user.id);
  }
});

// 修改按钮
const putPassword = () => {
  dialogVisible.value = true;
};

// 进行密码的比对
const ChangePassword = () => {
  if (form.oldpassword != form.password) {
    form.oldpassword = "";
    alert("旧密码错误！请重新输入");
  } else {
    let i = prompt("请输入新密码");
    form.newpassword = i;
    dialogVisible.value = false;
  }
};

// 得到用户的数据
const getuserdata = async (id) => {
  let i = await getCategoryDataByIDUser(id);
  if (i.code == 200) {
    form.userObj = i.obj;
  }
  console.log("thisthsithsi", i);
};

// 得到用户的数据
const getuserdata2 = async (id) => {
  let i = await getCategoryDataByIDUser(id);
  if (i.code == 200) {
    localStorage.setItem("user", JSON.stringify(i.obj));
    username.value = i.obj.username;
    address.value = i.obj.address;
    phone.value = i.obj.phone;
    form.password = i.obj.password;
    form.id = i.obj.id;
  }
};
</script>
<style scoped>
.user-settings {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>