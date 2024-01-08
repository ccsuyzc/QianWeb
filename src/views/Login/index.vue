<script setup>
import router from "@/router";
import { reactive, ref, onMounted } from "vue";
import { emailLogin, tokenLogin, getCode, checkCode } from "@/apis/login";

onMounted(() => {
  TokenIsEffective();
});

const form = reactive({
  email1: "",
  password1: "",
});

// 决定是不是展示验证框
const centerDialogVisible = ref(false);

// 标志展示哪个表单
let showForm = ref("form1");

const state = reactive({
  buttonText: "获取验证码",
  IMGISOK:false,
  isShowError:false, // 是否展示图像验证错误的消息
  email: "",
  captchaImage: null,
  captchaAnswer: "", // 用户输入的图像图像验证码
  captchaId: "",     // 图像验证码的id
  captchaInput: "",  // 发到邮箱的验证码
});

// 检查是不是已经有token
const TokenIsEffective = () => {
  if (localStorage.getItem("token")) {
    tokenLogin()
      .then((Response) => {
        console.log("Response", Response);
        if (Response.code == "200") {
          router.push({
            name: "home",
          });
        }
      })
      .catch(() => {});
  }
};

import { UsersStore } from "@/stores/counter";
const Ustore = UsersStore();
// 进行邮箱和密码验证登录的时候
const toControl = async () => {
  let bool = MailboxPasswordLogon(form.email1, form.password1);
  if (bool) {
    let i = await emailLogin({ email: form.email1, password: form.password1 });
    console.log("opopopopo", i);
    if (i.code == 200) {
      localStorage.setItem("token", i.token);
      localStorage.setItem("user", JSON.stringify(i.obj));
      Ustore.store.user = i.obj;

      router.push({
        name: "home",
      });
    } else {
      alert("登录失败,密码或者账号错误");
    }
  } else {
    alert("输入格式有误");
    form.password1 = "";
    form.email1 = "";
  }
};

// 切换为其他方式登录
const switchFrom = (name) => {
  showForm.value = name;
};

// 邮箱密码登录
const MailboxPasswordLogon = (email, password) => {
  if (email == "" || password == "") {
    return false;
  }
  // qq邮箱正则验证
  let regularemail = /^[0-9]{9,}@qq.com$/;
  let regularPassword = /[0-9a-zA-Z]{2,}/;
  if (isSqlInjection(email) && isSqlInjection(password)) {
    console.log("sql注入正则验证通过");
    if (regularemail.test(email) && regularPassword.test(password)) {
      console.log("qq邮箱正则验证通过");
      return true;
    } else {
      console.log("qq邮箱正则验证未通过！！！");
      return false;
    }
  } else {
    console.log("sql注入正则验证未通过！！！");
    return false;
  }
};

// 简单地防止sql注入
const isSqlInjection = (input) => {
  var regex = /(\b(union|select|insert|delete|update|drop)\b)/i;
  return !regex.test(input);
};



// 发送验证码的方法
const sendCaptcha = async () => {
  centerDialogVisible.value = true
      state.captchaImage = null;
      state.captchaId = "";
      state.captchaAnswer = "";
  // 向后端发送请求生成验证码
   let data =await getCode()
   console.log("dadadad",data.id);

  // 更新状态，显示验证码图像
  state.isShowError = false
  state.captchaImage = data.image;
  state.captchaId = data.id;
};

// 确定输入图像验证码
const ImageCodeOk =async ()=>{
   let data = {
       "id":state.captchaId,
       "userCode":state.captchaAnswer
   }
   let i = await checkCode(data)
  //  centerDialogVisible = false
  console.log(i.code,typeof i.code);
  if (i.code == 666){
      
      centerDialogVisible.value = false // 关闭输入验证码的地方
      state.captchaImage = null;
      state.captchaId = "";
      state.captchaAnswer = "";
      state.IMGISOK = true
      state.buttonText = "验证码已经发送"
      
  }else{
      state.isShowError = true
  }
}


// 取消输入图像验证码
const ImageCodeNo = ()=>{
  state.captchaImage = null;
  state.captchaId = "";
  centerDialogVisible.value = false
  state.buttonText = "发送验证码"
}

const login = ()=>{
  if(state.email != "" && isEmail() ){
     if(state.IMGISOK){
        
     }else{
        alert("请先发送验证码")
     }
  }
    
}

const isEmail = ()=>{
  let regularemail = /^[0-9]{9,}@qq.com$/;
  if (regularemail.test(email)) {
      console.log("qq邮箱正则验证通过");
      return true;
    } else {
      console.log("qq邮箱正则验证未通过！！！");
      return false;
    }
}

const pushtoRegister = () =>{

    router.push({
      name: "register",
    });
  
}
</script>

<template>
  <div class="box" ref="box">
    <div class="form form1" v-show="showForm === 'form1'">
      <p class="form-title">登录</p>
      <div class="input-container">
        <input type="email" v-model="form.email1" placeholder="邮箱" />
      </div>
      <div class="input-container">
        <input type="password" v-model="form.password1" placeholder="密码" />
      </div>
      <button class="submit" @click="toControl">登录</button>
      <p class="signup-link">
        没有账号?
        <span @click="pushtoRegister"><a>注册点这里</a></span>
      </p>
    </div>

    <div class="form" v-show="showForm === 'form2'">
      <p class="form-title">其他登录方式</p>
      <div class="input-container">
        <button type="submit" class="submit" @click="switchFrom('form3')">
          邮箱验证码验证
        </button>
      </div>
      <div class="input-container">
        <button type="submit" class="submit" @click="switchFrom('form4')">
          微信扫码登录
        </button>
      </div>
      <button type="submit" class="submit" @click="switchFrom('form5')">
        qq扫码登录
      </button>
    </div>

 

    <div class="form" v-show="showForm === 'form3'">
      <p class="form-title">邮箱验证码登录</p>
      <!-- 邮箱输入框 -->
      <div class="input-container">
        <input v-model="state.email" type="email" placeholder="邮箱" />
      </div>
      <!-- 验证码输入框及图像显示 -->
      <div class="input-container">
        <input v-model="state.captchaInput" type="text"  placeholder="验证码" />
        <!-- 发送验证码按钮 -->
        <el-button size="large" text @click="sendCaptcha">{{ state.buttonText }}</el-button>
      </div>
      <!-- 登录按钮 -->
      <button type="submit" class="submit" @click="login">登录</button>
    </div>

    <el-dialog
      v-model="centerDialogVisible"
      title="验证你是不是真人"
      width="25%"
      align-center
    >
      <img v-if="state.captchaImage" :src="state.captchaImage" @click="sendCaptcha" alt="Captcha" />
       &nbsp;<span style="color: red;font-size:2pc;" v-show="state.isShowError">不对欧</span>
      <div class="input-containerCODE">
        <input v-model="state.captchaAnswer" type="text" placeholder="请输入上方验证码" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large" @click="ImageCodeOk">确定</el-button>
          <el-button size="large" type="primary" @click="ImageCodeNo">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="card" v-show="showForm === 'form4'"></div>
    <div class="card" v-show="showForm === 'form5'"></div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: flex-end;
  margin-right: 43%;
  align-items: center;
  height: 100vh;
}
.form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 360px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

.card {
  width: 350px;
  height: 354px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
}

.input-containerCODE {
  position: relative;
}

.input-containerCODE input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-containerCODE input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 50%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>

