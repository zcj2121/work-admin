const router = require('koa-router')();
const userModel = require('../mysql.js');

// 修改 密码
router.post('/editPassword', async (ctx, next) => {
  let user = ctx.request.body
  console.log(user)
  await userModel.findUserId(user.u_id).then(async (res) => {
    console.log(res)
    if (res[0].u_password != user.oldPassword) {
      try {
        throw Error('原密码错误')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '原密码错误!',
        data: []
      }
    } else {
      await userModel.resetUser(user.u_id, user.u_password).then(async (res) => {
        if (!res.affectedRows) {
          try {
            throw Error('密码修改失败')
          } catch (err) {
            console.log(err)
          }
          ctx.body = {
            state: 0,
            msg: '密码修改失败!',
            data: []
          }
        } else {
          ctx.body = {
            state: 1,
            msg: '密码修改成功',
            data: []
          }
        }
      }).catch((err) => {
        ctx.body = {
          state: 0,
          msg: err,
          data: []
        }
      })
    }
  })

})

module.exports = router