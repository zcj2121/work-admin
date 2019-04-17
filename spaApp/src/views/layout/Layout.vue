<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="wrapper-title">
      <img class="title-pic" src="./components/logo-white.png" alt="" v-if="!sidebar.opened">
      <!--<div class="title-name-sm" v-if="!sidebar.opened">XXX</div>-->
      <span v-else class="title-name">
        三一工学院
        <!--<img src="./ico-sz-other.png" alt="">-->
      </span>
    </div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
      <!--<div class="footer-name" :class="{lgWidth: !sidebar.opened}">Copyright © <span>{{(new Date).getFullYear()}}</span> Veritas Technologies LLC. All rights reserved</div>-->
      <div class="footer-name" :class="{lgWidth: !sidebar.opened}">三一工学院督办管理系统</div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'layout',
  data() {
    return {
      footerYear: null
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .wrapper-title{
    width:180px;
    height:79px;
    color: rgb(191, 203, 217);
    position: absolute;
    line-height: 80px;
    font-size:20px;
    font-weight: bold;
    text-align: left;
    background: #304156;
    /*border-right: 1px solid rgb(48, 65, 86);*/
    .title-pic{
      width: 24px;
      height: 24px;
      vertical-align: sub;
      margin-left: 6px;
      /*position: absolute;*/
      /*left: 8px;*/
      /*top: 14px;*/
    }
    .title-name{
      display: inline-block;
      width: 100%;
      /*margin-left: 2px;*/
      text-align: center;
      img{
        margin-top: 8px;
        width: 66%;
      }
    }
    .title-name-sm{
      width: 36px;
      text-align: center;
      font-size: 14px;
    }
  }
  .scroll-container.sidebar-container{
    margin-top:80px;
  }
  .footer-name{
    position: fixed;
    bottom: 0px;
    right: 0;
    left: 90px;
    width: 100%;
    overflow: hidden;
    text-align: center;
    display: inline-block;
    color:#555;
    line-height: 30px;
    font-size: 12px;
    border-top:solid 1px #e6e6e6;
    background-color: #fff;
    z-index: 10;
    transition: left 0.3s;
    -moz-transition: left 0.3s;
    -webkit-transition: left 0.3s;
    -o-transition: left 0.3s;
  }
  .footer-name.lgWidth{
    left:36px;
    transition: left 0.3s;
    -moz-transition: left 0.3s;
    -webkit-transition: left 0.3s;
    -o-transition: left 0.3s;
  }
}
</style>

<!--<span v-if="sidebar.opened">XXXX灾备管理系统</span>-->
<!--<img class="title-pic" v-else src="./ico-sz.png" alt="">-->

