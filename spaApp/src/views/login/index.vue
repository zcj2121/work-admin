<template>
  <div ref="loginContainer" class="login-container" @mousemove="mouseMove($event)">
    <el-form
      ref="loginForm"
      auto-complete="on"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <!--<h3 class="title">XX灾备管理系统</h3>-->
      <div class="title-box">
        <img src="./logo.png" alt="">
        <!--<span class="title">XXXX管理系统</span>-->
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="fa fa-user" />
        </span>
        <el-input v-model="loginForm.u_username" name="username" type="text" auto-complete="on" placeholder="用户名" @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="fa fa-lock" />
        </span>
        <el-input
          id="clearPwd"
          v-model="loginForm.u_password"
          name="password"
          :type="pwdType"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i v-if="pwdType===''" class="fa fa-eye-slash" />
          <i v-else="pwdType==='password'" class="fa fa-eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登   录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { menuItem } from '@/api/login'
// import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        u_username: 'admin',
        u_password: '123123'
      },
      loginRules: {
        u_username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        u_password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      thisId: ''
    }
  },
  created() {
    this.nowUrl()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', {
            username: this.loginForm.u_username,
            password: md5(this.loginForm.u_password)
          }).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    nowUrl() {
      const url = window.location.href
      const thisid = url.split('auditId=')[1]
      this.thisId = thisid
    },
    mouseMove(event) {
      const thisBg = this.$refs.loginContainer
      const x = document.body.offsetWidth / 2
      const y = document.body.offsetHeight / 2
      const mx = event.clientX
      const my = event.clientY
      thisBg.style.backgroundPositionX = (x - mx) / 90 + 'px'
      thisBg.style.backgroundPositionY = (y - my) / 90 + 'px'
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  .login-container {
    position: fixed;
    height: 110%;
    width:110%;
    left: -5%;
    top: -5%;
    background: url('login-bg-1.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #fff;
    }
    .el-input {
      display: inline-block;
      width: 80%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 4px 15px;
      color: #fff;
      /*vertical-align: middle;*/
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .svg-container_login{
      font-size:14px !important;
    }
    .title-box{
      text-align: center;
      margin-bottom: 15px;
      img{
        width: 65px;
      }
      .title {
        font-size: 26px;
        /*font-weight: 400;*/
        color: #ab2328;
        /*margin: 0px auto 40px auto;*/
        text-align: center;
        font-weight: bold;
        line-height: 50px;
        vertical-align: text-bottom;
        margin-left: 8px;
      }
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      top:15%;
      box-shadow: 10px 10px 50px;
      border-radius: 4px;
      background: rgba(255,255,255, .5);
      background: -webkit-linear-gradient(#d8d7d3, #81a8c9);
      background: -o-linear-gradient(#d8d7d3, #81a8c9);
      background: -moz-linear-gradient(#d8d7d3, #81a8c9);
      background: linear-gradient(#d8d7d3, #81a8c9);
      /*.login-btn{*/
        /*background-color: transparent;*/
        /*border-color: transparent;*/
      /*}*/
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    #clearPwd::-ms-clear{display:none;}
    #clearPwd::-ms-reveal{display:none;}
  }
</style>
