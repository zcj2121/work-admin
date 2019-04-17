const router = require('koa-router')();
const userModel = require('../../mysql.js');
const fs = require('fs');

// 删除 用户数据
router.get('/delUser', async (ctx, next) => {
  let userId = ctx.request.query.id;

  await userModel.delUser(userId).then(async (res) => {
    if (!res.affectedRows) {
      try {
        throw Error('删除失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '删除失败!',
        data: []
      }
    } else {
      ctx.body = {
        state: 1,
        msg: '删除成功',
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