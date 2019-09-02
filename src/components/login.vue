<template>
  <div class="login">
    <header class="flex-box">
      <img src="../assets/logo.png" alt>
      <div class="title">
        <h1>航天能源站产品管理系统</h1>
        <h3>Product Management System of Space Energy Station</h3>
      </div>
    </header>
    <div class="login-wrap">
      <div class="form-wrap">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="user">
            <img src="../assets/icon-user.png" alt>
            <el-input placeholder="请输入用户名/邮箱/电话" v-model="loginForm.user" clearable></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <img src="../assets/icon-pwd.png" alt>
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="loginForm.pass"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <button type="primary" @click="login('loginForm')" class="submit-btn">登录</button>
          </el-form-item>
          <div class="reg-box">
            <router-link to=''>注册</router-link>
            <router-link to=''>忘记密码</router-link>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom-bg">
      <img src="../assets/loginBg3.png" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ required: true, message: "请填写用户名", trigger: "change" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  background: #000429 url(../assets/login-earth.jpg) no-repeat;
  background-size: contain;
  position: relative;
}
header {
  padding-top: 130px;
  height: 104px;
}
.flex-box {
  display: flex;
  justify-content: center;
}
header img {
  margin-right: 17px;
}
header h1 {
  background-image: -webkit-linear-gradient( bottom, rgba(26, 69, 182, 1),rgba(3, 216, 255, 1));
  background: -ms-linear-gradient(top, rgba(26, 69, 182, 1), rgba(3, 216, 255, 1)); 
  /* 注意：这一行必须写在最后 */ 
  FILTER: progid:DXImageTransform.Microsoft.Gradient(startColorStr=rgba(26, 69, 182, 1), endColorStr=rgba(3, 216, 255, 1));
  -webkit-background-clip: text;
  -ms-background-clip: text;
  -webkit-text-fill-color: transparent;
  -ms-text-fill-color: transparent;
  font-size: 58px;
  font-weight: bold;
  margin: 0;
}
header h3 {
  color: rgba(63, 205, 201, 0.6);
  font-size: 20px;
  letter-spacing: 3px;
  margin: 18px 0 0 0;
  font-weight: normal;
}
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 897px;
  height: 653px;
  margin: 37px auto 0;
  background: url(../assets/loginBg1.png) no-repeat;
  background-size: 100% 100%;
}
.form-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 587px;
  height: 465px;
  background: url(../assets/loginBg2.png) no-repeat;
  background-size: contain;
}
.login .el-form {
  width: 290px;
}
.login .form-wrap .el-form .el-input--small /deep/ .el-input__inner {
  width: 280px !important;
  padding-left: 48px;
  height: 44px;
  line-height: 44px;
  background-color: transparent !important;
  border: none;
  border-bottom: 1px solid rgba(0, 255, 255, 0.6);
  color: #fff;
  font-size: 16px;
  outline: none;
  border-radius: 0;
}
.login .el-form .el-form-item--small.el-form-item:first-child {
  margin-bottom: 49px;
}
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.login .el-form .el-form-item--small.el-form-item img {
  position: absolute;
}
.login .submit-btn {
  width: 100%;
  height: 58px;
  margin-top: 39px;
  font-size: 28px;
  color: #00ffff;
  background: url(../assets/btnSubmit.png) no-repeat;
  background-size: 100% 100%;
  border: none;
  outline: none;
  cursor: pointer;
}
.reg-box {
    display: flex;
    justify-content: space-between;
    margin-top:7px;
    font-size: 14px;
}
.reg-box  a{
color:#fff;
text-decoration: none;
}
.bottom-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
