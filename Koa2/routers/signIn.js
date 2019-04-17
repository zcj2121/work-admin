let router = require('koa-router')();
let userModel = require('../mysql.js');

const createToken = require('../token/createToken.js');

router.post('/signIn',async (ctx, next) => {
  let user = {
    u_username: ctx.request.body.username,
    u_password: ctx.request.body.password
  }

  await userModel.findUser(user.u_username).then((res) => {
    if (!res.length) {
      ctx.body = {
        state: 0,
        msg: '用户未注册!',
        data: []
      }
    } else {
      if (res[0].u_password === user.u_password) {
        let token = createToken(res[0])

        ctx.body = {
          state: 1,
          msg: '用户登录成功!',
          data: {
            token: token
          },
          token
        }
        console.log('密码校验正确, 允许登录')
      } else {
        ctx.body = {
          state: 0,
          msg: '用户名或者密码错误!',
          data: []
        }
        console.log('用户名或者密码错误')
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