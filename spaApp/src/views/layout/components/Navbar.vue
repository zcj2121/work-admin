<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="mt-title"><img src="./logo-white.png" alt=""><span> 三一工学院督办管理系统</span></div>
    <div class="right-menu">
      <!--<el-tooltip class="item" effect="dark" content="通知待办" placement="bottom">-->
        <!--<span class="screenfull" @click="goNottask">-->
          <!--<el-badge :value="0" class="item">-->
            <!--<i class="fa fa-bell"></i>-->
          <!--</el-badge>-->
        <!--</span>-->
      <!--</el-tooltip>-->
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <span class="screenfull" @click="screenfullChange">
        <i class="fa fa-arrows-alt"></i>
      </span>
      </el-tooltip>
      <el-dropdown class="avatar-container" placement="bottom-end" trigger="click">
        <div class="avatar-wrapper">
          欢迎您，<span>{{introduction}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <span @click="editPwd" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--修改密码 弹出框-->
    <el-dialog title="修改密码" width="600px" :visible.sync="pwdFormShow" :modal-append-to-body="false"
               @close="pwdClose('formAll')">
      <el-form :model="form" ref="formAll" :rules="rules" label-position="right" label-width="110px">
        <el-form-item label="原密码：" prop="password">
          <el-input :type="pwdType" v-model="form.password" placeholder="请输入原密码">
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="fa fa-eye-slash" v-if="pwdType===''"></i>
            <i class="fa fa-eye" v-else="pwdType==='password'"></i>
          </span>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input :type="pwdType" v-model="form.newPassword" placeholder="请输入新密码">
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="fa fa-eye-slash" v-if="pwdType===''"></i>
            <i class="fa fa-eye" v-else="pwdType==='password'"></i>
          </span>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input :type="pwdType" v-model="form.checkPass" placeholder="请再次输入新密码">
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="fa fa-eye-slash" v-if="pwdType===''"></i>
            <i class="fa fa-eye" v-else="pwdType==='password'"></i>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdClose('formAll')">取 消</el-button>
        <el-button type="primary" @click="pwdSave('formAll')">确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>

</template>

<script>
  import md5 from 'js-md5'
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import { editPassword } from '@/api/user'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.formAll.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        screenfullShow: false,
        badge: 0,
        pwdFormShow: false,
        pwdType: 'password',
        form: {
          id: this.userId,
          password: '',
          newPassword: '',
          checkPass: ''
        },
        rules: {
          newPassword: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur', required: true }
          ],
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'name',
        'introduction',
        'userId',
      ])
    },
    created() {
      this.toCon()
    },
    methods: {
      toCon() {

          // this.$router.push({ path: '/confirm' })

      },
      screenfullChange() {
        const isPullscreen = fullscreen()
        if (isPullscreen === true) {
          exitFullscreen()
        } else if (isPullscreen === false) {
          requestFullScreen()
        }

        // 是否全屏
        function fullscreen() {
          return document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            false
        }

        // 进入全屏
        function requestFullScreen() {
          var de = document.documentElement
          if (de.requestFullscreen) {
            de.requestFullscreen()
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen()
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen()
          }
        }

        // 退出全屏
        function exitFullscreen() {
          var de = document
          if (de.exitFullscreen) {
            de.exitFullscreen()
          } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen()
          } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen()
          }
        }
      },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      goNottask() {
        this.$router.push({ path: '/change/nottask' })
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      editPwd() {
        this.form.id = this.userId
        this.pwdFormShow = true
      },
      pwdSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              u_id: this.form.id,
              oldPassword: md5(this.form.password),
              u_password: md5(this.form.newPassword)
            }
            editPassword(data).then((response) => {
              if (response.state) {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.pwdFormShow = false
                setTimeout(() => {
                  this.logout()
                }, 500)
              } else {
                this.$message({
                  type: 'error',
                  message: response.msg
                })
              }

            })
          } else {
            return false
          }
        })
      },
      pwdClose(formName) {
        this.pwdFormShow = false
        this.$refs[formName].resetFields()
        this.form = {
          id: '',
          password: '',
          newPassword: ''
        }
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .el-badge__content.is-fixed{
    top: 14px;
    right: 10px;
  }
  .hamburger-container {
    .hamburger {
      color: #ffffff !important;
    }
  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
  .navbar {
    height: 80px;
    line-height: 80px;
    border-radius: 0px !important;
    background: #f98b8b;
    .hamburger-container {
      line-height: 88px;
      height: 80px;
      float: left;
      padding: 0 10px;
      .hamburger{
        color: #ffffff !important;
      }
    }
    .mt-title{
      display: inline-block;
      font-size: 30px;
      line-height: 70px;
      height: 80px;
      float: left;
      position: absolute;
      width: 74%;
      text-align: center;
      color: #ffffff;
      font-weight: bold;
      img{
        width: 46px;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
      }
    }
    .right-menu {
      float: right;
      height: 100%;
      .screenfull {
        color: #fff;
        cursor: pointer;
        margin: 0 8px;
        /*border: 1px solid #ccc;*/
        /*padding: 2px 4px;*/
        /*border-radius: 2px;*/
        .el-badge__content{
          top: 14px;
          right: 10px;
        }
      }
      .screenfull:hover {
        color: rgb(64, 158, 255);
        border-color: rgb(64, 158, 255);
      }
      .avatar-container {
        height: 80px;
        display: inline-block;
        /*position: absolute;*/
        /*right: 0px;*/
        padding-right: 30px;
        color: #ffffff;
        font-weight: bold;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 0px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -35px;
            top: 34px;
            font-size: 12px;
            width: 35px;
            height: 14px;
            padding-left: 8px;

          }
        }
      }
    }
  }

  .el-dropdown-menu {
    .el-dropdown-menu__item {
      width: 100px;
      text-align: center;
      margin-top: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    cursor: pointer;
    user-select:none;
  }
</style>

