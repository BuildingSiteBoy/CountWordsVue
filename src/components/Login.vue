// 模板区
<template>
  <body id="poster">
    <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
      <h2 class="login_title">系统登录</h2>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user-solid" type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-user" type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked"
                   label-position="left"><span style="color: #424a58">记住密码</span></el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #55667c;border: none" v-on:click="login">登录</el-button>
        <router-link to="register"><el-button type="primary" style="width: 100%;background: #4fdbf3;border: none">注册</el-button></router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

// 行为区
<script>
export default {
    data () {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
        login() {
          this.$http
            .post('/login', {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(resp => {
              if (resp.data.code === 200) {
                console.log(resp.data),
                this.$router.replace({path: '/index'})
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(failResponse => {
            })
        }
    }
}
</script>

// 样式区
<style lang="less" scope>
  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 200px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,200,209,0.5);
    border: 1px solid #e19d97;
    box-shadow: 0 0 25px #ffaca9;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 10px 0px;
    text-align: left;
  }
</style>
