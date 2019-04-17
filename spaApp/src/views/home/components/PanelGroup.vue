<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="fa fa-play-circle card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">推进中</div>
          <count-to v-if="totalData.running" :start-val="0" :end-val="totalData.running || 0" :duration="totalData.running || 0" class="card-panel-num" />
          <div v-else style="font-size: 20px;">0</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="fa fa-pause-circle card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已延期</div>
          <count-to v-if="totalData.overtime" :start-val="0" :end-val="totalData.overtime || 0" :duration="totalData.overtime || 0" class="card-panel-num" />
          <div v-else style="font-size: 20px;">0</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="fa fa-pencil-square-o card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已完成</div>
          <count-to v-if="totalData.finish" :start-val="0" :end-val="totalData.finish || 0" :duration="totalData.finish || 0" class="card-panel-num" />
          <div v-else style="font-size: 20px;">0</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="fa fa-check-square-o card-panel-icon"></i>

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已评分</div>
          <count-to v-if="totalData.score" :start-val="0" :end-val="totalData.score || 0" :duration="totalData.score || 0" class="card-panel-num" />
          <div v-else style="font-size: 20px;">0</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    totalData: {
      type: Object
    }
  },
  components: {
    CountTo
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.panel-group {
  margin-top: 20px;
  .card-panel-col{
    margin-bottom: 20px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #ebeef5;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
