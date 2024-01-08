<template>
  <div class="register-page">
    <h1>注册</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          autofocus
          placeholder="只能输入qq邮箱"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">确认密码</label>
        <input
          type="password"
          id="confirm-password"
          v-model="form.confirmPassword"
          required
        />
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template><script setup>
import { reactive } from "vue";
import { register} from "@/apis/login"
import { v4 as uuidv4 } from 'uuid';
import router from "@/router";


const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
});

const onSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }
   
  let obj = {
    id:uuidv4(),
    username: form.username,
    password: form.password,
    email: form.email,
  };
  let i = await register(obj);
  if (i.code === 200) {
    alert("注册成功");
    router.push({ name: "login" });
  } else {
    alert(i.msg);
  }
  
};
</script><style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 2rem;
}

form {
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>