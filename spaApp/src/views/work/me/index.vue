<template>
  <div id="projectTable" class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.w_title" style="width: 120px;" size="mini" class="filter-item" placeholder="请输入任务名称" />
      <el-select v-model="listQuery.w_statu" style="width: 110px;" size="mini" placeholder="请选择状态">
        <el-option
          v-for="item in statuOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.w_starttime"
        type="datetime"
        placeholder="选择开始时间"
        size="mini" style="width: 135px;">
      </el-date-picker>
      <el-date-picker
        v-model="listQuery.w_endtime"
        type="datetime"
        placeholder="选择结束时间"
        size="mini" style="width: 135px;">
      </el-date-picker>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button :loading="downloadLoading" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <el-table key='aTable' v-if="listQuery.w_statu == '1'" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit>
      <el-table-column fixed="left" label="任务名称" :show-overflow-tooltip="true" prop="w_title" width="120" sortable />
      <el-table-column label="任务内容" :show-overflow-tooltip="true" prop="w_content" min-width="120" sortable />
      <el-table-column label="任务来源" :show-overflow-tooltip="true" prop="w_source" min-width="120" sortable />
      <el-table-column label="负责人" :show-overflow-tooltip="true" width="90" prop="u_name" sortable />
      <el-table-column label="责任部门" prop="u_dep" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.u_dep | depFilter}}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" :show-overflow-tooltip="true" width="110" prop="u_phone" sortable />
      <el-table-column label="开始时间" prop="w_starttime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_starttime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="考核时间" prop="w_endtime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_endtime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="最新进展" prop="list" :show-overflow-tooltip="true" sortable width="120">
        <template slot-scope="scope">
          {{scope.row.list.length != 0 ? scope.row.list[0].p_content : '暂无数据'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="w_statu" :show-overflow-tooltip="true" sortable width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.w_statu | statusFilter">{{ scope.row.w_statu | statuTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary" @click="detail(scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="operate('edit',scope.row)" v-show="scope.row.w_statu == '1' || scope.row.w_statu == '2'">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.w_statu == '1' || scope.row.w_statu == '2'"
              @click="finishFun(scope.row)"
            >完成
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-table key='bTable' v-else-if="listQuery.w_statu == '2' || listQuery.w_statu == '3'" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit>
      <el-table-column fixed="left" label="任务名称" :show-overflow-tooltip="true" prop="w_title" width="120" sortable />
      <el-table-column label="任务内容" :show-overflow-tooltip="true" prop="w_content" min-width="120" sortable />
      <el-table-column label="任务来源" :show-overflow-tooltip="true" prop="w_source" min-width="120" sortable />
      <el-table-column label="负责人" :show-overflow-tooltip="true" width="90" prop="u_name" sortable />
      <el-table-column label="责任部门" prop="u_dep" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.u_dep | depFilter}}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" :show-overflow-tooltip="true" width="110" prop="u_phone" sortable />
      <el-table-column label="开始时间" prop="w_starttime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_starttime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="考核时间" prop="w_endtime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_endtime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="延期时间" prop="w_endtime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_endtime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="延期次数" prop="list" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.list | forNumFilter}}
        </template>
      </el-table-column>
      <el-table-column label="最新进展" prop="list" :show-overflow-tooltip="true" sortable width="120">
        <template slot-scope="scope">
          {{scope.row.list.length != 0 ? scope.row.list[0].p_content : '暂无数据'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="w_statu" :show-overflow-tooltip="true" sortable width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.w_statu | statusFilter">{{ scope.row.w_statu | statuTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" :width="listQuery.w_statu==3? '150': '190'">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary" @click="detail(scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="operate('edit',scope.row)" v-show="scope.row.w_statu == '1' || scope.row.w_statu == '2'">编辑</el-button>
            <el-button size="mini" type="primary" @click="auditFun(1,scope.row)" v-show="scope.row.w_statu == '2'">延时</el-button>
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.w_statu == '1' || scope.row.w_statu == '2'"
              @click="finishFun(scope.row)"
            >完成
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-table key='cTable' v-else="listQuery.w_statu == '4'" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit>
      <el-table-column fixed="left" label="任务名称" :show-overflow-tooltip="true" prop="w_title" width="120" sortable />
      <el-table-column label="任务内容" :show-overflow-tooltip="true" prop="w_content" min-width="120" sortable />
      <el-table-column label="任务来源" :show-overflow-tooltip="true" prop="w_source" min-width="120" sortable />
      <el-table-column label="负责人" :show-overflow-tooltip="true" width="90" prop="u_name" sortable />
      <el-table-column label="责任部门" prop="u_dep" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.u_dep | depFilter}}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" :show-overflow-tooltip="true" width="110" prop="u_phone" sortable />
      <el-table-column label="开始时间" prop="w_starttime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_starttime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="考核时间" prop="w_endtime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_endtime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="延期时间" prop="w_endtime" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.w_endtime | dateTime('date')}}
        </template>
      </el-table-column>
      <el-table-column label="延期次数" prop="list" :show-overflow-tooltip="true" sortable width="160" align="center">
        <template slot-scope="scope">
          {{scope.row.list | forNumFilter}}
        </template>
      </el-table-column>
      <el-table-column label="质量评分" :show-overflow-tooltip="true" width="110" prop="w_score_qua" sortable />
      <el-table-column label="时间评分" :show-overflow-tooltip="true" width="110" prop="w_score_time" sortable />
      <el-table-column label="总分" :show-overflow-tooltip="true" width="80" prop="w_score_sum" sortable />
      <el-table-column label="状态" prop="w_statu" :show-overflow-tooltip="true" sortable width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.w_statu | statusFilter">{{ scope.row.w_statu | statuTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="70">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary" @click="detail(scope.row)">查看</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="listQuery.page"
      :page-sizes="pageSizes"
      :page-size="listQuery.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!--新增、编辑 弹出框-->
    <el-dialog
      :title="operateTitle"
      width="530px"
      :visible.sync="formShow"
      :modal-append-to-body="false"
      @close="operateClose('formAdd')"
    >
      <el-form ref="formAdd" :model="form" label-position="right" label-width="105px">
        <el-form-item
          label="任务名称："
          prop="w_title"
          :rules="[
            { required: true, message: '请输入任务名称', trigger: 'blur' }
          ]"
        >
          <el-input :disabled="true" v-model="form.w_title" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item
          label="任务内容："
          prop="w_content"
          :rules="[
            { required: true, message: '请输入任务内容', trigger: 'blur' }
          ]"
        >
          <el-input :rows="4" :disabled="true" type="textarea" v-model="form.w_content" placeholder="请输入任务内容" />
        </el-form-item>
        <el-form-item
          label="任务来源："
          prop="w_source"
          :rules="[
            { required: true, message: '请输入任务来源', trigger: 'blur' }
          ]"
        >
          <el-input :disabled="true" v-model="form.w_source" placeholder="请输入任务来源" />
        </el-form-item>
        <el-form-item
          label="责任部门："
          prop="dep"
          :rules="[
            { required: true, message: '请选择责任部门', trigger: 'change' }
          ]"
        >
          <el-select :disabled="true" v-model="form.dep" placeholder="请选择责任部门" style="width:100%;">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任人："
          prop="userid"
          :rules="[
            { required: true, message: '请选择责任人', trigger: 'change' }
          ]"
        >
          <el-select :disabled="true" v-model="form.userid" placeholder="请选择责任人" style="width:100%;">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.u_name"
              :value="item.u_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始时间："
          prop="w_starttime"
          :rules="[
            { required: true, message: '请选择开始时间', trigger: 'change' }
          ]"
        >
          <el-date-picker
            v-model="form.w_starttime"
            type="datetime"
            placeholder="请选择开始时间"
            style="width: 100%;"
            :disabled="true"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="考核时间："
          prop="w_endtime"
          :rules="[
            { required: true, message: '请选择考核时间', trigger: 'change' }
          ]"
        >
          <el-date-picker
            v-model="form.w_endtime"
            type="datetime"
            placeholder="请选择考核时间"
            :disabled="true"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="isEdit"
          label="最新进展："
          prop="progress"
          :rules="[
            { required: true, message: '请输入任务进展', trigger: 'blur' }
          ]"
        >
          <el-input :rows="4" type="textarea" v-model="form.progress" placeholder="请输入任务进展" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateClose('formAdd')">取 消</el-button>
        <el-button type="primary" @click="save('formAdd')">确 定</el-button>
      </div>
    </el-dialog>

    <!--延迟、审批 弹出框-->
    <el-dialog
      :title="auditTitle"
      width="530px"
      :visible.sync="auditFormShow"
      :modal-append-to-body="false"
      @close="auditClose('formAudit')"
    >
      <el-form ref="formAudit" :model="audit" label-position="right" label-width="105px">
        <el-form-item
          label="延期时间："
          prop="p_delaytime"
          v-if="audit.auditType == 1"
          :rules="[
            { required: true, message: '请选择延期时间', trigger: 'change' }
          ]"
        >
          <el-date-picker
            v-model="audit.p_delaytime"
            type="datetime"
            placeholder="请选择延期时间"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="延期说明："
          prop="p_audit"
          v-if="audit.auditType == 1"
          :rules="[
            { required: true, message: '请输入延期说明', trigger: 'blur' }
          ]"
        >
          <el-input :rows="4" type="textarea" v-model="audit.p_audit" placeholder="请输入延期说明" />
        </el-form-item>
        <el-form-item
          label="审批意见："
          v-if="audit.auditType == 2"
        >
          <el-input :rows="4" type="textarea" v-model="audit.p_audit" placeholder="请输入审批意见" />
        </el-form-item>
        <el-form-item
          label="质量评分："
          prop="w_score_qua"
          v-if="audit.auditType == 3"
          :rules="[
            { required: true, message: '请输入质量评分', trigger: 'blur' }
          ]"
        >
          <el-input v-model="audit.w_score_qua" placeholder="请输入质量评分" />
        </el-form-item>
        <el-form-item
          label="时间评分："
          prop="w_score_time"
          v-if="audit.auditType == 3"
          :rules="[
            { required: true, message: '请输入时间评分', trigger: 'blur' }
          ]"
        >
          <el-input v-model="audit.w_score_time" placeholder="请输入时间评分" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditClose('formAudit')">取 消</el-button>
        <el-button type="danger" @click="auditSave('formAudit', 2)" v-if="audit.auditType == 2">驳 回</el-button>
        <el-button type="primary" @click="auditSave('formAudit', 1)">{{audit.auditType == 2?'通 过': ' 保存'}}</el-button>
      </div>
    </el-dialog>

    <!--查看 弹出框-->
    <el-dialog
      title="查看任务"
      width="850px"
      :visible.sync="detailShow"
      :modal-append-to-body="false"
      @close="detailShow = false"
      class="detail-dialog-top"
    >
      <div class="is-scrolling-none" v-if="detailData">
        <table class="el-table__body" v-if="detailData">
          <tr>
            <td class="text-bold" style="width:90px;">任务名称</td>
            <td colspan="2">{{detailData.w_title}}</td>
            <td class="text-bold" style="width:90px;">任务来源</td>
            <td colspan="2">{{detailData.w_source}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">责任人</td>
            <td colspan="2">{{detailData.u_name}}</td>
            <td class="text-bold" style="width:100px;">责任部门</td>
            <td colspan="2">{{detailData.u_dep | depFilter}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">手机号码</td>
            <td colspan="2">{{detailData.u_phone}}</td>
            <td class="text-bold" style="width:100px;">电子邮箱</td>
            <td colspan="2">{{detailData.u_email}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">开始时间</td>
            <td colspan="2">{{detailData.w_starttime | dateTime('date')}}</td>
            <td class="text-bold" style="width:100px;">考核时间</td>
            <td colspan="2">{{detailData.w_endtime | dateTime('date')}}</td>
          </tr>
          <tr v-if="numFun(detailData.list) >0">
            <td class="text-bold" style="width:100px;">延期时间</td>
            <td colspan="2">{{detailData.w_endtime | dateTime('date')}}</td>
            <td class="text-bold" style="width:100px;">延期次数</td>
            <td colspan="2">{{detailData.list | forNumFilter}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">创建人</td>
            <td colspan="5">{{detailData.w_operator_name}}</td>
          </tr>
          <tr>
            <td class="text-bold">任务内容</td>
            <td colspan="5">{{detailData.w_content}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">质量评分</td>
            <td colspan="2">{{detailData.w_score_qua}}</td>
            <td class="text-bold" style="width:100px;">时间评分</td>
            <td colspan="2">{{detailData.w_score_time}}</td>
          </tr>
          <tr>
            <td class="text-bold" style="width:100px;">总评</td>
            <td colspan="2">{{detailData.w_score_sum}}</td>
            <td class="text-bold" style="width:100px;">任务状态</td>
            <td colspan="2">{{detailData.w_statu | statuTextFilter}}</td>
          </tr>
        </table>
        <table class="el-table__body" style="margin-top: 15px;">
          <tr style="background: #f7f7f7;">
            <td class="text-bold" style="width:90px;"></td>
            <td class="text-bold" colspan="4">进展内容</td>
            <td class="text-bold" style="width:150px !important;">操作时间</td>
          </tr>
          <tr v-if="detailData.list.length == 0">
            <td colspan="6" style="text-align: center">---暂无任务进展---</td>
          </tr>
          <tr v-if="detailData.list.length > 0" v-for="(item,index) in detailData.list" :key="index">
            <td>{{index+1}}</td>
            <td colspan="4">{{item.p_content}}</td>
            <td style="width: 150px !important;">{{item.p_time | dateTime('date')}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { mapGetters } from 'vuex'
  import { getMyWorkList, addWork, editWork, delayWork, auditWork, finishWork, scoreWork } from '@/api/work'
  import { getUserList } from '@/api/user'
  import { validatePhone, userNamePhone, dateTime } from '@/utils/validate'
  import { alertBox } from '@/utils/request'
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
      fileFilter(file) {
        if (file.indexOf('[') !== -1 && file.indexOf(']') !== -1) {
          const str_before = file.split('[')[0]
          const str_after = file.split(']')[1]
          return str_before + str_after
        } else {
          return file
        }
      },
      forNumFilter(num) {
        let n = 0;
        if (num.length) {
          for (let val of num) {
            if (val.p_statu == '3') {
              n += 1
            }
          }
        }
        return n
      }
    },
    data() {
      return {
        list: null, // 列表显示数据
        listLoading: true, // 加载动画
        total: 0, // 数据总条数
        pageSizes: [10, 15, 20], // 每页显示条数 规则
        listQuery: {
          page: 1, // 第几页
          size: 10, // 每页显示条数
          w_title: '',
          w_statu: '1',
          w_starttime: '',
          w_endtime: '',
        },
        form: { // 新增编辑 数据
          w_title: '',
          w_content: '',
          dep: '',
          userid: '',
          w_starttime: '',
          w_endtime: '',
          progress: '',
          w_source: '',
          w_operator: this.$store.state.user.userId,
          w_operator_name: this.$store.state.user.introduction,
        },
        isEdit: false, // 是否是进行编辑操作
        operateTitle: '', // 新增、编辑 弹出框 标题
        formShow: false, // 是否 显示 新增、编辑 弹出框
        statuOptions: [
          {
            label: '推进中',
            value: '1'
          },
          {
            label: '已延时',
            value: '2'
          },
          {
            label: '已完成',
            value: '3'
          },
          {
            label: '已评分',
            value: '4'
          }
        ],
        departmentOptions: [
          {
            label: '通识教育中心',
            value: '1'
          },
          {
            label: '行政中心',
            value: '2'
          },
          {
            label: '教务处',
            value: '3'
          },
          {
            label: '招生就业处',
            value: '4'
          },
          {
            label: '人事处',
            value: '5'
          },
          {
            label: '财务处',
            value: '6'
          },
          {
            label: '质量中心',
            value: '7'
          },
          {
            label: '信息中心',
            value: '8'
          },
          {
            label: '后勤部',
            value: '9'
          },
          {
            label: '工程机械学院',
            value: '10'
          },
          {
            label: '智能制造学院',
            value: '11'
          },
          {
            label: '人工智能学院',
            value: '12'
          },
          {
            label: '建筑工业学院',
            value: '13'
          },
        ],
        userOptions: [],
        auditFormShow: false, // 审核、延时 框显示/隐藏
        auditTitle: '', // 审核、延时 框显示/隐藏
        audit: {
          auditType: 1,
          w_id: '',
          userid: '',
          p_delaytime: '',
          p_content: '',
          p_audit: '',
          w_score_qua: '',
          w_score_time: ''
        },
        detailShow: false,
        detailData: null,
        downloadLoading: false,
      }
    },
    watch: {
      // 监听 查询条件
      listQuery: {
        handler() {
          this.search()
        },
        deep: true
      },
      'form.dep': {
        handler(dep) {
          this.form.userid = ''
          if (dep) {
            this._getDepUser()
          }
        },
        deep: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 列表数据 分页 搜索
      // 请求 原始数据
      fetchData() {
        this.listLoading = true
        getMyWorkList(this.listQuery).then(response => {
          if (response) {
            this.list = response.data.list
            this.total = response.data.count
            this.listLoading = false
          }
        })
      },
      // 每页 条数
      handleSizeChange(val) {
        this.listQuery.size = val
      },
      // 第几页
      handleCurrentChange(val) {
        this.listQuery.page = val
      },
      // 查询 数据
      search() {
        this.fetchData()
      },
      // 列表数据 分页 搜索
      // 删除、启用等 公共弹框
      operation(id, msg, url) {
        alertBox(this, msg, url, id)
      },
      // 删除、启用等 公共弹框
      // 新增、修改 操作
      // 弹出框 打开
      operate(type, val) {
        if (type === 'add') {
          this.operateTitle = '新增任务'
          this.isEdit = false
        } else if (type === 'edit') {
          this.isEdit = true
          this.form = Object.assign({}, {
            w_id: val.w_id,
            w_title: val.w_title,
            w_content: val.w_content,
            dep: val.u_dep,
            userid: val.w_userid,
            progress: val.progress,
            w_operator: val.w_operator,
            w_operator_name: val.w_operator_name,
            w_source: val.w_source,
            w_starttime: val.w_starttime,
            w_endtime:val.w_endtime,
            w_statu:val.w_statu
          })
          setTimeout(() => {
            this.form.userid = val.w_userid
          },100)
          this.operateTitle = '编辑任务'
        }
        this.formShow = true
      },
      // 弹出框 关闭
      operateClose(formName) {
        this.$refs[formName].resetFields()
        this.formShow = false
        this.form = {
          w_title: '',
          w_content: '',
          dep: '',
          userid: '',
          w_starttime: '',
          w_endtime: '',
          w_source: '',
          w_operator: this.$store.state.user.userId,
          w_operator_name: this.$store.state.user.introduction,
          progress: ''
        }
      },
      // 点击保存
      save(formName) {
        if (this.isEdit === true) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              editWork(this.form).then((response) => {
                if (response.state) {
                  this.$message({
                    type: 'success',
                    message: response.msg
                  })
                  this.fetchData()
                  this.formShow = false
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
        } else {
          let saveData = Object.assign({}, this.form)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              addWork(saveData).then((response) => {
                if (response.state) {
                  this.$message({
                    type: 'success',
                    message: response.msg
                  })
                  this.fetchData()
                  this.formShow = false
                }else {
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
        }
      },
      // 新增、修改 操作


      // 新增、修改 操作

      // 审核、评分、延时 打开弹出框
      auditFun(type, val) {
        switch (type) {
          case 1:
            this.auditTitle = '申请延时'
            this.audit = Object.assign({}, {
              auditType: 1,
              w_id: val.w_id,
              w_userid: val.w_userid,
              p_delaytime: '',
              w_title: val.w_title,
              p_content: '',
              p_audit: ''
            })
            break;
          case 2:
            this.auditTitle = '审核延时'
            this.audit = Object.assign({}, {
              auditType: 2,
              w_id: val.w_id,
              w_title: val.w_title,
              w_userid: val.w_userid,
              p_delaytime: '',
              p_content: '',
              p_audit: ''
            })
            break;
          case 3:
            this.auditTitle = '任务打分'
            this.audit = Object.assign({}, {
              auditType: 3,
              w_id: val.w_id,
              w_title: val.w_title,
              w_userid: val.w_userid,
              p_delaytime: '',
              p_content: '',
              p_audit: '',
              w_score_qua: '',
              w_score_time: ''
            })
            break;
          default:
            break;
        }
        this.auditFormShow = true
      },
      // 关闭 弹出框
      auditClose(formName) {
        this.$refs[formName].resetFields()
        this.auditFormShow = false
      },

      // 保存
      auditSave(formName, type) {
        switch (this.audit.auditType) {
          case 1:
            this.$refs[formName].validate((valid) => {
              if (valid) {
                delayWork({
                  p_statu: '2',
                  w_id: this.audit.w_id,
                  w_title: this.audit.w_title,
                  w_userid: this.audit.w_userid,
                  p_delaytime: this.audit.p_delaytime,
                  p_content: '用户【'+this.$store.state.user.introduction+ '】申请了【'+this.audit.w_title+'】任务延迟至【'+dateTime(this.audit.p_delaytime, 'date')+'】。',
                  p_audit: this.audit.p_audit,
                }).then((response) => {
                  if (response.state) {
                    this.$message({
                      type: 'success',
                      message: response.msg
                    })
                    this.fetchData()
                    this.auditFormShow = false
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
            break;
          case 2:
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let statu;
                if (type == 1) {
                  statu = '3'
                } else {
                  statu = '4'
                  if (!this.audit.p_audit) {
                    this.$message({
                      type: 'error',
                      message: '请输入驳回审批意见'
                    })
                    return false;
                  }
                }
                auditWork({
                  p_statu: statu,
                  w_id: this.audit.w_id,
                  w_title: this.audit.w_title,
                  ptime: dateTime(this.audit.p_delaytime, 'date'),
                  pname: this.$store.state.user.introduction,
                  w_userid: this.audit.w_userid,
                  p_audit: this.audit.p_audit,
                }).then((response) => {
                  if (response.state) {
                    this.$message({
                      type: 'success',
                      message: response.msg
                    })
                    this.fetchData()
                    this.auditFormShow = false
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
            break;
          case 3:
            this.$refs[formName].validate((valid) => {
              if (valid) {
                scoreWork({
                  p_statu: '6',
                  w_id: this.audit.w_id,
                  w_title: this.audit.w_title,
                  w_userid: this.audit.w_userid,
                  pname: this.$store.state.user.introduction,
                  w_score_qua: this.audit.w_score_qua,
                  w_score_time: this.audit.w_score_time
                }).then((response) => {
                  if (response.state) {
                    this.$message({
                      type: 'success',
                      message: response.msg
                    })
                    this.fetchData()
                    this.auditFormShow = false
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
            break;
          default:
            break;
        }
      },
      finishFun(val) {
        this.$confirm('确认完成该任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          finishWork({
            p_statu: '5',
            w_id: val.w_id,
            w_title: val.w_title,
            ptime: '',
            pname: this.$store.state.user.introduction,
            w_userid: val.w_userid,
            p_audit: '',
          }).then((response) => {
            if (response.state) {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.fetchData()
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })

            }
          })
        }).catch(() => {
        });
      },
      detail(val) {
        this.detailData = val
        this.detailShow = true
      },
      handleDownload() {
        let dataFilter = this.list.concat()
        for (let val of dataFilter) {
          val.u_dep_name = this.depFun(val.u_dep)
          val.w_starttime_name = dateTime(val.w_starttime, 'date')
          val.w_endtime_name = dateTime(val.w_endtime, 'date')
          val.w_num_name = this.numFun(val.list)
          if (this.numFun(val.list)) {
            val.u_yan = dateTime(val.w_endtime, 'date')
            val.w_jin = val.list[0].p_content
          } else {
            val.u_yan = ''
            val.w_jin = ''
          }
        }
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['任务名称', '任务内容', '任务来源', '责任人', '责任部门', '手机号码', '电子邮箱', '开始时间', '考核时间', '延期时间', '延期次数', '最新进展', '质量评分', '时间评分', '总分数', '任务创建人']
          const filterVal = ['w_title', 'w_content', 'w_source', 'u_name', 'u_dep_name', 'u_phone', 'u_email', 'w_starttime_name', 'w_endtime_name', 'u_yan', 'w_num_name', 'w_jin', 'w_score_qua', 'w_score_time', 'w_score_sum', 'w_operator_name']
          const list = dataFilter
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '我的任务导出',
            autoWidth: true,
            bookType: 'xlsx'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'datetime') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      _getDepUser() {
        this.userOptions = []
        getUserList({
          u_dep: this.form.dep,
          isDepUser: true
        }).then(response => {
          if (response) {
            this.userOptions = response.data.list
          }
        })
      },
      numFun(num) {
        let n = 0;
        if (num.length) {
          for (let val of num) {
            if (val.p_statu == '3') {
              n += 1
            }
          }
        }
        return n
      },
      depFun(dep) {
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
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'introduction',
        'userId'
      ])
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  #projectTable{
    .detail-dialog-top{
      .el-dialog{
        margin-top: 6vh !important;
      }
    }
    .el-dialog__body{
      padding: 10px 20px;
      max-height: 550px !important;
      overflow-y: auto;
    }
  }
</style>
<style  rel="stylesheet/less" lang="less" scoped>
  .filter-container{
    text-align: right;
    margin-bottom: 10px;
  }
  table{
    border-collapse:collapse;
    width:100%;
    font-size: 14px;
    color:#606266;
    tr{
      td{
        border:1px solid #ebeef5;
        padding:10px 12px;
        line-height: 25px;
      }
      th{
        border:1px solid #ebeef5;
      }
    }
  }
  .text-bold{
    font-weight: bold;
  }
</style>

