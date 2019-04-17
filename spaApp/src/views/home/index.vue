<template>
  <div id="home" class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :xs="{span: 8}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}">
          <box-card />
        </el-col>
        <el-col :xs="{span: 16}" :sm="{span: 16}" :md="{span: 18}" :lg="{span: 18}" :xl="{span: 18}">
          <pie-chart  v-bind:chartData="total" />
        </el-col>
      </el-row>
      <panel-group v-bind:totalData="total" />
      <el-row :gutter="20">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
          <el-table :data="list" class="mt-table" max-height="400" fit>
            <el-table-column prop="w_title" :show-overflow-tooltip="true" width="150" sortable label="任务名称" min-width="200">
              <template slot-scope="scope">
                {{scope.row.w_title}}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="w_content" sortable label="任务内容">
              <template slot-scope="scope">
                {{scope.row.w_content}}
              </template>
            </el-table-column>
            <el-table-column width="130" :show-overflow-tooltip="true" prop="u_dep" sortable label="责任部门">
              <template slot-scope="scope">
                {{scope.row.u_dep | depFilter}}
              </template>
            </el-table-column>
            <el-table-column prop="w_statu" sortable label="任务状态" width="100" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.w_statu | statusFilter">
                  {{scope.row.w_statu | statuTextFilter}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { getWorkAllList } from '@/api/home'
  import BoxCard from './components/BoxCard'
  import PieChart from './components/PieChart'
  import PanelGroup from './components/PanelGroup'
  import { mapGetters } from 'vuex'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
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
      statuTextFilter(statuText) {
        const statuTextMap = {
          '1': '推进中',
          '2': '已延时',
          '3': '已完成',
          '4': '已评分'
        }
        return statuTextMap[statuText]
      },
      statusFilter(status) {
        const statusMap = {
          1: 'primary',
          2: 'danger',
          3: 'success',
          4: 'warning'
        }
        return statusMap[status]
      },
      orderNoFilter(str) {
        return str.substring(0, 30)
      }
    },
    components: {
      PanelGroup,
      PieChart,
      BoxCard
    },
    data() {
      return {
        list: null,
        total: {
          running: 0,
          overtime: 0,
          finish: 0,
          score: 0
        },
        lineChartData: lineChartData.newVisitis
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getWorkAllList().then(response => {
          if (response) {
            this.list = response.data.list
            for (let val of this.list) {
              if (val.w_statu == '1') {
                this.total.running +=1
              } else if (val.w_statu == '2') {
                this.total.overtime +=1
              }  else if (val.w_statu == '3') {
                this.total.finish +=1
              }  else if (val.w_statu == '4') {
                this.total.score +=1
              }
            }
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'avatar',
        'name',
        'introduction',
      ])
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  #home {

  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
  #home {
    background-color: #f6f6f6;
    height: 100%;
    overflow-y: auto;
    .mt-table{
      width: 100%;line-height: 45px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);border: 1px solid #ebeef5;
    }
  }
</style>
