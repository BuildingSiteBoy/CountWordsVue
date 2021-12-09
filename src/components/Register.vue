<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" >
    <h3 class="login_title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.name"
                auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.birth"
                auto-complete="off" placeholder="生日"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.email"
                auto-complete="off" placeholder="E-Mail"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: rgba(79,219,243,0.83);
                border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
  export default{
    data () {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '',
          password: '',
          name: '',
          birth: '',
          email: ''
        },
        loading: false
      }
    },
    methods: {
      async register () {
        const {data: res} = await this.$http
          .post('/register', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            name: this.loginForm.name,
            birth: this.loginForm.birth,
            email: this.loginForm.email
          });
        
        if (res.code === 200) {
          alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.$router.replace('/login')
        } else {
          alert(res.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      }
    }
  }
</script>
<style>
  #paper {
    background:url("../assets/bg1.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 250px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 215, 209, 0.2);
    border: 1px solid #575f78;
    box-shadow: 0 0 25px #c0acab;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #ffd7d1;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>

