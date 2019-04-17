const path = require('path')
const Koa = require('koa2');
const router = require('koa-router');
var cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config.js');
const server = require('koa-static');
const jwt = require('jsonwebtoken')

require('./mysql.js');

const app = new Koa();

app.use(server(
  path.join(__dirname , './public')
)) // 设置静态文件


app.use(cors(
  {
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    // credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }
  )
); // 设置跨域


app.use(bodyParser({
  formLimit: '1mb'
})) // ctx body 中间件



app.use(require('./routers/signIn.js').routes()) // 登录

app.use(require('./routers/users/addUser.js').routes()) // 添加用户信息
app.use(require('./routers/users/editUser.js').routes()) // 修改用户信息
app.use(require('./routers/users/delUser.js').routes()) // 删除用户信息
app.use(require('./routers/users/resetUser.js').routes()) // 重置用户密码
app.use(require('./routers/editPassword.js').routes()) // 修改用户密码
app.use(require('./routers/users/getUserInfo.js').routes()) // 获取用户信息
app.use(require('./routers/users/getUserList.js').routes()) // 获取用户列表

app.use(require('./routers/work/addWork.js').routes()) // 添加任务信息
app.use(require('./routers/work/delWork.js').routes()) // 删除任务信息
app.use(require('./routers/work/editWork.js').routes()) // 修改任务信息
app.use(require('./routers/work/finishWork.js').routes()) // 完成任务信息
app.use(require('./routers/work/scoreWork.js').routes()) // 为任务打分
app.use(require('./routers/work/getWorkList.js').routes()) // 查询全部任务列表
app.use(require('./routers/work/getMyWorkList.js').routes()) // 查询我的任务列表
app.use(require('./routers/work/getWorkAllList.js').routes()) // 查询全部任务列表ALl

app.use(require('./routers/work/delayWork.js').routes()) // 申请延时任务
app.use(require('./routers/work/auditWork.js').routes()) // 审批延时申请


app.listen(config.port) // 监听端口

console.log('listen in localhost:' + config.port)