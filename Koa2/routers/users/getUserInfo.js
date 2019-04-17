let router = require('koa-router')();
let userModel = require('../../mysql.js');

const checkToken = require('../../token/checkToken.js');
const createToken = require('../../token/createToken.js');

// 获取用户信息
router.post('/getUserInfo', checkToken, async (ctx, next) => {
  let user = ctx.userInfo
  await userModel.getUserInfo(user.username).then((res) => {

    if (!res.length) {
      ctx.body = {
        state: 0,
        msg: '用户未注册!',
        data: []
      }
    } else {
      if (res[0].u_password === user.password) {
        let resData = res[0]
        let token = createToken(res[0])
        ctx.body = {
          state: 1,
          msg: '用户登录成功!',
          data: {
            introduction: resData.u_name,
            roles: resData.u_roles.split(','),
            name: resData.u_username,
            dep: resData.u_dep,
            id: resData.u_id,
            token: token
          },
          token
        }
      } else {
        ctx.body = {
          state: 0,
          msg: '用户名或者密码错误!',
          data: []
        }
      }
    }
  }).catch((err) => {
    ctx.body = {
      state: 0,
      msg: err,
      data: []
    }
  })

})

module.exports = router