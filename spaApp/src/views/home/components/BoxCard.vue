<template>
  <el-card class="box-card-component">
    <div slot="header" class="box-card-header">
      <img src="./logo.png">
    </div>
    <div style="position:relative;">
      <div class="progress-item" style="color:#d9241b;">
        <span>{{introduction}}</span>
      </div>
      <div class="progress-item" style="font-size: 16px;">
        <span>{{dep | depFilter}} | {{roles[0] | roleFilter}}</span>
      </div>
      <div class="progress-item" style="font-size: 14px;color: #666">
        <span>三一工学院</span>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {

  filters: {
    depFilter(dep) {
      const depMap = {
        1: '通识教育中心',
        2: '行政中心',
        3: '教务处',
        4: '招生就业处',
        5: '人事处',
        6: '财务处',
        7: '质量中心',
        8: '信息中心',
        9: '后勤部',
        10: '工程机械学院',
        11: '智能制造学院',
        12: '人工智能学院',
        13: '建筑工业学院'
      }
      return depMap[dep]
    },
    roleFilter(role) {
      const roleMap = {
        'admin': '超管管理',
        'editor': '管理员',
        'other': '普通成员'
      }
      return roleMap[role]
    },
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'introduction',
      'dep',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/less" lang="less" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
    border-bottom: none;
  }
  .el-card__body{
    padding-top:0px;
  }
}
</style>
<style rel="stylesheet/less" lang="less" scoped>
.box-card-component {
  height: 300px;
  .box-card-header {
    position: relative;
    height: 160px;
    text-align: center;
    img {
      margin-top: 35px;
      width: 100px;
      text-align: center;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
