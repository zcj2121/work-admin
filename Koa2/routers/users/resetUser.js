const router = require('koa-router')();
const userModel = require('../../mysql.js');
const fs = require('fs');

// 重置 用户密码
router.get('/resetUser', async (ctx, next) => {
  let userId = ctx.request.query.id;
  await userModel.resetUser(userId).then(async (res) => {
    if (!res.affectedRows) {
      try {
        throw Error('重置失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '重置失败!',
        data: []
      }
    } else {
      ctx.body = {
        state: 1,
        msg: '重置成功',
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

})

module.exports = router