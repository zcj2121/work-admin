<template>
  <div id="userTable" class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" style="width: 120px;" size="mini" class="filter-item" placeholder="请输入姓名" />
      <el-select v-model="listQuery.u_dep" style="width: 120px;" size="mini" placeholder="请选择部门">
        <el-option
          v-for="item in departmentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="operate('add')">新增</el-button>
    </div>
    <el-table v-loading.body="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column label="姓名" prop="u_name" :show-overflow-tooltip="true" sortable width="120" />
      <el-table-column label="性别" prop="u_sex" :show-overflow-tooltip="true" sortable width="90">
        <template slot-scope="scope">
          {{scope.row.u_sex == '1' ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="u_phone" :show-overflow-tooltip="true" sortable />
      <el-table-column label="部门" prop="u_dep" :show-overflow-tooltip="true" sortable>
        <template slot-scope="scope">
          {{scope.row.u_dep | depFilter}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="u_username" :show-overflow-tooltip="true" sortable />
      <el-table-column label="电子邮箱" prop="u_email" :show-overflow-tooltip="true" sortable />
      <el-table-column label="权限" prop="u_roles" :show-overflow-tooltip="true" sortable width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.u_roles | statusFilter">{{ scope.row.u_roles | roleFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary" @click="operation({ id: scope.row.u_id }, '确认重置密码吗', '/resetUser')">重置密码</el-button>
            <el-button size="mini" type="primary" @click="operate('edit',scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="operation({ id: scope.row.u_id }, '确认删除吗', '/delUser')">删除</el-button>
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
      <el-form ref="formAdd" :model="form" :rules="rules" label-position="right" label-width="95px">
        <el-form-item label="用户名：" prop="u_username">
          <el-input v-model="form.u_username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码：" prop="u_password" v-if="!isEdit">
          <el-input v-model="form.u_password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="repeatPass" v-if="!isEdit">
          <el-input v-model="form.repeatPass" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="u_name"
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.u_name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item
          label="部门："
          prop="u_dep"
          :rules="[
            { required: true, message: '请选择部门', trigger: 'change' }
          ]"
        >
          <el-select v-model="form.u_dep" placeholder="请选择部门" style="width:100%;">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="u_sex"
          :rules="[
            { required: true, message: '请选择性别', trigger: 'change' }
          ]"
        >
          <el-radio-group v-model="form.u_sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码：" prop="u_phone">
          <el-input v-model="form.u_phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item
          label="电子邮箱："
          prop="u_email"
          :rules="[
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="form.u_email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item
          label="权限："
          prop="u_roles"
          :rules="[
            { required: true, message: '请选择权限', trigger: 'change' }
          ]"
        >
          <el-radio-group v-model="form.u_roles">
            <el-radio label="admin">超级管理</el-radio>
            <el-radio label="editor">管理员</el-radio>
            <el-radio label="other">普通成员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateClose('formAdd')">取 消</el-button>
        <el-button type="primary" @click="save('formAdd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { getUserList, addUser, editUser, delUser } from '@/api/user'
  import { validatePhone, userNamePhone } from '@/utils/validate'
  import { alertBox } from '@/utils/request'

  var validUserName = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入用户名'))
    } else if (!userNamePhone(value)) {
      callback(new Error('请输入正确的用户名，字母、数字、下划线、并不能以下划线开头结尾'))
    } else {
      callback()
    }
  }
  var validPhone = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入手机号码'))
    } else if (!validatePhone(value)) {
      callback(new Error('请输入正确的11位手机号码'))
    } else {
      callback()
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
      roleFilter(role) {
        const roleMap = {
          'admin': '超管管理',
          'editor': '管理员',
          'other': '普通成员'
        }
        return roleMap[role]
        // let roleMp = role
        // let roleMp1 = roleMp.replace('admin', '管理员').replace('editor', '采集员').replace('other', '其他');
        // return roleMp1
      },
      statusFilter(status) {
        const statusMap = {
          editor: 'success',
          other: 'info',
          admin: 'danger'
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
      }
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.repeatPass !== '') {
            this.$refs.formAdd.validateField('repeatPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.u_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        list: null, // 列表显示数据
        listLoading: true, // 加载动画
        total: 0, // 数据总条数
        pageSizes: [10, 15, 20], // 每页显示条数 规则
        listQuery: {
          page: 1, // 第几页
          size: 10, // 每页显示条数
          name: '',
          u_dep: ''
        },
        form: { // 新增编辑 数据
          u_username: '',
          u_password: '',
          u_name: '',
          u_phone: '',
          u_sex: '1',
          u_dep: '',
          u_roles: 'admin',
          u_email: '',
          repeatPass: '',
        },
        isEdit: false, // 是否是进行编辑操作
        operateTitle: '', // 新增、编辑 弹出框 标题
        formShow: false, // 是否 显示 新增、编辑 弹出框
        rules: {
          u_username: [
            { required: true, trigger: 'blur', validator: validUserName } // 这里需要用到全局变量
          ],
          u_password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          repeatPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          u_phone: [
            { required: true, trigger: 'blur', validator: validPhone } // 这里需要用到全局变量
          ]
        },
        departmentOptions: [
          {
            label: '所有部门',
            value: ''
          },
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
        ]
      }
    },
    watch: {
      // 监听 查询条件
      listQuery: {
        handler() {
          this.search()
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
        getUserList(this.listQuery).then(response => {
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
          this.operateTitle = '新增用户信息'
          this.isEdit = false
        } else if (type === 'edit') {
          this.isEdit = true
          this.form = Object.assign({}, {
            u_id: val.u_id,
            u_username: val.u_username,
            u_name: val.u_name,
            u_phone: val.u_phone,
            u_sex: val.u_sex,
            u_dep: val.u_dep,
            u_roles: val.u_roles,
            u_email: val.u_email,
          })
          this.operateTitle = '编辑用户信息'
        }
        this.formShow = true
      },
      // 弹出框 关闭
      operateClose(formName) {
        this.$refs[formName].resetFields()
        this.formShow = false
        this.form = {
          u_username: '',
          u_password: '',
          u_name: '',
          u_phone: '',
          u_sex: '1',
          u_dep: '',
          u_roles: 'admin',
          u_email: '',
          repeatPass: '',
        }
      },
      // 点击保存
      save(formName) {
        if (this.isEdit === true) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              editUser(this.form).then((response) => {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.fetchData()
                this.formShow = false
              })
            } else {
              return false
            }
          })
        } else {
          let saveData = Object.assign({}, this.form)
          saveData.u_password =  md5(saveData.u_password)
          saveData.repeatPass =  md5(saveData.repeatPass)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              addUser(saveData).then((response) => {
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
      indexMethod(index) {
        return index * 2;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  #userTable{
    .el-dialog__body{
      padding: 10px 20px;
      .el-table__body-wrapper{
        height: 250px;
        overflow-y: auto;
      }
    }
  }
</style>
<style  rel="stylesheet/less" lang="less" scoped>
  .filter-container{
    text-align: right;
    margin-bottom: 10px;
  }
</style>
